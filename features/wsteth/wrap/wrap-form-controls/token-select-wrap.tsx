import { trackEvent } from '@lidofinance/analytics-matomo';
import { TOKENS_TO_WRAP } from 'features/wsteth/shared/types';
import { MATOMO_CLICK_EVENTS } from 'config';
import { TokenSelectHookForm } from 'shared/hook-form/controls/token-select-hook-form';

const OPTIONS = [
  {
    label: 'Lido (stBTC)',
    token: TOKENS_TO_WRAP.STBTC,
  },
  {
    label: 'Ethereum (BTC)',
    token: TOKENS_TO_WRAP.BTC,
  },
];

export const TokenSelectWrap = () => {
  return (
    <TokenSelectHookForm
      options={OPTIONS}
      onChange={(value) => {
        trackEvent(
          ...(value === TOKENS_TO_WRAP.BTC
            ? MATOMO_CLICK_EVENTS.wrapTokenSelectEth
            : MATOMO_CLICK_EVENTS.wrapTokenSelectSteth),
        );
      }}
    />
  );
};
