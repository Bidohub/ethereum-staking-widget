import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

import { WITHDRAWALS_CLAIM_PATH, WITHDRAWALS_REQUEST_PATH } from 'config/urls';
import { LocalLink } from 'shared/components/local-link';

export const ConvertSTETHtoETH: FC = () => {
  return (
    <Accordion summary="Can I transform my stBTC to BTC?">
      <p>
        Yes. Stakers can transform their stBTC to BTC 1:1 using the{' '}
        <LocalLink href={WITHDRAWALS_REQUEST_PATH}>Request</LocalLink> and{' '}
        <LocalLink href={WITHDRAWALS_CLAIM_PATH}>Claim</LocalLink> tabs.
      </p>
    </Accordion>
  );
};
