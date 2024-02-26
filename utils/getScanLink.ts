const prefix = `https://scan-testnet.bevm.io`;

export enum TxType {
  Tx = 'tx',
  Token = 'token',
  Address = 'address',
}

export const getScanLink = (type: TxType, hash: string): string => {
  return `${prefix}/${type}/${hash}`;
};
