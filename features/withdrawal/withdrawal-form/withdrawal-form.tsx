import { FC, memo } from 'react';
import { Block } from '@lidofinance/lido-ui';

import { WithdrawalFormProvider } from './stake-form-context';
import { TransactionModalProvider } from 'shared/transaction-modal';

import { Wallet } from './wallet';
import { StakeAmountInput } from './controls/stake-amount-input';
import { StakeSubmitButton } from './controls/stake-submit-button';
import { WithdrawalFormInfo } from './withdrawal-form-info';
import { StakeFormModal } from './stake-form-modal';
import { SwapDiscountBanner } from '../swap-discount-banner';
import { FormControllerStyled } from './styles';

export const WithdrawalForm: FC = memo(() => {
  return (
    <TransactionModalProvider>
      <WithdrawalFormProvider>
        <Wallet />
        <Block data-testid="stakeForm">
          <FormControllerStyled>
            <StakeAmountInput />
            <StakeSubmitButton />
            <SwapDiscountBanner />
          </FormControllerStyled>
          <WithdrawalFormInfo />
          <StakeFormModal />
        </Block>
      </WithdrawalFormProvider>
    </TransactionModalProvider>
  );
});
