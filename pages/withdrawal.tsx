import { FC } from 'react';
import Head from 'next/head';
import { Layout } from 'shared/components';
import { Withdrawal } from 'features/withdrawal/withdrawal';

const WithdrawalPage: FC = () => {
  return (
    <Layout
      title="Stake Ether"
      subtitle="Stake ETH and receive stETH while staking."
    >
      <Head>
        <title>Stake with Lido | Lido</title>
      </Head>
      <Withdrawal />
    </Layout>
  );
};

export default WithdrawalPage;
