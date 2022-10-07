import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
import { getNumberFrequencies } from 'utils/lottery-utils';

describe('Lottery Utils', () => {
  it('Compute Number Frequencies', () => {
    let history: Array<LotteryDrawModel> = [
      {
        date: new Date(),
        series: {
          numbers: [1, 2, 3, 4, 5],
          extra: 25,
        },
        type: DrawType.MEGA,
      },
      {
        date: new Date(),
        series: {
          numbers: [5, 6, 7, 8, 9],
          extra: 25,
        },
        type: DrawType.MEGA,
      },
    ];
    let frequencies = getNumberFrequencies(history);
    expect(frequencies[0]).toEqual({ frequency: 2, number: 5 });
  });
});
