import { FC } from 'react';
import Head from 'next/head';
import { Layout } from 'shared/components';
import { TopCard, RewardsList } from 'features/rewards/features';
import RewardsHistoryProvider from 'providers/rewardsHistory';
import { Fallback } from 'shared/wallet';
import { GoerliSunsetBanner } from 'shared/banners/goerli-sunset';

const Rewards: FC = () => {
  return (
    <Layout
      title="Reward History"
      subtitle="Track your Ethereum staking rewards with Bido."
      containerSize="content"
    >
      <Head>
        <title>Track your BEVM staking rewards | Bido</title>
        <meta
          name="description"
          content="Keep track of your daily BEVM staking rewards using our stBTC
        reward tracker. View stBTC balances, historical rewards and transfers."
        />
      </Head>
      <RewardsHistoryProvider>
        <Fallback />
        <GoerliSunsetBanner />
        <TopCard />
        <RewardsList />
      </RewardsHistoryProvider>
    </Layout>
  );
};

export default Rewards;
