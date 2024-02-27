import { FC } from 'react';
import Head from 'next/head';
import { Layout } from 'shared/components';
import { Withdrawal } from 'features/withdrawal/withdrawal';

const WithdrawalPage: FC = () => {
  return (
    <Layout title="Withdrawal BTC" subtitle="Withdrawal stBTC and receive BTC.">
      <Head>
        <title>Stake with Bido | Bido</title>
      </Head>
      <Withdrawal />
    </Layout>
  );
};

export default WithdrawalPage;
