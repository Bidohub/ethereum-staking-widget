import { formatEther } from '@ethersproject/units';
import { TOKENS } from '@lido-sdk/constants';
import { BigNumber } from 'ethers';
import invariant from 'tiny-invariant';
import { Resolver } from 'react-hook-form';

import { TokensWithdrawable } from 'features/withdrawals/types/tokens-withdrawable';
import {
  RequestFormValidationAsyncContextType,
  RequestFormInputType,
  ValidationResults,
  RequestFormValidationContextType,
} from '.';
import { VALIDATION_CONTEXT_TIMEOUT } from 'features/withdrawals/withdrawals-constants';

import {
  ValidationError,
  handleResolverValidationError,
} from 'shared/hook-form/validation/validation-error';
import { getTokenDisplayName } from 'utils/getTokenDisplayName';
import { awaitWithTimeout } from 'utils/await-with-timeout';
import { validateEtherAmount } from 'shared/hook-form/validation/validate-ether-amount';
import { validateBignumberMin } from 'shared/hook-form/validation/validate-bignumber-min';
import { validateBignumberMax } from 'shared/hook-form/validation/validate-bignumber-max';

// helpers that should be shared when adding next hook-form

export type TvlErrorPayload = {
  balanceDiffSteth: BigNumber;
  tvlDiff: BigNumber;
};
export class ValidationTvlJoke extends ValidationError {
  static type = 'validate_tvl_joke';
  payload: TvlErrorPayload;
  constructor(field: string, msg: string, payload: TvlErrorPayload) {
    super(field, msg, ValidationTvlJoke.type);
    this.payload = payload;
  }
}

export type SplitRequestErrorPayload = {
  requestCount: number;
};

export class ValidationSplitRequest extends ValidationError {
  static type = 'validation_request_split';
  payload: SplitRequestErrorPayload;
  constructor(field: string, msg: string, payload: SplitRequestErrorPayload) {
    super(field, msg, ValidationSplitRequest.type);
    this.payload = payload;
  }
}

const messageMinUnstake = (min: BigNumber, token: TokensWithdrawable) =>
  `Minimum withdraw amount is ${formatEther(min)} ${getTokenDisplayName(
    token,
  )}`;

const messageMaxAmount = (max: BigNumber, token: TokensWithdrawable) =>
  `Entered ${getTokenDisplayName(
    token,
  )} amount exceeds your available balance of ${formatEther(max)}`;

const validateSplitRequests = (
  field: string,
  amount: BigNumber,
  maxAmountPerRequest: BigNumber,
  minAmountPerRequest: BigNumber,
  maxRequestCount: number,
): BigNumber[] => {
  const maxAmount = maxAmountPerRequest.mul(maxRequestCount);

  const lastRequestAmountEther = amount.mod(maxAmountPerRequest);
  const restCount = lastRequestAmountEther.gt(0) ? 1 : 0;
  const requestCount = amount.div(maxAmountPerRequest).toNumber() + restCount;

  const isMoreThanMax = amount.gt(maxAmount);
  if (isMoreThanMax) {
    throw new ValidationSplitRequest(
      field,
      `You can send a maximum of ${maxRequestCount} requests per transaction. Current requests count is ${requestCount}.`,
      { requestCount },
    );
  }

  if (restCount && lastRequestAmountEther.lt(minAmountPerRequest)) {
    const difference = minAmountPerRequest.sub(lastRequestAmountEther);
    throw new ValidationSplitRequest(
      field,
      `Cannot split into valid requests as last request would be less than minimal withdrawal amount. Add ${formatEther(
        difference,
      )} to withdrawal amount.`,
      { requestCount },
    );
  }

  const requests = Array.from<BigNumber>({ length: requestCount }).fill(
    maxAmountPerRequest,
  );
  if (restCount) {
    requests[requestCount - 1] = lastRequestAmountEther;
  }

  return requests;
};

const tvlJokeValidate = (
  field: string,
  valueSteth: BigNumber,
  tvl: BigNumber,
  balanceSteth: BigNumber,
) => {
  const tvlDiff = valueSteth.sub(tvl);
  if (tvlDiff.gt(0))
    throw new ValidationTvlJoke(field, 'amount bigger than tvl', {
      balanceDiffSteth: valueSteth.sub(balanceSteth),
      tvlDiff,
    });
};

// helper to get filter out context values
const transformContext = (
  context: RequestFormValidationAsyncContextType,
  values: RequestFormInputType,
) => {
  const isSteth = values.token === TOKENS.STBTC;
  return {
    isSteth,
    balance: isSteth ? context.balanceSteth : context.balanceWSteth,
    minAmountPerRequest: isSteth
      ? context.minUnstakeSteth
      : context.minUnstakeWSteth,
    maxAmountPerRequest: isSteth
      ? context.maxAmountPerRequestSteth
      : context.maxAmountPerRequestWSteth,
    maxRequestCount: context.maxRequestCount,
    stethTotalSupply: context.stethTotalSupply,
  };
};

// Validation pipeline resolver
// receives values from form and context with helper data
// returns values or errors
export const RequestFormValidationResolver: Resolver<
  RequestFormInputType,
  RequestFormValidationContextType
> = async (values, context) => {
  const { amount, mode, token } = values;
  const validationResults: ValidationResults = {
    requests: null,
  };
  let setResults;
  try {
    invariant(context, 'must have context promise');
    setResults = context.setIntermediateValidationResults;

    // this check does not require async context and can be placed first
    // also limits async context missing edge cases on page start
    validateEtherAmount('amount', amount, token);

    // early return
    if (!context.isWalletActive) return { values, errors: {} };

    // wait for context promise with timeout and extract relevant data
    // validation function only waits limited time for data and fails validation otherwise
    // most of the time data will already be available
    const awaitedContext = await awaitWithTimeout(
      context.asyncContext,
      VALIDATION_CONTEXT_TIMEOUT,
    );

    const {
      isSteth,
      balance,
      maxAmountPerRequest,
      minAmountPerRequest,
      maxRequestCount,
      stethTotalSupply,
    } = transformContext(awaitedContext, values);

    if (isSteth) {
      tvlJokeValidate('amount', amount, stethTotalSupply, balance);
    }

    // early validation exit for dex option
    if (mode === 'dex') {
      return { values, errors: { requests: 'wallet not connected' } };
    }

    validateBignumberMin(
      'amount',
      amount,
      minAmountPerRequest,
      messageMinUnstake(minAmountPerRequest, token),
    );

    const requests = validateSplitRequests(
      'amount',
      amount,
      maxAmountPerRequest,
      minAmountPerRequest,
      maxRequestCount,
    );
    validationResults.requests = requests;

    validateBignumberMax(
      'amount',
      amount,
      balance,
      messageMaxAmount(balance, token),
    );

    return {
      values: { ...values, requests },
      errors: {},
    };
  } catch (error) {
    return handleResolverValidationError(
      error,
      'WithdrawalRequestForm',
      'requests',
    );
  } finally {
    // no matter validation result save results for the UI to show
    setResults?.(validationResults);
  }
};

export const __test__export = {
  validateSplitRequests,
  tvlJokeValidate,
  ValidationSplitRequest,
  ValidationTvlJoke,
};
