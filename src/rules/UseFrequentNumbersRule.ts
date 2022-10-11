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
  constructor(historicalData: Array<LotteryDrawModel>, lastDrawingsCount = 10, topFrequentCount = 10) {
    super();
    this.privateid = 'UseFrequentNumberRule';
    this.topFrequentCount = topFrequentCount;
    this.topFrequentNumbers = [];
    this.historicalData = historicalData.slice(0, lastDrawingsCount);
    let numberFrequencies = getNumberFrequencies(this.historicalData, lastDrawingsCount);
    this.topFrequentNumbers = numberFrequencies.slice(0, this.topFrequentCount).map((item) => item.number);
    // console.log(
    //   '🚀 ~ file: UseFrequentNumbersRule.ts ~ line 18 ~ UseFrequentNumberRule ~ constructor ~ topFrequentNumbers',
    //   this.topFrequentNumbers,
    // );
    this.topFrequentNumbersMask = arrayToBitMask(this.topFrequentNumbers);
  }

  override getDescription(): string {
    return `Use atleast one of the top ${this.topFrequentCount} frequent numbers in the last 10 drawings.`;
  }

  override getInformation(): string {
    return 'This rule will force the random series generator to produce combinations that have 1 or more for the top frequent numbers based on the recent 300 drawings.';
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
    return (this.topFrequentNumbersMask & series.bitMask) > 0;
  }

  filter(serieses: Array<SeriesModel>, cache = true): Array<SeriesModel> {
    console.log(
      '🚀 ~ file: UseFrequentNumbersRule.ts ~ line 53 ~ UseFrequentNumberRule ~ filter ~ historical data length - ',
      this.historicalData.length,
    );

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
