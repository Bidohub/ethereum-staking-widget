import { Accordion } from '@lidofinance/lido-ui';

export const WhatAreWithdrawals: React.FC = () => {
  return (
    <Accordion defaultExpanded summary="What are withdrawals?">
      <p>
        Users can unstake their stBTC or wstBTC through withdrawals. Upon
        unstaking stBTC, they will receive BTC at a 1:1 ratio. When unstaking
        wstBTC, the unwrapping process will take place seamlessly in the
        background.
      </p>
    </Accordion>
  );
};
