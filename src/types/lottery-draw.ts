import LotteryDraw from 'components/lottery-draw/LotteryDraw';
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

export interface LotteryTicketModel extends LotteryDrawModel {
  ticketDate: Date;
}

export type TicketTextType = [
  {
    description: string;
  },
];
