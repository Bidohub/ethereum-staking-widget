import { TOKENS } from '@lido-sdk/constants';

export const TOKEN_DISPLAY_NAMES = {
  BTC: 'BTC',
  [TOKENS.STBTC]: 'stBTC',
  [TOKENS.WSTBTC]: 'wstBTC',
};

export const getTokenDisplayName = (token: keyof typeof TOKEN_DISPLAY_NAMES) =>
  TOKEN_DISPLAY_NAMES[token];
