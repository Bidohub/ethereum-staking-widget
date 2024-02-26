import { TOKENS } from '@lido-sdk/constants';
import { useSDK, useSTETHBalance, useTokenAddress } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot/web3-react';
import { Divider, Question, Tooltip } from '@lidofinance/lido-ui';
import { LIDO_APR_TOOLTIP_TEXT } from 'config';
import { memo } from 'react';
import { TokenToWallet } from 'shared/components';
import { FormatToken } from 'shared/formatters';
import { DATA_UNAVAILABLE } from 'config';
import { CardAccount, CardBalance, CardRow, Fallback } from 'shared/wallet';
import type { WalletComponentType } from 'shared/wallet/types';
import { LimitMeter } from './limit-meter';
import { FlexCenter, LidoAprStyled, StyledCard } from './styles';
import { useStakeFormData } from '../stake-form-context';
import { STRATEGY_LAZY } from 'utils/swrStrategies';
import { useBidoApr } from '../../../../shared/hooks/useBidoApr';

const WalletComponent: WalletComponentType = (props) => {
  const { account } = useSDK();
  const { stakeableEther } = useStakeFormData();
  const steth = useSTETHBalance(STRATEGY_LAZY);

  const stethAddress = useTokenAddress(TOKENS.STBTC);
  const bidoApr = useBidoApr();

  return (
    <StyledCard data-testid="stakeCardSection" {...props}>
      <CardRow>
        <CardBalance
          title={
            <FlexCenter>
              <span>Available to stake</span>
              <LimitMeter />
            </FlexCenter>
          }
          loading={!stakeableEther}
          value={
            <FormatToken
              data-testid="ethAvailableToStake"
              showAmountTip
              amount={stakeableEther}
              symbol="BTC"
            />
          }
        />
        <CardAccount account={account} />
      </CardRow>
      <Divider />
      <CardRow>
        <CardBalance
          small
          title="Staked amount"
          loading={steth.initialLoading}
          value={
            <>
              <FormatToken
                data-testid="stEthStaked"
                showAmountTip
                amount={steth.data}
                symbol="stBTC"
              />
              <TokenToWallet
                data-testid="addStethToWalletBtn"
                address={stethAddress}
              />
            </>
          }
        />
        <CardBalance
          small
          title={
            <>
              Lido APR{' '}
              {bidoApr && bidoApr.data && (
                <Tooltip placement="bottom" title={LIDO_APR_TOOLTIP_TEXT}>
                  <Question />
                </Tooltip>
              )}
            </>
          }
          loading={!bidoApr || bidoApr?.loading}
          value={
            <LidoAprStyled data-testid="lidoAprHeader">
              {bidoApr.data ? `${bidoApr.data}%` : DATA_UNAVAILABLE}
            </LidoAprStyled>
          }
        />
      </CardRow>
    </StyledCard>
  );
};

export const Wallet: WalletComponentType = memo((props) => {
  const { active } = useWeb3();
  return active ? <WalletComponent {...props} /> : <Fallback {...props} />;
});
