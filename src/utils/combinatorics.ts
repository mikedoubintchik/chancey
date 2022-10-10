import { combinations } from 'simple-statistics';
import { SeriesModel } from 'types/series';
import { arrayToBitMask } from './lottery-utils';

export const getAllCombinations = (N = 70, k = 5) => {
  let start = Date.now();
  console.log('Started generating combinations...');
  let arr = [];
  for (let i = 0; i < N; i++) {
    arr.push(i + 1);
  }
  let combs = combinations(arr, k);
  // console.log('end', Date.now() - start, combs.length);
  // console.log(combs[123422]);
  start = Date.now();
  // console.log('start', start);

  // combs = getAllCombinations2(N, k);
  let scombs = combs.map((comb) => {
    return {
      numbers: comb,
      extra: 0,
      bitMask: arrayToBitMask(comb),
    } as SeriesModel;
  });
  // console.log(combs[123422]);
  // let scombs = getAllCombinations2(N, k);
  console.log(`Total time to generate ${scombs.length} combinations ${Date.now() - start}(ms)`);
  return scombs;
};

export const getAllCombinations2 = (maxN = 70, sLen = 5) => {
  let result: any = [];
  result.length = sLen; //n=2
  var array = [];
  for (var i = 1; i < maxN + 1; i++) {
    array.push(i);
  }
  var totalCombs: any = [];

  function combine(input: any, len: any, start: any) {
    if (len === 0) {
      // totalComb.push([...result]);
      totalCombs.push({
        numbers: [...result],
        extra: 0,
        bitMask: arrayToBitMask([...result]),
      } as SeriesModel);
      return;
    }
    for (let i = start; i <= input.length - len; i++) {
      result[result.length - len] = input[i];
      combine(input, len - 1, i + 1);
    }
  }
  combine(array, result.length, 0);

  return totalCombs;
};
