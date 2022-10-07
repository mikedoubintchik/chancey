import { LotteryDrawModel } from './../types/lottery-draw';
export interface IRuleBase {
  getDescription(): string;
  getInformation(): string;
  calcPercentageInLastDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumbe: number): number;
}

export class RuleBase implements IRuleBase {
  constructor() {}
  getDescription(): string {
    return '';
  }
  getInformation(): string {
    return '';
  }

  calcPercentageInLastDrawings(historicalData: Array<LotteryDrawModel>, lastDrawingsNumbe: number): number {
    return 0;
  }
}
