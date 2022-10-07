import { IRuleBase } from './RuleBase';
import { UseFrequentNumberRule } from './UseFrequentNumbersRule';

export const rules = (): Array<IRuleBase> => {
  return [new UseFrequentNumberRule()];
};
