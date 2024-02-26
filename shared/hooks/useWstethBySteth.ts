import { useContractSWR, useWSTETHContractRPC } from '@lido-sdk/react';
import { BigNumber } from 'ethers';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

export const useWstethBySteth = (
  steth: BigNumber | undefined,
): BigNumber | undefined => {
  return useContractSWR({
    contract: useWSTETHContractRPC(),
    method: 'getWstBTCByStBTC',
    params: [steth],
    shouldFetch: !!steth,
    config: STRATEGY_LAZY,
  }).data as BigNumber;
};
