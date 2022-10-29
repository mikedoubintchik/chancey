import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase, RuleTarget } from './RuleBase';
export class UseFrequentNumberRule extends RuleBase {
  private topFrequentCount: number = 10;
  private lastDrawingsCount: number = 10;
  private topFrequentNumbers: number[];

  constructor(historicalData: Array<LotteryDrawModel>, topFrequentCount = 10, lastDrawingsCount = 10) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `Use${topFrequentCount}x${lastDrawingsCount}FrequentNumberRule`;
    this.privateName = `Top ${topFrequentCount}x${lastDrawingsCount} Frequent`;
    this.topFrequentCount = topFrequentCount;
    this.lastDrawingsCount = lastDrawingsCount;
    this.topFrequentNumbers = [];

    let numberFrequencies = getNumberFrequencies(this.historicalData, lastDrawingsCount);
    this.topFrequentNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
  }

  override get description(): string {
    return `Use atleast one of the top ${this.topFrequentCount} frequent numbers in the last ${this.lastDrawingsCount} drawings.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have 1 or more for the top ${this.topFrequentCount} frequent numbers based on the recent  ${this.lastDrawingsCount} drawings.`;
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    let totalIterations = 0;
    for (let i = 1; i < lastDrawingsNumber && i + this.lastDrawingsCount <= this.historicalData.length; i++) {
      let historicalSlice = this.historicalData.slice(i, i + this.lastDrawingsCount);
      let numberFrequencies = getNumberFrequencies(historicalSlice, this.lastDrawingsCount);
      let topFrequentNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
      let seriesToVal = this.historicalData[i - 1];
      if (this.validateSeries(seriesToVal.series, topFrequentNumbers)) {
        count += 1;
      }
      totalIterations += 1;
    }

    return count / totalIterations;
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
