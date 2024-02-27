import getConfig from 'next/config';
import { CHAINS } from 'utils/chains';

const { serverRuntimeConfig } = getConfig();
const { rpcUrls_1, rpcUrls_11503 } = serverRuntimeConfig;

export const rpcUrls: Record<CHAINS, [string, ...string[]]> = {
  [CHAINS.Mainnet]: rpcUrls_1,
  [CHAINS.BEVM_TESTNET]: rpcUrls_11503,
};
