import { validateBignumberMax } from './validate-bignumber-max';
import { validateStakeLimit } from './validate-stake-limit';
import { formatEther } from '@ethersproject/units';
import { Zero } from '@ethersproject/constants';

import type { LIMIT_LEVEL } from 'types';
import type { BigNumber } from 'ethers';

export type validateStakeEthParams = {
  formField: string;
  amount: BigNumber;
  isWalletActive: boolean;
  stakingLimitLevel: LIMIT_LEVEL;
  currentStakeLimit: BigNumber;
  gasCost: BigNumber;
  etherBalance: BigNumber;
  isMultisig: boolean;
};

// Runs validation pipeline common between stake and wrapEth
export const validateStakeEth = ({
  isWalletActive,
  amount,
  formField,
  currentStakeLimit,
  etherBalance,
  gasCost,
  isMultisig,
  stakingLimitLevel,
}: validateStakeEthParams) => {
  validateStakeLimit('amount', stakingLimitLevel);

  if (isWalletActive) {
    validateBignumberMax(
      formField,
      amount,
      etherBalance,
      `Entered BTC amount exceeds your available balance of ${formatEther(
        etherBalance,
      )}`,
    );

    validateBignumberMax(
      formField,
      amount,
      currentStakeLimit,
      `Entered BTC amount exceeds current staking limit of ${formatEther(
        currentStakeLimit,
      )}`,
    );

    if (!isMultisig) {
      const gasPaddedBalance = etherBalance.sub(gasCost);

      validateBignumberMax(
        formField,
        Zero,
        gasPaddedBalance,
        `Ensure you have sufficient BTC to cover the gas cost of ${formatEther(
          gasCost,
        )}`,
      );

      validateBignumberMax(
        formField,
        amount,
        gasPaddedBalance,
        `Enter BTC amount less than ${formatEther(
          gasPaddedBalance,
        )} to ensure you leave enough BTC for gas fees`,
      );
    }
  }
};
