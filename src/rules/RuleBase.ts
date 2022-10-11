import { nanoid } from 'nanoid';
import { SeriesModel } from 'types/series';
import { LotteryDrawModel } from './../types/lottery-draw';

export interface IRuleBase {
  readonly id: string;
  readonly postProcessingChances: number;
  getDescription(): string;
  getInformation(): string;
  calculatePercentageForRecentDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumber: number): number;
  validate(series: SeriesModel): boolean;
  filter(serieses: Array<SeriesModel>, cache: boolean): Array<SeriesModel>;
  getPostRuleCache(): Array<SeriesModel> | null;

  setPostProcessingChances(chances: number): void;
}

export class RuleBase implements IRuleBase {
  protected privateid: string = 'RuleBase';
  protected postRuleCache: Array<SeriesModel> | null = null;
  protected isProcessing: boolean = true;
  protected privatePostProcessingChances = 0;
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

  setPostProcessingChances(chances: number): void {
    this.privatePostProcessingChances = chances;
  }

  get id(): string {
    return this.privateid;
  }

  get postProcessingChances(): number {
    return this.privatePostProcessingChances;
  }
}
