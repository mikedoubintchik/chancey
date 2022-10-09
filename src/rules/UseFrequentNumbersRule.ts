import intersection from 'lodash/intersection';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase } from './RuleBase';
export class UseFrequentNumberRule extends RuleBase {
  private topFrequentCount: number = 10;
  private topFrequentNumbers: number[];
  private topFrequentNumbersMask: bigint;
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, lastDrawingsCount = 300, topFrequentCount = 10) {
    super();
    this.topFrequentCount = topFrequentCount;
    this.topFrequentNumbers = [];
    this.historicalData = historicalData.slice(0, lastDrawingsCount);
    let numberFrequencies = getNumberFrequencies(this.historicalData, lastDrawingsCount);
    this.topFrequentNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
    console.log(
      '🚀 ~ file: UseFrequentNumbersRule.ts ~ line 18 ~ UseFrequentNumberRule ~ constructor ~ topFrequentNumbers',
      this.topFrequentNumbers,
    );
    this.topFrequentNumbersMask = arrayToBitMask(this.topFrequentNumbers);
  }

  override getDescription(): string {
    return `Use atleast one of the top ${this.topFrequentCount} frequent numbers in the last 400 draws`;
  }

  override getInformation(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the top frequent numbers based on the recent 300 drawings.';
  }

  override calculatePercentageForRecentDrawings(
    historicalData: Array<LotteryDrawModel>,
    lastDrawingsNumber: number = 300,
  ): number {
    // let numberFrequencies = getNumberFrequencies(historicalData, lastDrawingsNumber);
    // let latestData = historicalData.slice(0, lastDrawingsNumber);
    // let topNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
    // this.topNumbers = topNumbers;
    let count = 0;
    this.historicalData.forEach((item) => {
      if (this.validateSeries(item.series)) {
        count += 1;
      }
    });

    return count / lastDrawingsNumber;
  }

  private validateSeries(series: SeriesModel): boolean {
    // let mask = arrayToBitMask(topNumbers);
    // let intersections = intersection(series.numbers, topNumbers);
    // return intersections.length > 0;
    return (this.topFrequentNumbersMask & series.bitMask) > 0;
  }

  filter(
    serieses: Array<SeriesModel>,
    historicalData: Array<LotteryDrawModel>,
    lastDrawingsNumber: number = 300,
  ): Array<SeriesModel> {
    // let numberFrequencies = getNumberFrequencies(historicalData, lastDrawingsNumber);
    // let latestData = historicalData.slice(0, lastDrawingsNumber);
    // let topNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
    // // console.log(numberFrequencies);
    // this.topNumbers = topNumbers;
    return serieses.filter((series) => {
      // console.log(topNumbers);
      // console.log(series.numbers);
      // console.log(intersection<Array<number>>([[2], [2]]));
      // console.log(intersection(series.numbers, topNumbers));
      return this.validateSeries(series);
    });
  }

  validate(series: SeriesModel): boolean {
    return this.validateSeries(series);
  }
}
