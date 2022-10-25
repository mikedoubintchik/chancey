import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { IPostProcessRuleSnapshot } from 'workers/messages';

export enum RuleTarget {
  NUMBERS,
  EXTRA,
}
export interface IRuleBase {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly information: string;
  readonly ruleTarget: RuleTarget;

  calculatePercentageForRecentDrawings(lastDrawingsNumber: number): number;
  validate(series: SeriesModel): boolean;
  filter(serieses: Array<SeriesModel>, cache: boolean): Array<SeriesModel>;

  readonly postProcessingSnapshot: IPostProcessRuleSnapshot | null;
  setPostProcessingSnapshot(snapShot: IPostProcessRuleSnapshot): void;
}

export abstract class RuleBase implements IRuleBase {
  protected privateid: string = 'RuleBase';
  protected privateName: string = 'RuleBase';
  protected privateDescription: string = 'RuleBase';
  protected privateInformation: string = 'RuleBase';

  protected postRuleCache: Array<SeriesModel> | null = null;
  private privateRuleTarget: RuleTarget = RuleTarget.NUMBERS;

  private privatePostProcessingSnapshot: IPostProcessRuleSnapshot | null = null;

  protected historicalData: Array<LotteryDrawModel> = [];

  constructor(ruleTarget: RuleTarget, historicalData: Array<LotteryDrawModel>) {
    this.privateRuleTarget = ruleTarget;
    this.historicalData = historicalData;
  }

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

  get ruleTarget(): RuleTarget {
    return this.privateRuleTarget;
  }

  calculatePercentageForRecentDrawings(lastDrawingsNumber: number = 300): number {
    let count = 0;
    let totalIterations = 0;
    for (let i = 0; i < lastDrawingsNumber; i++) {
      let seriesToVal = this.historicalData[i];
      if (this.validate(seriesToVal.series)) {
        count += 1;
      }
      totalIterations += 1;
    }

    return count / totalIterations;
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
