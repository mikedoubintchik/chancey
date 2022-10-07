import { LotteryDrawModel } from 'types/lottery-draw';
import { RuleBase } from './RuleBase';

export class UseFrequentNumberRule extends RuleBase {
  constructor() {
    super();
  }

  override getDescription(): string {
    return 'Use atleast one of the top 10 frequent numbers in the last 400 draws';
  }

  override getInformation(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the top frequent numbers based on the recent 400 drawings.';
  }

  override calcPercentageInLastDrawings(lastDrawingsNumber = 400, historicalData: Array<LotteryDrawModel>): number {
    return 0;
  }
}
