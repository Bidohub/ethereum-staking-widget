import { Link } from '@lidofinance/lido-ui';
import { useSDK } from '@lido-sdk/react';
import { getScanLink, TxType } from '../../../utils/getScanLink';

type TxLinkEtherscanProps = {
  text?: string;
  txHash?: string | null;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const TxLinkEtherscan = (props: TxLinkEtherscanProps) => {
  const { txHash, text = 'View on BEVM scan', onClick } = props;
  const { chainId } = useSDK();

  if (!txHash) return null;

  return (
    <Link onClick={onClick} href={getScanLink(TxType.Tx, txHash)}>
      {text}
    </Link>
  );
};
