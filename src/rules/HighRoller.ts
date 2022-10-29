import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';

export class HighRollerRule extends RuleBase {
  private minNumber: number = 1;

  constructor(historicalData: Array<LotteryDrawModel>, minNumber = 36) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `HighRollerRule`;
    this.privateName = `High Roller`;
    this.minNumber = minNumber;
  }

  override get description(): string {
    return `Use nubmers that are greater than ${this.minNumber - 1}.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have numbers that are greater than ${
      this.minNumber - 1
    }.`;
  }

  private validateSeries(series: SeriesModel): boolean {
    return series.numbers[0] >= this.minNumber;
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
