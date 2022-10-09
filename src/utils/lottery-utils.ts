import { DrawType, LotteryDrawModel } from 'types/lottery-draw';

export type NumberFrequency = {
  number: number;
  frequency: number;
};

export const parseMegaRecord = (record: Array<string>): LotteryDrawModel => {
  let date = new Date(record[8]);
  let numbers = record[9].split(' ').map((n: string) => parseInt(n));
  let extra = parseInt(record[10]);
  var ldm: LotteryDrawModel = {
    type: DrawType.MEGA,
    date: date,
    series: { numbers: numbers, extra: extra, bitMask: arrayToBitMask(numbers) },
  };
  return ldm;
};

export const getDefaultLDM = (): LotteryDrawModel => {
  let date = new Date();
  let numbers = [0, 0, 0, 0, 0];
  let extra = 0;
  var ldm: LotteryDrawModel = {
    type: DrawType.MEGA,
    date: date,
    series: { numbers: numbers, extra: extra, bitMask: arrayToBitMask(numbers) },
  };
  return ldm;
};

export const getNumberFrequencies = (
  historicalData: Array<LotteryDrawModel>,
  useLast = 300,
): Array<NumberFrequency> => {
  const max = 70;
  let frequencies = new Array(max).fill(0);
  let latestData = historicalData.slice(0, useLast);
  latestData.forEach((ldm) => {
    ldm.series.numbers.forEach((n) => {
      frequencies[n - 1] += 1;
    });
  });
  let decor = (v: number, i: number) => [i, v]; // set index to value

  let sortedFrequencies = frequencies.map(decor).sort((a: number[], b: number[]) => b[1] - a[1]);
  // console.log('f', frequencies);
  let sortedFrequenciesList: Array<NumberFrequency> = sortedFrequencies.map((item): NumberFrequency => {
    return {
      number: item[0] + 1,
      frequency: item[1],
    };
  });
  return sortedFrequenciesList;
};

export const arrayToBitMask = (arr: number[]) => {
  let mask = BigInt(0);
  arr.forEach((n) => {
    mask |= BigInt(1) << BigInt(n - 1);
  });
  return mask;
};
