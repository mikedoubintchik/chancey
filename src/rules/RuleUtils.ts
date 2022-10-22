import { LotteryDrawModel } from 'types/lottery-draw';
import { RecentRangesRule } from './RecentRangesRule';
import { IRuleBase } from './RuleBase';
import { UseFrequentNumberRule } from './UseFrequentNumbersRule';
import { ExcludeLeastFrequentNumberRule } from './ExcludeLeastFrequentNumbersRule';
import { ExcludeRecentExtrasRule } from './ExcludeRecentExtrasRule';
import { ExcludeAllOddsRule } from './ExcludeAllOddsRule';
import { ExcludeAllEvensRule } from './ExcludeAllEvent';

export const getRulesBank = (historicalData: Array<LotteryDrawModel>): Array<IRuleBase> => {
  // console.log('🚀 ~ file: RuleUtils.ts ~ line 9 ~ getRulesBank ~ getRulesBank');
  return [
    new RecentRangesRule(historicalData, 10),
    new RecentRangesRule(historicalData, 50),
    new UseFrequentNumberRule(historicalData, 5),
    new UseFrequentNumberRule(historicalData, 10),
    new ExcludeLeastFrequentNumberRule(historicalData, 5),
    new ExcludeLeastFrequentNumberRule(historicalData, 10),
    new ExcludeAllOddsRule(historicalData),
    new ExcludeAllEvensRule(historicalData),
    new ExcludeRecentExtrasRule(historicalData, 5),
    new ExcludeRecentExtrasRule(historicalData, 10),
  ];
};
