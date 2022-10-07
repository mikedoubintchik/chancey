import { LotteryDrawModel } from 'types/lottery-draw';
import { getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase } from './RuleBase';
import intersection from 'lodash/intersection';
import { SeriesModel } from 'types/series';
export class UseFrequentNumberRule extends RuleBase {
  private useTop: number = 10;

  constructor(lastDrawingsNumber = 300, useTop = 10) {
    super();
    this.useTop = useTop;
  }

  override getDescription(): string {
    return `Use atleast one of the top ${this.useTop} frequent numbers in the last 400 draws`;
  }

  override getInformation(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the top frequent numbers based on the recent 300 drawings.';
  }

  override calculatePercentageForRecentDrawings(
    historicalData: Array<LotteryDrawModel>,
    lastDrawingsNumber: number = 300,
  ): number {
    let numberFrequencies = getNumberFrequencies(historicalData, lastDrawingsNumber);
    let latestData = historicalData.slice(0, lastDrawingsNumber);
    let topNumbers = numberFrequencies.slice(0, this.useTop).map((item) => item.number);
    let count = 0;
    latestData.forEach((item) => {
      if (this.validateSeries(item.series, topNumbers)) {
        count += 1;
      }
    });

    return count / lastDrawingsNumber;
  }

  private validateSeries(series: SeriesModel, topNumbers: Array<number>): boolean {
    let intersections = intersection(series.numbers, topNumbers);
    return intersections.length > 0;
  }

  filter(
    serieses: Array<SeriesModel>,
    historicalData: Array<LotteryDrawModel>,
    lastDrawingsNumber: number = 300,
  ): Array<SeriesModel> {
    let numberFrequencies = getNumberFrequencies(historicalData, lastDrawingsNumber);
    let latestData = historicalData.slice(0, lastDrawingsNumber);
    let topNumbers = numberFrequencies.slice(0, this.useTop).map((item) => item.number);
    console.log(numberFrequencies);

    return serieses.filter((series) => {
      // console.log(topNumbers);
      // console.log(series.numbers);
      // console.log(intersection<Array<number>>([[2], [2]]));
      // console.log(intersection(series.numbers, topNumbers));
      return this.validateSeries(series, topNumbers);
    });
  }
}
