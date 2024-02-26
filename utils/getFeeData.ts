import { BigNumber } from 'ethers';
import type { StaticJsonRpcBatchProvider } from '@lidofinance/eth-providers';
import { parseUnits } from '@ethersproject/units';

type FeeData = {
  lastBaseFeePerGas: BigNumber;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  gasPrice: BigNumber;
};

const getFeeHistory = (
  staticRpcProvider: StaticJsonRpcBatchProvider,
  blockCount: number,
  latestBlock: string,
  percentile: number[],
) => {
  return staticRpcProvider.send('eth_feeHistory', [
    '0x' + blockCount.toString(16),
    latestBlock,
    percentile,
  ]) as Promise<{
    baseFeePerGas: string[];
    gasUsedRatio: number[];
    oldestBlock: string;
    reward: string[][];
  }>;
};

export const getFeeData = async (
  staticRpcProvider: StaticJsonRpcBatchProvider,
): Promise<FeeData> => {
  // we look back 5 blocks at fees of botton 25% txs
  // if you want to increase maxPriorityFee output increase percentile
  // const feeHistory = await getFeeHistory(staticRpcProvider, 5, 'pending', [25]);

  // get average priority fee
  // const maxPriorityFeePerGas = feeHistory.reward
  //   .map((fees) => BigNumber.from(fees[0]))
  //   .reduce((sum, fee) => sum.add(fee))
  //   .div(feeHistory.reward.length);
  const maxPriorityFeePerGas = BigNumber.from('0');

  // const lastBaseFeePerGas = BigNumber.from(feeHistory.baseFeePerGas[0]);

  // we have to multiply by 2 until we find a reliable way to predict baseFee change
  // const maxFeePerGas = lastBaseFeePerGas.mul(2).add(maxPriorityFeePerGas);
  const maxFeePerGas = parseUnits('5', 7);

  return {
    lastBaseFeePerGas: BigNumber.from('0'),
    maxPriorityFeePerGas,
    maxFeePerGas,
    gasPrice: maxFeePerGas, // fallback
  };
};
