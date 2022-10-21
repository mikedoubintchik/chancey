/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { IRuleBase } from 'rules/RuleBase';
import { getRulesBank } from 'rules/RuleUtils';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { combinator, getCombinationForIndex, getCombinationWithExbForIndex, nCr } from 'utils/combinatorics';
import {
  IGenerateDrawResponse,
  IInitRuleEngineResponse,
  IPostProcessRuleSnapshot,
  IPostRuleProcessingResponse,
  Message,
  MessageType,
} from './messages';

let rulesBank: Array<IRuleBase> = [];
let initialTotalCombs = 0;
let userRuleIds: string[] = [];

// console.log('loaded worker file');
postMessage({ type: MessageType.WORKER_LOADED, data: {} } as Message);
onmessage = (event) => {
  let m = event.data as Message;
  if (m.type === MessageType.INIT_RULE_ENGINE && initialTotalCombs === 0) {
    let historicalData = m.data.historicalData as Array<LotteryDrawModel>;
    // console.log('🚀 ~ file: rule-engine.worker.ts ~ line 25 ~ historicalData', m.data);
    rulesBank = getRulesBank(historicalData);

    initialTotalCombs = combinator(70, 5, (comb) => {
      return true;
    });
    postMessage({
      type: MessageType.INIT_RULE_ENGINE_COMPLETE,
      data: { cacheSize: initialTotalCombs, rulesBankSize: rulesBank.length } as IInitRuleEngineResponse,
    } as Message);
  }
  if (m.type === MessageType.PROCESS_RULE) {
    let ruleId = m.data.ruleId;
    userRuleIds.push(ruleId);
    let postProcessRuleSnapshots = processRules();

    postMessage({
      type: MessageType.PROCESS_RULE_COMPLETE,
      data: { ruleSnapShots: postProcessRuleSnapshots } as IPostRuleProcessingResponse,
    } as Message);
    // console.log(`processing rule index ${ruleIndex}`);
  }
  if (m.type === MessageType.UN_PROCESS_RULE) {
    let ruleId = m.data.ruleId;
    let removalIndex = userRuleIds.indexOf(ruleId);
    if (removalIndex > -1) {
      userRuleIds.splice(removalIndex, 1);
    }
    let postProcessRuleSnapshots = processRules();
    postMessage({
      type: MessageType.UN_PROCESS_RULE_COMPLETE,
      data: { ruleSnapShots: postProcessRuleSnapshots } as IPostRuleProcessingResponse,
    } as Message);
    // console.log(`processing rule index ${ruleIndex}`);
  }
  if (m.type === MessageType.GENERATE_DRAW) {
    let count = m.data.count;
    console.log('🚀 ~ file: rule-engine.worker.ts ~ line 65 ~ count', count);

    let drawings = generateDrawings(count);
    postMessage({
      type: MessageType.GENERATE_DRAW_COMPLETE,
      data: { drawings: drawings } as IGenerateDrawResponse,
    } as Message);
  }
};

const getUserRules = () => {
  let userRules: Array<IRuleBase> = [];
  userRuleIds.forEach((ruleId) => {
    let index = rulesBank.findIndex((rule) => ruleId === rule.id);
    if (index > -1) {
      userRules.push(rulesBank[index]);
    }
  });
  return userRules;
};

const processRules = () => {
  let userRules: Array<IRuleBase> = getUserRules();
  const perRuleValidCount: Map<string, number> = new Map<string, number>();
  let report: Array<IPostProcessRuleSnapshot> = [];
  userRules.forEach((rule) => {
    perRuleValidCount.set(rule.id, 0);
  });

  const valdate = (comb: number[]) => {
    let totalValids = 0;
    let prevRuleWasValid = true;
    userRules.forEach((rule) => {
      if (prevRuleWasValid) {
        let valid = rule.validate({ numbers: comb, extra: 0 } as SeriesModel);
        if (valid) {
          totalValids += 1;
          let count = perRuleValidCount.get(rule.id);
          if (count === undefined) count = 0;
          perRuleValidCount.set(rule.id, count + 1);
        } else {
          prevRuleWasValid = false;
        }
      }
    });
    return totalValids > 0;
  };

  combinator(70, 5, valdate);

  let prevStateTotalCombs = initialTotalCombs;
  perRuleValidCount.forEach((value, ruleId) => {
    report.push({
      ruleId: ruleId,
      postProcessCacheSize: value,
      percentageOfImprovementFromBase: 1 - value / initialTotalCombs,
      percentageOfImprovementFromPrevState: 1 - value / prevStateTotalCombs,
    });
    prevStateTotalCombs = value;
  });
  return report;
};

const generateDrawings = (count: number) => {
  let userRules: Array<IRuleBase> = getUserRules();
  let maxIndex = Math.round(nCr(70, 5)) * 25;
  console.log('🚀 ~ file: rule-engine.worker.ts ~ line 131 ~ generateDrawings ~ maxIndex', maxIndex);
  let finalCombs: Array<SeriesModel> = [];
  const validForAllRules = (numbers: number[], extra: number) => {
    let totalValids = 0;
    userRules.forEach((rule) => {
      let valid = rule.validate({ numbers: numbers, extra: extra } as SeriesModel);
      if (valid) {
        totalValids += 1;
      }
    });
    return totalValids === userRules.length;
  };

  for (let i = 0; i < count; i++) {
    let randIndex = (Math.random() * (maxIndex - 1)) | 0;
    console.log('🚀 ~ file: rule-engine.worker.ts ~ line 145 ~ generateDrawings ~ randIndex', randIndex);

    let comb = getCombinationWithExbForIndex(randIndex, 70, 25, 5);
    let numbers = comb.slice(0, 5);
    let extra = comb[comb.length - 1];
    while (validForAllRules(numbers, extra) === false) {
      console.log('🚀 ~ file: rule-engine.worker.ts ~ line 153 ~ generateDrawings ~ rejected randIndex', randIndex);
      console.log('🚀 ~ file: rule-engine.worker.ts ~ line 152 ~ generateDrawings ~ numbers, extra', numbers, extra);

      randIndex = (Math.random() * (maxIndex - 1)) | 0;
      comb = getCombinationWithExbForIndex(randIndex, 70, 25, 5);
      numbers = comb.slice(0, 5);
      extra = comb[comb.length - 1];
    }
    let seriesModel: SeriesModel = { numbers: numbers, extra: extra };
    finalCombs.push(seriesModel);
  }
  return finalCombs;
};
