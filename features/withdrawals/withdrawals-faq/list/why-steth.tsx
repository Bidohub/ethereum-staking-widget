import { Accordion } from '@lidofinance/lido-ui';

export const WhySTETH: React.FC = () => {
  return (
    <Accordion summary="When I try to withdraw wstBTC, why do I see the stBTC amount in my request?">
      <p>
        When you request to withdraw wstBTC, it is automatically unwrapped into
        stBTC, which then gets transformed into BTC. The main withdrawal period
        is when stBTC is transformed into BTC. That&apos;s why you see the
        amount pending denominated in stETH.
      </p>
    </Accordion>
  );
};
