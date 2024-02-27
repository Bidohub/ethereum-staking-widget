import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';
import { NoBr } from '../styles';

export const HowDoesWithdrawalsWork: FC = () => {
  return (
    <Accordion summary="How does the withdrawal process work?">
      <p>The withdrawal process is simple and has two steps:</p>
      <ol>
        <li>
          <b>Request withdrawal</b>: Lock your stBTC/wstBTC by issuing a
          withdrawal request. BTC is sourced to fulfill the request, and then
          locked stBTC is burned, which marks the withdrawal request as
          claimable. Under normal circumstances, this can take anywhere between{' '}
          <NoBr>1-5 days</NoBr>.
        </li>
        <li>
          <b>Claim</b>: Claim your BTC after the withdrawal request has been
          processed.
        </li>
      </ol>
    </Accordion>
  );
};
