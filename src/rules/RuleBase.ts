import { LotteryDrawModel } from './../types/lottery-draw';
export interface IRuleBase {
  getDescription(): string;
  getInformation(): string;
  calcPercentageInLastDrawings(lastDrawingsNumbe: number, historicalData: Array<LotteryDrawModel>): number;
}

export class RuleBase implements IRuleBase {
  constructor() {}
  getDescription(): string {
    return '';
  }
  getInformation(): string {
    return '';
  }

  calcPercentageInLastDrawings(lastDrawingsNumber = 400, historicalData: Array<LotteryDrawModel>): number {
    return 0;
  }
}
