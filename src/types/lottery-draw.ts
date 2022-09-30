import { SeriesModel } from './series';

export enum DrawType {
  MEGA = 'mega',
  PB = 'pb',
}

export type LotteryDrawModel = {
  type: DrawType;
  series: SeriesModel;
  date: Date;
};
