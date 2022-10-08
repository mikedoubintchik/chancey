import { UseFrequentNumberRule } from 'rules/UseFrequentNumbersRule';
import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';

jest.mock('nanoid', () => {
  return { nanoid: () => '1234' };
});

describe('Use Frequent Numbers Rule', () => {
  it('Calculates percentage in recent drawings', () => {
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
          numbers: [1, 2, 3, 4, 5],
          extra: 25,
        },
        type: DrawType.MEGA,
      },
    ];
    let rule = new UseFrequentNumberRule(history);
    let precentage = rule.calculatePercentageForRecentDrawings(history, 2);
    expect(precentage).toEqual(1);
  });

  it('Filters serieses that the rule apply to', () => {
    let historicalData: Array<LotteryDrawModel> = new Array<LotteryDrawModel>();
    for (let i = 0; i < 5; i++) {
      historicalData.push({
        date: new Date(),
        series: {
          numbers: [1, 2, 3, 4, 5],
          extra: 25,
        },
        type: DrawType.MEGA,
      });
      historicalData.push({
        date: new Date(),
        series: {
          numbers: [6, 7, 8, 9, 10],
          extra: 25,
        },
        type: DrawType.MEGA,
      });
    }
    let rule = new UseFrequentNumberRule(historicalData);
    let serieses: Array<SeriesModel> = [
      {
        numbers: [11, 12, 13, 14, 15],
        extra: 4,
      },
    ];

    let filtered = rule.filter(serieses, historicalData, 2);
    expect(filtered.length).toEqual(0);
  });
});
