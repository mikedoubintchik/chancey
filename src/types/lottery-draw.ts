import { SeriesModel } from './series';

export type LotteryDrawModel = {
  type: 'mega' | 'pb';
  series: SeriesModel;
  date: Date;
};
