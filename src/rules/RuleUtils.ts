import { LotteryDrawModel } from 'types/lottery-draw';
import { IRuleBase } from './RuleBase';
import { UseFrequentNumberRule } from './UseFrequentNumbersRule';

export const getRulesBank = (historicalData: Array<LotteryDrawModel>): Array<IRuleBase> => {
  // console.log('🚀 ~ file: RuleUtils.ts ~ line 9 ~ getRulesBank ~ getRulesBank');
  return [new UseFrequentNumberRule(historicalData)];
};
