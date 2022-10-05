import { DrawType, LotteryDrawModel } from '../types/lottery-draw';

export class LotteryDataUtils {
  static parseMegaRecord(record: string[]): LotteryDrawModel {
    const numbers = record[9].split(' ').map((n: string) => parseInt(n));
    const extra = parseInt(record[10]);

    const lotteryDraw: LotteryDrawModel = {
      type: DrawType.MEGA,
      date: new Date(record[8]),
      series: { numbers, extra },
    };
    return lotteryDraw;
  }
}
