import { combinations } from 'simple-statistics';

export const getAllCombinations = (maxNum = 70) => {
  console.log('start', Date.now());
  let arr = [];
  for (let i = 0; i < maxNum; i++) {
    arr.push(i + 1);
  }
  let combs = combinations(arr, 5);
  console.log('end', Date.now(), combs.length);
  return combs;
};
