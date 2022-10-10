import { nanoid } from 'nanoid';
import { SeriesModel } from 'types/series';
import { LotteryDrawModel } from './../types/lottery-draw';

export interface IRuleBase {
  id: string;
  getDescription(): string;
  getInformation(): string;
  calculatePercentageForRecentDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumber: number): number;
  validate(series: SeriesModel): boolean;
  filter(serieses: Array<SeriesModel>, cache: boolean): Array<SeriesModel>;
  getPostRuleCache(): Array<SeriesModel> | null;

  readonly processing: boolean;
  setProcessing(processing: boolean): void;
}

export class RuleBase implements IRuleBase {
  id = nanoid();
  protected postRuleCache: Array<SeriesModel> | null = null;
  protected isProcessing: boolean = false;
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

  getPostRuleCache(): Array<SeriesModel> | null {
    return this.postRuleCache;
  }

  filter(serieses: Array<SeriesModel>, cache: boolean): Array<SeriesModel> {
    return [];
  }

  setProcessing(processing: boolean) {
    this.isProcessing = processing;
  }

  get processing(): boolean {
    return this.isProcessing;
  }
}
