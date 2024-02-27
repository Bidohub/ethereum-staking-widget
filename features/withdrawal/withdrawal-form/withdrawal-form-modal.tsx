import { useTransactionModal } from 'shared/transaction-modal';
import { convertTxStageToLegacy } from 'features/wsteth/shared/utils/convertTxModalStageToLegacy';
import { TxStageModal } from 'shared/components';
import { TX_OPERATION as TX_OPERATION_LEGACY } from 'shared/components/tx-stage-modal';
import { useStakeFormData } from './withdrawal-form-context';
import { useEthereumBalance } from '@lido-sdk/react';
import { STRATEGY_LAZY } from '../../../utils/swrStrategies';

export const WithdrawalFormModal = () => {
  // const { stethBalance } = useStakeFormData();

  const { data: etherBalance } = useEthereumBalance(undefined, STRATEGY_LAZY);
  const {
    dispatchModalState,
    onRetry,
    amount,
    txHash,
    txStage,
    isModalOpen,
    errorText,
  } = useTransactionModal();

  return (
    <TxStageModal
      open={isModalOpen}
      onClose={() => dispatchModalState({ type: 'close_modal' })}
      txStage={convertTxStageToLegacy(txStage)}
      txOperation={TX_OPERATION_LEGACY.WITHDRAWAL}
      txHash={txHash}
      amount={amount}
      amountToken="stBTC"
      willReceiveAmount={amount}
      willReceiveAmountToken="BTC"
      balance={etherBalance}
      balanceToken="BTC"
      failedText={errorText}
      onRetry={() => onRetry?.()}
    />
  );
};
