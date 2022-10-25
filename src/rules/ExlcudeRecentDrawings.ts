import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';

export class ExcludeRecentDrawingsNumbersRule extends RuleBase {
  private lastDrawingsCount: number = 3;
  private recentDrawingsNumbers: number[];

  constructor(historicalData: Array<LotteryDrawModel>, lastDrawingsCount = 3) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `Exclude${lastDrawingsCount}RecentDrawingsNumbersRule`;
    this.privateName = `Recent ${lastDrawingsCount} Drawings Out`;

    this.lastDrawingsCount = lastDrawingsCount;
    this.recentDrawingsNumbers = new Array<number>().concat(
      ...this.historicalData.slice(0, this.lastDrawingsCount).map((model) => model.series.numbers),
    );
  }

  override get description(): string {
    return `Exclude all of the numbers that appeared in the last ${this.lastDrawingsCount} drawings.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have none of the numbers that appeared in the last ${this.lastDrawingsCount} drawings.`;
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    let totalIterations = 0;
    for (let i = 1; i < lastDrawingsNumber && i + this.lastDrawingsCount <= this.historicalData.length; i++) {
      let historicalSlice = this.historicalData.slice(i, i + this.lastDrawingsCount);
      let recentNumbers = new Array<number>().concat(...historicalSlice.map((model) => model.series.numbers));

      let seriesToVal = this.historicalData[i - 1];
      if (this.validateSeries(seriesToVal.series, recentNumbers)) {
        count += 1;
      }
      totalIterations += 1;
    }

    return count / totalIterations;
  }

  private validateSeries(series: SeriesModel, recentNumbers: number[]): boolean {
    return series.numbers.filter((val) => recentNumbers.indexOf(val) === -1).length === series.numbers.length;
  }

  filter(serieses: Array<SeriesModel>, cache = true): Array<SeriesModel> {
    let results = serieses.filter((series) => {
      return this.validateSeries(series, this.recentDrawingsNumbers);
    });
    if (cache) {
      this.postRuleCache = results;
    }
    return results;
  }

  validate(series: SeriesModel): boolean {
    return this.validateSeries(series, this.recentDrawingsNumbers);
  }
}
