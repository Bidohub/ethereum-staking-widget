import { FC, memo, useMemo } from 'react';
import { useSDK } from '@lido-sdk/react';
import { getTokenAddress, TOKENS } from '@lido-sdk/constants';
import { Block, DataTable, Question, Tooltip } from '@lidofinance/lido-ui';

import { MatomoLink, Section } from 'shared/components';
import { useLidoStats } from 'shared/hooks';
import {
  dynamics,
  LIDO_APR_TOOLTIP_TEXT,
  MATOMO_CLICK_EVENTS_TYPES,
} from 'config';

import { FlexCenterVertical } from './styles';
import { LidoStatsItem } from './lido-stats-item';
import { getScanLink, TxType } from '../../../utils/getScanLink';
import { useBidoApr } from '../../../shared/hooks/useBidoApr';

const isStatItemAvailable = (val: any): boolean => {
  return val && val !== 'N/A';
};

export const LidoStats: FC = memo(() => {
  const { chainId } = useSDK();
  const etherscanLink = useMemo(() => {
    try {
      return getScanLink(TxType.Token, getTokenAddress(chainId, TOKENS.STBTC));
    } catch (e) {
      return `https://scan-canary.bevm.io/address/0x6e128a3BCfC042D539cae6fe761AB3ef6d0e298c`;
    }
  }, [chainId]);

  const bidoApr = useBidoApr();
  const lidoStats = useLidoStats();

  const showApr = !dynamics.ipfsMode || isStatItemAvailable(bidoApr.data);
  const showTotalStaked =
    !dynamics.ipfsMode || isStatItemAvailable(lidoStats.data.totalStaked);
  const showStakers =
    !dynamics.ipfsMode || isStatItemAvailable(lidoStats.data.stakers);
  const showMarketCap =
    !dynamics.ipfsMode || isStatItemAvailable(lidoStats.data.marketCap);

  if (!showApr && !showTotalStaked && !showStakers && !showMarketCap) {
    return null;
  }

  return (
    <Section
      title="Lido statistics"
      headerDecorator={
        <MatomoLink
          href={etherscanLink}
          data-testid="statEtherscanBtn"
          matomoEvent={MATOMO_CLICK_EVENTS_TYPES.viewEtherscanOnStakePage}
        >
          View on Etherscan
        </MatomoLink>
      }
    >
      <Block>
        <DataTable>
          <>
            <LidoStatsItem
              title={
                <FlexCenterVertical data-testid="aprTooltip">
                  Annual percentage rate
                  <Tooltip title={LIDO_APR_TOOLTIP_TEXT}>
                    <Question />
                  </Tooltip>
                </FlexCenterVertical>
              }
              show={showApr}
              loading={bidoApr.loading}
              dataTestId="lidoAPR"
              highlight
            >
              {bidoApr.data ?? `${bidoApr.data}%`}
            </LidoStatsItem>

            <LidoStatsItem
              title="Total staked with Lido"
              show={showTotalStaked}
              loading={lidoStats.initialLoading}
              dataTestId="totalStaked"
            >
              {lidoStats.data.totalStaked}
            </LidoStatsItem>

            <LidoStatsItem
              title="Stakers"
              show={showStakers}
              loading={lidoStats.initialLoading}
              dataTestId="stakers"
            >
              {lidoStats.data.stakers}
            </LidoStatsItem>

            <LidoStatsItem
              title="stBTC market cap"
              show={showMarketCap}
              loading={lidoStats.initialLoading}
              dataTestId="stEthMarketCap"
            >
              {lidoStats.data.marketCap}
            </LidoStatsItem>
          </>
        </DataTable>
      </Block>
    </Section>
  );
});
