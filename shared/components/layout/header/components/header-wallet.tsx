import { FC } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from 'reef-knot/web3-react';
import { useSDK } from '@lido-sdk/react';
import { getChainColor } from '@lido-sdk/constants';
import { ThemeToggler } from '@lidofinance/lido-ui';
import NoSSRWrapper from '../../../no-ssr-wrapper';

import { dynamics } from 'config';
import { IPFSInfoBox } from 'features/ipfs/ipfs-info-box';
import { Button, Connect } from 'shared/wallet';

import { HeaderSettingsButton } from './header-settings-button';
import {
  HeaderWalletChainStyle,
  DotStyle,
  IPFSInfoBoxOnlyDesktopWrapper,
} from '../styles';
import { CHAINS } from 'utils';

const HeaderWallet: FC = () => {
  const router = useRouter();
  const { active } = useWeb3();
  const { chainId } = useSDK();

  const chainName = CHAINS[chainId];

  // const testNet = chainId !== CHAINS.Mainnet;
  // const showNet = testNet && active;
  const queryTheme = router?.query?.theme;

  return (
    <NoSSRWrapper>
      {/*{showNet && (*/}
      {/*  <>*/}
      {/*    <DotStyle />*/}
      {/*    <HeaderWalletChainStyle $color={getChainColor(chainId)}>*/}
      {/*      {chainName}*/}
      {/*    </HeaderWalletChainStyle>*/}
      {/*  </>*/}
      {/*)}*/}
      {active ? (
        <Button data-testid="accountSectionHeader" />
      ) : (
        <Connect size="sm" />
      )}
      {dynamics.ipfsMode && <HeaderSettingsButton />}
      {!queryTheme && <ThemeToggler data-testid="themeToggler" />}
      {dynamics.ipfsMode && (
        <IPFSInfoBoxOnlyDesktopWrapper>
          <IPFSInfoBox />
        </IPFSInfoBoxOnlyDesktopWrapper>
      )}
    </NoSSRWrapper>
  );
};

export default HeaderWallet;
