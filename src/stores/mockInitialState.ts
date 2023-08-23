import { DrawType } from 'types/lottery-draw';
import { InitialStateType } from 'stores/store';
import mockHistoricalData from 'stores/mockHistoricalData';

const mockInitialState: InitialStateType = {
  user: {
    uid: '4VfLNhjOjwXwvLEK2qE6t3W9Hgb2',
    displayName: 'Mike Doubintchik',
    email: 'mike.doubintchik@gmail.com',
    providerId: 'google.com',
  },
  signupUser: null,
  welcomeFinished: true,
  ticketPhotos: [
    {
      fileName: 'string',
      filePath: 'string',
      ticketText: {
        description:
          'Lottery.com NCLottery.com NCLotter\n' +
          'North Carolina\n' +
          'MEGA\n' +
          'MILLIONS\n' +
          'MEGAPLIER\n' +
          'MB\n' +
          'A. 02 13 27 42 47 QP 02 QP\n' +
          'SINGLE DRAW FRI JUL29 22\n' +
          '1169100\n' +
          '01VVT3&M\n' +
          'JUL27 22/09:59\n' +
          '$3.00\n' +
          'Lucke-Rewards Entry Code\n' +
          'BE\n' +
          '02NGD - JG6FY - 92200 - H03CV - 9QYTT',
      },
    },
  ],
  latestTicket: {
    fileName: '',
    filePath: '',
    values: [
      {
        type: DrawType.MEGA,
        series: {
          numbers: [1, 2, 3, 4, 5],
          extra: 6,
        },

        date: new Date('May 22, 2023'),
      },
      {
        type: DrawType.MEGA,
        series: {
          numbers: [2, 5, 6, 7, 8],
          extra: 6,
        },

        date: new Date('May 22, 2023'),
      },
      {
        type: DrawType.MEGA,
        series: {
          numbers: [9, 10, 11, 12, 13],
          extra: 6,
        },

        date: new Date('May 22, 2023'),
      },
    ],
    ticketDate: new Date('May 22, 2023'),
  },
  rules: [],
  cache: [],
  historicalData: mockHistoricalData,
  rulesBank: [],
  initialChances: 0,
  finalChances: 0,
  historicalLuckyGeneratedResults: [],
  // postProcessingSnapshot: [],
};

export default mockInitialState;
