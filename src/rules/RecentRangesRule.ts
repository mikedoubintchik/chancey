import intersection from 'lodash/intersection';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { arrayToBitMask, getNumberFrequencies } from 'utils/lottery-utils';
import { RuleBase } from './RuleBase';
import { min, max } from 'simple-statistics';
export class RecentRangesRule extends RuleBase {
  private recentRangesCount: number = 12;
  private ranges: Array<{ min: number; max: number }> = new Array<{ min: number; max: number }>();
  private historicalData: Array<LotteryDrawModel> = [];
  constructor(historicalData: Array<LotteryDrawModel>, recentRangesCount = 12) {
    super();
    this.privateid = 'RecentRangesRule';
    this.privateName = 'Recent 12 Ranges';
    this.recentRangesCount = recentRangesCount;

    this.historicalData = historicalData.slice(0, recentRangesCount);

    let recentRanges: Array<Array<number>> = [];
    for (let i = 0; i < 5; i++) {
      recentRanges.push(new Array<number>());
    }
    this.historicalData.forEach((element) => {
      for (let i = 0; i < 5; i++) {
        recentRanges[i].push(element.series.numbers[i]);
      }
    });
    recentRanges.forEach((rangeN) => {
      let r = { min: min(rangeN), max: max(rangeN) };
      this.ranges.push(r);
    });
  }

  private getRangesDescription() {
    return this.ranges.map((range) => {
      return `[${range.min}-${range.max}]`;
    });
  }
  override get description(): string {
    return `Numbers must be within ranges ${this.getRangesDescription()}.`;
  }

  override get information(): string {
    return 'This rule will force the random series generator to produce combinations that fall within the positional ranges of the last 12 drawings.';
  }

  override calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    this.historicalData.forEach((item) => {
      if (this.validateSeries(item.series)) {
        count += 1;
      }
    });

    return count / lastDrawingsNumber;
  }

  private validateSeries(series: SeriesModel): boolean {
    let valids = [];
    for (let i = 0; i < 5; i++) {
      if (series.numbers[i] >= this.ranges[i].min && series.numbers[i] <= this.ranges[i].max) {
        valids.push(1);
      }
    }
    return valids.length === 5;
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
