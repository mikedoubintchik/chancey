import intersection from 'lodash/intersection';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase } from './RuleBase';
export class UseFrequentNumberRule extends RuleBase {
  private topFrequentCount: number = 10;
  private lastDrawingsCount: number = 10;
  private topFrequentNumbers: number[];
  private topFrequentNumbersMask: bigint;
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, lastDrawingsCount = 10, topFrequentCount = 10) {
    super();
    this.privateid = 'UseFrequentNumberRule';
    this.privateName = 'Top 10 Frequent';
    this.topFrequentCount = topFrequentCount;
    this.lastDrawingsCount = lastDrawingsCount;
    this.topFrequentNumbers = [];
    this.historicalData = historicalData;
    let numberFrequencies = getNumberFrequencies(this.historicalData, lastDrawingsCount);
    this.topFrequentNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);

    this.topFrequentNumbersMask = arrayToBitMask(this.topFrequentNumbers);
  }

  override get description(): string {
    return `Use atleast one of the top ${this.topFrequentCount} frequent numbers in the last 10 drawings.`;
  }

  override get information(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the top frequent numbers based on the recent 300 drawings.';
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    for (let i = 1; i < lastDrawingsNumber; i++) {
      let historicalSlice = this.historicalData.slice(i, i + 10);
      let numberFrequencies = getNumberFrequencies(historicalSlice, this.lastDrawingsCount);
      let topFrequentNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
      let seriesToVal = this.historicalData[i - 1];
      if (this.validateSeries(seriesToVal.series, topFrequentNumbers)) {
        count += 1;
      }
    }

    return count / lastDrawingsNumber;
  }

  private validateSeries(series: SeriesModel, topFrequentNums: number[]): boolean {
    return series.numbers.filter((val) => topFrequentNums.indexOf(val) > -1).length > 0;
  }

  filter(serieses: Array<SeriesModel>, cache = true): Array<SeriesModel> {
    console.log(
      '🚀 ~ file: UseFrequentNumbersRule.ts ~ line 53 ~ UseFrequentNumberRule ~ filter ~ historical data length - ',
      this.historicalData.length,
    );

    let results = serieses.filter((series) => {
      return this.validateSeries(series, this.topFrequentNumbers);
    });
    if (cache) {
      this.postRuleCache = results;
    }
    return results;
  }

  validate(series: SeriesModel): boolean {
    return this.validateSeries(series, this.topFrequentNumbers);
  }
}
