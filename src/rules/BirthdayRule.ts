import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase, RuleTarget } from './RuleBase';
export class BirthdayRule extends RuleBase {
  private birthday: Date = new Date();
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, birthday: Date) {
    super(RuleTarget.NUMBERS);
    this.privateid = `BirthdayRule`;
    this.privateName = `Birthday Rule`;
    this.birthday = birthday;

    this.historicalData = historicalData;
  }

  override get description(): string {
    return `Use day and month of your birtday.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have the day and the month of your birthday.`;
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
