import { nanoid } from 'nanoid';
import { SeriesModel } from 'types/series';
import { IPostProcessRuleSnapshot } from 'workers/messages';
import { LotteryDrawModel } from './../types/lottery-draw';

export interface IRuleBase {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly information: string;
  // getDescription(): string;
  // getInformation(): string;
  calculatePercentageForRecentDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumber: number): number;
  validate(series: SeriesModel): boolean;
  filter(serieses: Array<SeriesModel>, cache: boolean): Array<SeriesModel>;

  readonly postProcessingSnapshot: IPostProcessRuleSnapshot | null;
  setPostProcessingSnapshot(snapShot: IPostProcessRuleSnapshot): void;
}

export class RuleBase implements IRuleBase {
  protected privateid: string = 'RuleBase';
  protected privateName: string = 'RuleBase';
  protected privateDescription: string = 'RuleBase';
  protected privateInformation: string = 'RuleBase';

  protected postRuleCache: Array<SeriesModel> | null = null;
  private privatePostProcessingSnapshot: IPostProcessRuleSnapshot | null = null;

  get id(): string {
    return this.privateid;
  }

  get name(): string {
    return this.privateName;
  }

  get description(): string {
    return this.privateDescription;
  }

  get information(): string {
    return this.privateInformation;
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

  setPostProcessingSnapshot(snapShot: IPostProcessRuleSnapshot): void {
    this.privatePostProcessingSnapshot = snapShot;
  }

  get postProcessingSnapshot(): IPostProcessRuleSnapshot | null {
    return this.privatePostProcessingSnapshot;
  }
}
