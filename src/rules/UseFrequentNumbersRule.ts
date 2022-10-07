import { LotteryDrawModel } from 'types/lottery-draw';
import { getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase } from './RuleBase';
import intersection from 'lodash';
export class UseFrequentNumberRule extends RuleBase {
  private useTop: number = 10;
  constructor() {
    super();
  }

  override getDescription(): string {
    return `Use atleast one of the top ${this.useTop} frequent numbers in the last 400 draws`;
  }

  override getInformation(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the top frequent numbers based on the recent 300 drawings.';
  }

  override calcPercentageInLastDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumber = 300): number {
    let numberFrequencies = getNumberFrequencies(historicalData, lastDrawingsNumber);
    let latestData = historicalData.slice(0, lastDrawingsNumber);
    let topNumbers = numberFrequencies.slice(0, this.useTop).map((item) => item.number);
    let count = 0;
    latestData.forEach((item) => {
      let intersections = intersection<Array<number>>([item.series.numbers, topNumbers]);

      if (intersections.size() > 0) {
        count += 1;
      }
    });

    return count / lastDrawingsNumber;
  }
}
