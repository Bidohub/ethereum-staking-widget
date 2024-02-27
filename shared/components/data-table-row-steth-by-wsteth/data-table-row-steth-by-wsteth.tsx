import { useMemo } from 'react';
import { useStethByWsteth } from 'shared/hooks';

import { DataTableRow } from '@lidofinance/lido-ui';
import { FormatToken } from 'shared/formatters';

import { parseEther } from '@ethersproject/units';

export const useWstethToStethRatio = () => {
  const oneWstethAsBigNumber = useMemo(() => parseEther('1'), []);
  const wstethAsStethBN = useStethByWsteth(oneWstethAsBigNumber);

  return { wstethAsStethBN, loading: !wstethAsStethBN };
};

type DataTableRowStethByWstethProps = {
  toSymbol?: string;
};

export const DataTableRowStethByWsteth = ({
  toSymbol = 'stBTC',
}: DataTableRowStethByWstethProps) => {
  const { loading, wstethAsStethBN } = useWstethToStethRatio();

  return (
    <DataTableRow
      data-testid="exchangeRate"
      title="Exchange rate"
      loading={loading}
    >
      1 wstBTC =
      <FormatToken
        data-testid="destinationRate"
        amount={wstethAsStethBN}
        symbol={toSymbol}
      />
    </DataTableRow>
  );
};
