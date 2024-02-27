import { LimitHelp } from './components';
import { useStakeFormData } from '../../withdrawal-form-context';

export const LimitMeter = () => {
  const { stakingLimitInfo } = useStakeFormData();
  if (!stakingLimitInfo) return null;
  return <LimitHelp limitLevel={stakingLimitInfo.stakeLimitLevel} />;
};
