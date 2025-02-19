import { TOKENS } from '@lido-sdk/constants';
import { getOpenOceanRate } from 'utils/get-open-ocean-rate';
import {
  StakeSwapDiscountIntegrationKey,
  StakeSwapDiscountIntegrationMap,
} from './types';
import { OpenOceanIcon, OneInchIcon, OverlayLink } from './styles';
import { parseEther } from '@ethersproject/units';
import { OPEN_OCEAN_REFERRAL_ADDRESS } from 'config/external-links';
import { MATOMO_CLICK_EVENTS } from 'config/matomoClickEvents';
import { getOneInchRate } from 'utils/get-one-inch-rate';
import { use1inchDeepLinkProps } from 'features/stake/hooks';

const DEFAULT_AMOUNT = parseEther('1');

const STAKE_SWAP_INTEGRATION_CONFIG: StakeSwapDiscountIntegrationMap = {
  'open-ocean': {
    title: 'OpenOcean',
    async getRate() {
      const { rate } = await getOpenOceanRate(
        DEFAULT_AMOUNT,
        'ETH',
        TOKENS.STBTC,
      );
      return rate;
    },
    BannerText({ discountPercent }) {
      return (
        <>
          Get a <b>{discountPercent.toFixed(2)}% discount</b> by swapping to
          stETH&nbsp;on the OpenOcean platform
        </>
      );
    },
    Icon: OpenOceanIcon,
    linkHref: `https://app.openocean.finance/classic?referrer=${OPEN_OCEAN_REFERRAL_ADDRESS}#/ETH/ETH/STETH`,
    matomoEvent: MATOMO_CLICK_EVENTS.openOceanDiscount,
  },
  'one-inch': {
    title: '1inch',
    async getRate() {
      const { rate } = await getOneInchRate({ token: 'BTC' });
      return rate;
    },
    BannerText({ discountPercent }) {
      return (
        <>
          Get a <b>{discountPercent.toFixed(2)}% discount</b> by swapping to
          stETH&nbsp;on the 1inch platform
        </>
      );
    },
    Icon: OneInchIcon,
    linkHref: `https://app.1inch.io/#/1/simple/swap/ETH/stETH`,
    matomoEvent: MATOMO_CLICK_EVENTS.oneInchDiscount,
    CustomLink({ children, ...props }) {
      const customProps = use1inchDeepLinkProps();
      return (
        <OverlayLink {...props} {...customProps}>
          {children}
        </OverlayLink>
      );
    },
  },
};

export const getSwapIntegration = (key: StakeSwapDiscountIntegrationKey) =>
  STAKE_SWAP_INTEGRATION_CONFIG[key];
