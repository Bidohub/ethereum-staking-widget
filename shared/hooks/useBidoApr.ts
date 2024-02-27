import axios from 'axios';
import useSwr from 'swr';
import { BigNumber, utils } from 'ethers';
import { useContractSWR, useSTETHContractRPC } from '@lido-sdk/react';
import { STRATEGY_LAZY } from '../../utils/swrStrategies';
import { useEffect, useState } from 'react';

const BEVM_RPC_URL = 'https://testnet.bevm.io';
const fetcher = async (url: string) => {
  const { data } = await axios.post(url, {
    id: 1,
    jsonrpc: '2.0',
    method: 'xstaking_sampleBtcReward',
    params: [],
  });

  return data?.result;
};

export const useBidoApr = () => {
  const [data, setData] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const stethTotalSupply = useContractSWR({
    contract: useSTETHContractRPC(),
    method: 'totalSupply',
    config: STRATEGY_LAZY,
  }).data;
  const { data: BTCReward } = useSwr(BEVM_RPC_URL, fetcher);

  useEffect(() => {
    if (
      BTCReward &&
      stethTotalSupply &&
      Number(stethTotalSupply?.toString()) > 0
    ) {
      setData(() => {
        const value = BigNumber.from(BTCReward).mul(365).div(stethTotalSupply);
        return value.mul(100).toString();
      });
    }
  }, [stethTotalSupply, BTCReward]);

  useEffect(() => {
    setLoading(!data);
  }, [data]);

  return { data, loading };
};
