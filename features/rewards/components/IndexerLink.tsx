import { Box, External as ExternalLinkIcon } from '@lidofinance/lido-ui';
import { dynamics } from 'config';
import { getScanLink, TxType } from '../../../utils/getScanLink';

// TODO: move to separate folders
type Props = {
  transactionHash: string;
};

const IndexerLink = ({ transactionHash }: Props) => {
  if (!transactionHash) return null;

  const link = getScanLink(TxType.Tx, transactionHash);
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Box ml="1px" mt="-2px" height="12px" width="12px">
        <ExternalLinkIcon />
      </Box>
    </a>
  );
};

export default IndexerLink;
