import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase, RuleTarget } from './RuleBase';
export class ExcludeAllEvensRule extends RuleBase {
  private leastFrequentNumbers: number[];

  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>) {
    super(RuleTarget.NUMBERS);
    this.privateid = `ExcludeAllEvenssRule`;
    this.privateName = `Exclude All Evens`;

    this.leastFrequentNumbers = [];
    this.historicalData = historicalData; //.slice(0, lastDrawingsCount);
  }

  override get description(): string {
    return `Exclude all the drawings with all numbers being even.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that do not have have all even numbers.`;
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    let totalIterations = 0;
    for (let i = 0; i < lastDrawingsNumber; i++) {
      let seriesToVal = this.historicalData[i];
      if (this.validateSeries(seriesToVal.series)) {
        count += 1;
      }
      totalIterations += 1;
    }

    return count / totalIterations;
  }

  private validateSeries(series: SeriesModel): boolean {
    return series.numbers.filter((val) => val % 2 === 0).length < series.numbers.length;
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
