import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
import { arrayToBitMask, getNumberFrequencies, parseDate } from 'utils/lottery-utils';

describe('Lottery Utils', () => {
  it('Compute Number Frequencies', () => {
    let history: Array<LotteryDrawModel> = [
      {
        date: new Date(),
        series: {
          numbers: [1, 2, 3, 4, 5],
          extra: 25,
          bitMask: arrayToBitMask([1, 2, 3, 4, 5]),
        },
        type: DrawType.MEGA,
      },
      {
        date: new Date(),
        series: {
          numbers: [5, 6, 7, 8, 9],
          extra: 25,
          bitMask: arrayToBitMask([5, 6, 7, 8, 9]),
        },
        type: DrawType.MEGA,
      },
    ];
    let frequencies = getNumberFrequencies(history);
    expect(frequencies[0]).toEqual({ frequency: 2, number: 5 });
  });

  it('parseDate returns correct ticketDate and drawingDate', () => {
    const testCases = [
      {
        text: 'Lottery.com NCLottery.com NCLotter\nNorth Carolina\nMEGA\nMILLIONS\nMEGAPLIER\nMB\nA. 02 13 27 42 47 QP 02 QP\nSINGLE DRAW FRI JUL29 22\n1169100\n01VVT3&M\nJUL27 22/09:59\n$3.00\nLucke-Rewards Entry Code\nBE\n02NGD - JG6FY - 92200 - H03CV - 9QYTT',
        ticketDate: 'JUL27 22',
        drawingDate: 'JUL29 22',
      },
      {
        text: 'Lottery.com NCLottery.com NCLotter\nNorth Carolina\nMEGA\nMILLIONS\nMEGAPLIER\nMB\nA. 02 13 27 42 47 QP 02 QP\nSINGLE DRAW FRI JUL 29, 2022\n1169100\n01VVT3&M\nJUL 27, 2022 22:09:59\n$3.00\nLucke-Rewards Entry Code\nBE\n02NGD - JG6FY - 92200 - H03CV - 9QYTT',
        ticketDate: 'JUL 27, 2022',
        drawingDate: 'JUL 29, 2022',
      },
      {
        text: 'No dates in this string',
        ticketDate: null,
        drawingDate: null,
      },
    ];

    testCases.forEach(({ text, ticketDate, drawingDate }) => {
      const result = parseDate(text);
      expect(result.ticketDate).toEqual(ticketDate);
      expect(result.drawingDate).toEqual(drawingDate);
    });
  });
});
