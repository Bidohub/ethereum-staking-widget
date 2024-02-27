import { TOKENS } from '@lido-sdk/constants';

export enum TX_STAGE {
  NONE,
  SIGN,
  BLOCK,
  SUCCESS,
  SUCCESS_MULTISIG,
  FAIL,
}

export enum TX_OPERATION {
  APPROVE,
  CONTRACT,
  PERMIT,
  NONE,
}

export type TX_TOKENS = 'BTC' | TOKENS.STBTC | TOKENS.WSTBTC;
