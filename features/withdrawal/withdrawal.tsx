import { dynamics } from 'config';
import { useWeb3Key } from 'shared/hooks/useWeb3Key';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { GoerliSunsetBanner } from 'shared/banners/goerli-sunset';
import { WithdrawalForm } from './withdrawal-form';
import { LidoStats } from './lido-stats/lido-stats';
import { StakeFaq } from './stake-faq/stake-faq';
import React from 'react';

export const Withdrawal = () => {
  const key = useWeb3Key();
  return (
    <>
      <GoerliSunsetBanner />
      <NoSSRWrapper>
        <WithdrawalForm key={key} />
      </NoSSRWrapper>
      <LidoStats />
      {!dynamics.ipfsMode && <StakeFaq />}
    </>
  );
};
