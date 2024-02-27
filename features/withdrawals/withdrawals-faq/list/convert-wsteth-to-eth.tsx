import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

import { WITHDRAWALS_CLAIM_PATH, WITHDRAWALS_REQUEST_PATH } from 'config/urls';
import { LocalLink } from 'shared/components/local-link';

export const ConvertWSTETHtoETH: FC = () => {
  return (
    <Accordion summary="Can I transform my wstBTC to BTC?">
      <p>
        Yes. You can transform your wstBTC to BTC using the{' '}
        <LocalLink href={WITHDRAWALS_REQUEST_PATH}>Request</LocalLink> and{' '}
        <LocalLink href={WITHDRAWALS_CLAIM_PATH}>Claim</LocalLink> tabs. Note
        that, under the hood, wstBTC will unwrap to stBTC first, so your request
        will be denominated in stBTC.
      </p>
    </Accordion>
  );
};
