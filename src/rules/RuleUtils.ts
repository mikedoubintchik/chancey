import { LotteryDrawModel } from 'types/lottery-draw';
import { RecentRangesRule } from './RecentRangesRule';
import { IRuleBase } from './RuleBase';
import { UseFrequentNumberRule } from './UseFrequentNumbersRule';
import { ExcludeLeastFrequentNumberRule } from './ExcludeLeastFrequentNumbersRule';
import { ExcludeRecentExtrasRule } from './ExcludeRecentExtrasRule';

export const getRulesBank = (historicalData: Array<LotteryDrawModel>): Array<IRuleBase> => {
  // console.log('🚀 ~ file: RuleUtils.ts ~ line 9 ~ getRulesBank ~ getRulesBank');
  return [
    new RecentRangesRule(historicalData),
    new UseFrequentNumberRule(historicalData),
    new ExcludeLeastFrequentNumberRule(historicalData),
    new ExcludeRecentExtrasRule(historicalData),
  ];
};
