import { DrawType, LotteryDrawModel, TicketNumbersType } from 'types/lottery-draw';
import { min, max } from 'simple-statistics';
import { format, parse } from 'date-fns';

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
    series: { numbers: numbers, extra: extra }, //bitMask: arrayToBitMask(numbers)
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
    series: { numbers: numbers, extra: extra }, //bitMask: arrayToBitMask(numbers)
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

export const getRanges = (
  historicalData: Array<LotteryDrawModel>,
  useLast = 300,
): Array<{ min: number; max: number }> => {
  let latestData = historicalData.slice(0, useLast);
  let recentRanges: Array<Array<number>> = [];
  let ranges: Array<{ min: number; max: number }> = new Array<{ min: number; max: number }>();
  for (let i = 0; i < 5; i++) {
    recentRanges.push(new Array<number>());
  }
  latestData.forEach((element) => {
    for (let i = 0; i < 5; i++) {
      recentRanges[i].push(element.series.numbers[i]);
    }
  });
  recentRanges.forEach((rangeN) => {
    let r = { min: min(rangeN), max: max(rangeN) };
    ranges.push(r);
  });
  return ranges;
};

export const arrayToBitMask = (arr: number[]) => {
  let mask = BigInt(0);
  arr.forEach((n) => {
    mask |= BigInt(1) << BigInt(n - 1);
  });
  return mask;
};

export const formatPercentage = (decimal: number | null | undefined) => {
  if (decimal === null || decimal === undefined) {
    return 0;
  } else {
    return Math.round(decimal * 1000) / 10;
  }
};

export function parseMegaMillionsNumbersAndMultiplier(text: string): LotteryDrawModel | false {
  const regexConsecutiveNumbers = /(\d{2}\s?){5}/; // Matches 5 consecutive double-digit numbers
  const regexMultiplier = /QP\s(\d+)/; // Matches the multiplier preceded by "QP"
  let result: LotteryDrawModel | false = false;

  const consecutiveNumbersMatch = text.match(regexConsecutiveNumbers);
  const multiplierMatch = text.match(regexMultiplier);

  if (consecutiveNumbersMatch && multiplierMatch) {
    const numbers = consecutiveNumbersMatch[0].match(/\d{2}/g)?.map(Number);
    const extra = Number(multiplierMatch[1]);

    if (numbers?.length === 5 && numbers.every((num) => num >= 1 && num <= 70) && extra >= 1 && extra <= 25) {
      result = { type: DrawType['MEGA'], series: { numbers, extra }, date: new Date() };
    } else {
      throw new Error('Invalid numbers or extra number detected.');
    }
  } else {
    throw new Error('No valid consecutive numbers or extra number found.');
  }

  return result;
}

export function parseDate(text: string): { ticketDate: string | null; drawingDate: string | null } {
  const dateRegex = /([A-Z]{3,})\s?(\d{1,2})(?:[.,])?(?:\s(\d{2,4}))?/gi;
  const matches = text.match(dateRegex);

  if (!matches) {
    return { ticketDate: null, drawingDate: null };
  }

  const dates = matches.map((match) => {
    const [_, month, day, year] = match.match(/([A-Z]{3,})\s?(\d{1,2})(?:[.,])?(?:\s(\d{2,4}))?/i) || [];
    const parsedYear = year ? (year.length === 2 ? `20${year}` : year) : new Date().getFullYear().toString();
    const date = parse(`${month} ${day} ${parsedYear}`, 'MMM d yyyy', new Date());
    return { text: match, date };
  });

  if (dates.length === 1) {
    return { ticketDate: null, drawingDate: format(dates[0].date, 'MMMM d, yyyy') };
  }

  const numbersMatch = text.match(/\b\d{2}\b/g);
  const numbers = numbersMatch ? numbersMatch.map(Number) : [];

  if (numbers.length === 0) {
    return { ticketDate: format(dates[0].date, 'MMMM d, yyyy'), drawingDate: format(dates[1].date, 'MMMM d, yyyy') };
  }

  const ticketDate = dates.reduce((closestDate, currentDate) => {
    const currentDiff = Math.abs(currentDate.date.getTime() - numbers[0]);
    const closestDiff = Math.abs(closestDate.date.getTime() - numbers[0]);
    return currentDiff < closestDiff ? currentDate : closestDate;
  });

  const drawingDate = dates.find((date) => date !== ticketDate);

  return {
    ticketDate: ticketDate ? format(ticketDate.date, 'MMMM d, yyyy') : null,
    drawingDate: drawingDate ? format(drawingDate.date, 'MMMM d, yyyy') : null,
  };
}
