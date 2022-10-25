import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';

export class ExcludeRecentExtrasRule extends RuleBase {
  private excludeRecentCount: number = 10;
  private extraBallNumbers: number[] = [];

  constructor(historicalData: Array<LotteryDrawModel>, excludeRecentCount = 10) {
    super(RuleTarget.EXTRA, historicalData);
    this.privateid = `Exclude${excludeRecentCount}RecentExtrasRule`;
    this.privateName = `Exclude ${excludeRecentCount} Extras`;
    this.excludeRecentCount = excludeRecentCount;

    this.extraBallNumbers = historicalData
      .slice(0, this.excludeRecentCount)
      .map((model) => (model.series.extra === null ? -1 : model.series.extra));
  }

  override get description(): string {
    return `Exclude recent ${this.excludeRecentCount} extra numbers in the last ${this.excludeRecentCount} drawings.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have none of the recent ${this.excludeRecentCount} extra numbers in the recent ${this.excludeRecentCount} drawings.`;
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    let totalIterations = 0;
    for (let i = 1; i < lastDrawingsNumber && i + this.excludeRecentCount <= this.historicalData.length; i++) {
      let historicalSlice = this.historicalData.slice(i, i + this.excludeRecentCount);
      let extraBallNumbers = historicalSlice.map((model) => (model.series.extra === null ? -1 : model.series.extra));
      let seriesToVal = this.historicalData[i - 1];
      if (this.validateSeries(seriesToVal.series, extraBallNumbers)) {
        count += 1;
      }
      totalIterations += 1;
    }

    return count / totalIterations;
  }

  private validateSeries(series: SeriesModel, extraBallNumbers: number[]): boolean {
    return extraBallNumbers.indexOf(series.extra!) === -1;
  }

  filter(serieses: Array<SeriesModel>, cache = true): Array<SeriesModel> {
    let results = serieses.filter((series) => {
      return this.validateSeries(series, this.extraBallNumbers);
    });
    if (cache) {
      this.postRuleCache = results;
    }
    return results;
  }

  validate(series: SeriesModel): boolean {
    return this.validateSeries(series, this.extraBallNumbers);
  }
}
