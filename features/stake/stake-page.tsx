import { Stake } from './stake';
import Head from 'next/head';
import { FC } from 'react';
import { Layout } from 'shared/components';

export { Stake } from './stake';

export const StakePage: FC = () => {
  return (
    <Layout
      title="Stake BTC"
      subtitle="Stake BTC and receive stBTC while staking."
    >
      <Head>
        <title>Stake with Bido | Bido</title>
      </Head>
      <Stake />
    </Layout>
  );
};
