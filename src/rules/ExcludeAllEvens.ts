import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';

export class ExcludeAllEvensRule extends RuleBase {
  constructor(historicalData: Array<LotteryDrawModel>) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `ExcludeAllEvenssRule`;
    this.privateName = `Not All Event Stevens`;
  }

  override get description(): string {
    return `Exclude all the drawings with all numbers being even.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that do not have have all even numbers.`;
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
