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

export type TicketNumbersType = {
  numbers: number[];
  multiplier: number;
};
