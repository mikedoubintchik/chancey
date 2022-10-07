import { nanoid } from 'nanoid';
import { SeriesModel } from 'types/series';
import { LotteryDrawModel } from './../types/lottery-draw';

export interface IRuleBase {
  id: string;
  getDescription(): string;
  getInformation(): string;
  calculatePercentageForRecentDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumber: number): number;
  validate(series: SeriesModel): boolean;
}

export class RuleBase implements IRuleBase {
  id = nanoid();

  getDescription(): string {
    return '';
  }

  getInformation(): string {
    return '';
  }

  calculatePercentageForRecentDrawings(
    historicalData: Array<LotteryDrawModel>,
    lastDrawingsNumber: number = 300,
  ): number {
    return 0;
  }

  validate(series: SeriesModel): boolean {
    return false;
  }
}
