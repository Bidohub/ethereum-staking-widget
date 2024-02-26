import { TOKENS } from '@lido-sdk/constants';

export const ETH = 'ETH';
export const BTC = 'BTC';
export const TOKENS_TO_WRAP = {
  BTC,
  [TOKENS.STBTC]: TOKENS.STBTC,
} as const;

export type TokensWrappable = keyof typeof TOKENS_TO_WRAP;
