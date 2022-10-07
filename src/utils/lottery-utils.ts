import { DrawType, LotteryDrawModel } from 'types/lottery-draw';

export const parseMegaRecord = (record: Array<string>): LotteryDrawModel => {
  let date = new Date(record[8]);
  let numbers = record[9].split(' ').map((n: string) => parseInt(n));
  let extra = parseInt(record[10]);
  var ldm: LotteryDrawModel = { type: DrawType.MEGA, date: date, series: { numbers: numbers, extra: extra } };
  return ldm;
};

export const getDefaultLDM = (): LotteryDrawModel => {
  let date = new Date();
  let numbers = [0, 0, 0, 0, 0];
  let extra = 0;
  var ldm: LotteryDrawModel = { type: DrawType.MEGA, date: date, series: { numbers: numbers, extra: extra } };
  return ldm;
};
