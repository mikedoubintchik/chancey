import { combinations, factorial } from 'simple-statistics';
import { SeriesModel } from 'types/series';
import { arrayToBitMask } from './lottery-utils';

export const getAllCombinations = (N = 70, k = 5) => {
  let start = Date.now();
  // console.log('Started generating combinations...');
  let arr = [];
  for (let i = 0; i < N; i++) {
    arr.push(i + 1);
  }
  let combs = combinations(arr, k);

  start = Date.now();

  let scombs = combs.map((comb) => {
    return {
      numbers: comb,
      extra: 0,
      bitMask: arrayToBitMask(comb),
    } as SeriesModel;
  });

  // console.log(`Total time to generate ${scombs.length} combinations ${Date.now() - start}(ms)`);
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

//combinations iterator
export const combinator = (maxN = 70, sLen = 5, predicate: (comb: number[]) => boolean) => {
  let result: any = [];
  result.length = sLen; //n=2
  var array = [];
  for (var i = 1; i < maxN + 1; i++) {
    array.push(i);
  }
  var count: number = 0;

  function combine(input: any, len: any, start: any) {
    if (len === 0) {
      let comb = [...result];
      if (predicate(comb)) {
        count += 1;
      }
      // totalComb.push([...result]);
      // totalCombs.push({
      //   numbers: [...result],
      //   extra: 0,
      //   bitMask: arrayToBitMask([...result]),
      // } as SeriesModel);
      return;
    }
    for (let i = start; i <= input.length - len; i++) {
      result[result.length - len] = input[i];
      combine(input, len - 1, i + 1);
    }
  }
  combine(array, result.length, 0);

  return count;
};

//all combinations size r with max number n (1..n)
export const nCr = (n: number, r: number) => {
  let f;

  f = (n: number) => {
    // if (n < 0) console.log(n);
    let fact = factorial(Math.abs(n));
    return fact * Math.sign(n);
  };
  return f(n) / f(r) / f(n - r);
};

export const getIndexForCombination = (comb: number[], maxN: number = 70, sLen: number = 5) => {
  let n = maxN;
  let k = sLen;
  let r = nCr(n, k);

  for (let i = 0, _pj_a = k; i < _pj_a; i += 1) {
    if (n - comb[i] < k - i) {
      continue;
    }

    r = r - nCr(n - comb[i], k - i);
  }

  return Number(r) - 1;
};

export const getIndexForCombinationWithExb = (
  comb: number[],
  maxN: number = 70,
  maxPB: number = 25,
  sLen: number = 5,
) => {
  let combN = comb.slice(0, comb.length - 1);
  let combIndex = getIndexForCombination(combN, maxN, sLen);
  combIndex = combIndex * maxPB + (comb[comb.length - 1] - 1);
  return combIndex;
};

// /*
// returns the i-th combination of k numbers chosen from 1,2,...,n
// */
export const getCombinationForIndex = (i: number, maxN = 70, sLen = 5) => {
  i += 1;
  let n = maxN;
  let k = sLen;
  let c, cs, j, r;
  c = [];
  r = i;
  j = 0;

  for (var s = 1, _pj_a = k + 1; s < _pj_a; s += 1) {
    cs = j + 1;

    while (r - nCr(n - cs, k - s) > 0) {
      r -= nCr(n - cs, k - s);
      cs += 1;
    }

    c.push(cs);
    j = cs;
  }
  return c;
};

export const getCombinationWithExbForIndex = (i: number, maxN: number = 70, maxPB: number = 25, sLen: number = 5) => {
  let currentExb = (i % maxPB) + 1;
  i = (i - (i % maxPB)) / maxPB;
  let comb = getCombinationForIndex(i, maxN, sLen);
  comb.push(currentExb);
  return comb;
};
