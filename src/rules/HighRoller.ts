import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { RuleBase, RuleTarget } from './RuleBase';

export class HighRollerRule extends RuleBase {
  private minNumber: number = 1;
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, minNumber = 36) {
    super(RuleTarget.NUMBERS);
    this.privateid = `HighRollerRule`;
    this.privateName = `High Roller`;
    this.minNumber = minNumber;

    this.historicalData = historicalData;
  }

  override get description(): string {
    return `Use nubmers that are greater than ${this.minNumber - 1}.`;
  }

  override get information(): string {
    return `This rule will force the random series generator to produce combinations that have numbers that are greater than ${
      this.minNumber - 1
    }.`;
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
