import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase } from './RuleBase';
export class UseLeastFrequentNumberRule extends RuleBase {
  private leastFrequentCount: number = 6;
  private leastFrequentNumbers: number[];
  private leastFrequentNumbersMask: bigint;
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, lastDrawingsCount = 50, leastFrequentCount = 6) {
    super();
    this.leastFrequentCount = leastFrequentCount;
    this.leastFrequentNumbers = [];
    this.historicalData = historicalData.slice(0, lastDrawingsCount);
    let numberFrequencies = getNumberFrequencies(this.historicalData, lastDrawingsCount);
    this.leastFrequentNumbers = numberFrequencies.slice(0, this.leastFrequentCount).map((item) => item.number);
    console.log(
      '🚀 ~ file: UseLeastFrequentNumberRule.ts ~ line 18 ~ UseLeastFrequentNumberRule ~ constructor ~ leastFrequentNumbers',
      this.leastFrequentNumbers,
    );
    this.leastFrequentNumbersMask = arrayToBitMask(this.leastFrequentNumbers);
  }

  override getDescription(): string {
    return `Use atleast one of the ${this.leastFrequentCount} least frequent numbers in the last 50 drawings.`;
  }

  override getInformation(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the least frequent numbers based on the recent 50 drawings.';
  }

  override calculatePercentageForRecentDrawings(
    historicalData: Array<LotteryDrawModel>,
    lastDrawingsNumber: number = 300,
  ): number {
    let count = 0;
    this.historicalData.forEach((item) => {
      if (this.validateSeries(item.series)) {
        count += 1;
      }
    });

    return count / lastDrawingsNumber;
  }

  private validateSeries(series: SeriesModel): boolean {
    return (this.leastFrequentNumbersMask & series.bitMask) > 0;
  }

  filter(serieses: Array<SeriesModel>, cache = true): Array<SeriesModel> {
    let results = serieses.filter((series) => {
      return this.validateSeries(series);
    });
    if (cache) {
      this.postRuleCache = results;
    }
    return results;
  }

  validate(series: SeriesModel): boolean {
    return this.validateSeries(series);
  }
}
