import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';
export class BirthdayRule extends RuleBase {
  private birthday: Date = new Date();

  constructor(historicalData: Array<LotteryDrawModel>, birthday: Date) {
    super(RuleTarget.NUMBERS, historicalData);
    this.privateid = `BirthdayRule`;
    this.privateName = `Happy Birthday`;
    this.birthday = birthday;
  }

  override get description(): string {
    return `Use day and month of your birtday.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have the day and the month of your birthday.`;
  }

  private validateSeries(series: SeriesModel): boolean {
    let day = this.birthday.getDate();
    let month = this.birthday.getMonth();
    return series.numbers.indexOf(day) > -1 && series.numbers.indexOf(month) > -1;
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
