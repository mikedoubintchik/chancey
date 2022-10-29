import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';

export class LowBallerRule extends RuleBase {
  private maxNumber: number = 70;

  constructor(historicalData: Array<LotteryDrawModel>, maxNumber = 35) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `LowBallerRule`;
    this.privateName = `Low Baller`;
    this.maxNumber = maxNumber;
  }

  override get description(): string {
    return `Use nubmers that are smaller than  ${this.maxNumber + 1}.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have numbers that are smaller than ${
      this.maxNumber + 1
    }.`;
  }

  private validateSeries(series: SeriesModel): boolean {
    return series.numbers[series.numbers.length - 1] <= this.maxNumber;
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
