import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';
export class ExcludeAllOddsRule extends RuleBase {
  constructor(historicalData: Array<LotteryDrawModel>) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `ExcludeAllOddsRule`;
    this.privateName = `Can't Alls be Odd Balls`;
  }

  override get description(): string {
    return `Exclude all the drawings with all numbers being odd.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that do not have all odd numbers.`;
  }

  private validateSeries(series: SeriesModel): boolean {
    return series.numbers.filter((val) => val % 2 !== 0).length < series.numbers.length;
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
