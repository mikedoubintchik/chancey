import { LotteryDrawModel } from 'types/lottery-draw';
import { RecentRangesRule } from './RecentRangesRule';
import { IRuleBase } from './RuleBase';
import { UseFrequentNumberRule } from './UseFrequentNumbersRule';
import { UseLeastFrequentNumberRule } from './UseLeastFrequentNumbersRule';

export const getRulesBank = (historicalData: Array<LotteryDrawModel>): Array<IRuleBase> => {
  // console.log('🚀 ~ file: RuleUtils.ts ~ line 9 ~ getRulesBank ~ getRulesBank');
  return [
    new UseFrequentNumberRule(historicalData),
    new UseLeastFrequentNumberRule(historicalData),
    new RecentRangesRule(historicalData),
  ];
};
