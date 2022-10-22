import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase, RuleTarget } from './RuleBase';
export class ExcludeLeastFrequentNumberRule extends RuleBase {
  private leastFrequentCount: number = 6;
  private lastDrawingsCount: number = 50;
  private leastFrequentNumbers: number[];
  private leastFrequentNumbersMask: bigint;
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, lastDrawingsCount = 50, leastFrequentCount = 6) {
    super(RuleTarget.NUMBERS);
    this.privateid = 'ExcludeLeastFrequentNumberRule';
    this.privateName = 'Six Infrequent';
    this.leastFrequentCount = leastFrequentCount;
    this.lastDrawingsCount = lastDrawingsCount;
    this.leastFrequentNumbers = [];
    this.historicalData = historicalData; //.slice(0, lastDrawingsCount);
    let numberFrequencies = getNumberFrequencies(this.historicalData, lastDrawingsCount);
    numberFrequencies.reverse();
    this.leastFrequentNumbers = numberFrequencies.slice(0, this.leastFrequentCount).map((item) => item.number);

    this.leastFrequentNumbersMask = arrayToBitMask(this.leastFrequentNumbers);
  }

  override get description(): string {
    return `Exclude all of the ${this.leastFrequentCount} least frequent numbers in the last 50 drawings.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have none of the ${this.leastFrequentCount} least frequent numbers based on the recent 50 drawings.`;
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    let totalIterations = 0;
    for (let i = 1; i < lastDrawingsNumber && i + this.lastDrawingsCount <= this.historicalData.length; i++) {
      let historicalSlice = this.historicalData.slice(i, i + this.lastDrawingsCount);
      let numberFrequencies = getNumberFrequencies(historicalSlice, this.lastDrawingsCount);
      numberFrequencies.reverse();
      let leastFrequentNumbers = numberFrequencies.slice(0, this.leastFrequentCount).map((item) => item.number);
      let seriesToVal = this.historicalData[i - 1];
      if (this.validateSeries(seriesToVal.series, leastFrequentNumbers)) {
        count += 1;
      }
      totalIterations += 1;
    }

    return count / totalIterations;
  }

  private validateSeries(series: SeriesModel, leastFrequentNums: number[]): boolean {
    return series.numbers.filter((val) => leastFrequentNums.indexOf(val) === -1).length === series.numbers.length;
    // return (this.leastFrequentNumbersMask & series.bitMask) > 0;
  }

  filter(serieses: Array<SeriesModel>, cache = true): Array<SeriesModel> {
    let results = serieses.filter((series) => {
      return this.validateSeries(series, this.leastFrequentNumbers);
    });
    if (cache) {
      this.postRuleCache = results;
    }
    return results;
  }

  validate(series: SeriesModel): boolean {
    return this.validateSeries(series, this.leastFrequentNumbers);
  }
}
