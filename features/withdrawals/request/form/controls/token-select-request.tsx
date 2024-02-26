import {
  TOKENS,
  TokenOption,
  TokenSelectHookForm,
} from 'shared/hook-form/controls/token-select-hook-form';

const OPTIONS: TokenOption[] = [
  { token: TOKENS.STBTC },
  { token: TOKENS.WSTBTC },
];

export const TokenSelectRequest = () => {
  return <TokenSelectHookForm options={OPTIONS} />;
};
