/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { IRuleBase } from 'rules/RuleBase';
import { getRulesBank } from 'rules/RuleUtils';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { getAllCombinations } from 'utils/combinatorics';
import {
  MessageType,
  Message,
  IInitRuleEngineResponse,
  IPostRuleProcessingResponse,
  IPostProcessRuleSnapshot,
} from './messages';
// declare const self: DedicatedWorkerGlobalScope;
type CacheRecord = {
  ruleId: string;
  cache: Array<SeriesModel>;
};

let initialCache: Array<SeriesModel> = [];
let rulesBank: Array<IRuleBase> = [];
let postProcessCache: Array<CacheRecord> = [];

postMessage({ type: MessageType.WORKER_LOADED, data: {} } as Message);
onmessage = (event) => {
  let m = event.data as Message;
  if (m.type === MessageType.INIT_RULE_ENGINE && initialCache.length === 0) {
    let historicalData = m.data.historicalData as Array<LotteryDrawModel>;
    // console.log('🚀 ~ file: rule-engine.worker.ts ~ line 25 ~ historicalData', m.data);
    rulesBank = getRulesBank(historicalData);
    initialCache = getAllCombinations();
    postMessage({
      type: MessageType.INIT_RULE_ENGINE_COMPLETE,
      data: { cacheSize: initialCache.length, rulesBankSize: rulesBank.length } as IInitRuleEngineResponse,
    } as Message);
  }
  if (m.type === MessageType.PROCESS_RULE) {
    let ruleId = m.data.ruleId;
    // console.log(ruleIds);
    processRule(ruleId);
    let postProcessRuleSnapshots = getPostProcessRuleSnapshots();
    postMessage({
      type: MessageType.PROCESS_RULE_COMPLETE,
      data: { ruleSnapShots: postProcessRuleSnapshots } as IPostRuleProcessingResponse,
    } as Message);
    // console.log(`processing rule index ${ruleIndex}`);
  }
  if (m.type === MessageType.UN_PROCESS_RULE) {
    let ruleId = m.data.ruleId;
    // console.log(ruleIds);
    unprocessRule(ruleId);
    let postProcessRuleSnapshots = getPostProcessRuleSnapshots();
    postMessage({
      type: MessageType.UN_PROCESS_RULE_COMPLETE,
      data: { ruleSnapShots: postProcessRuleSnapshots } as IPostRuleProcessingResponse,
    } as Message);
    // console.log(`processing rule index ${ruleIndex}`);
  }
};

const processRule = (ruleId: string) => {
  let index = -1;
  index = postProcessCache.findIndex((record) => ruleId === record.ruleId);
  if (index === -1) {
    index = rulesBank.findIndex((rule) => ruleId === rule.id);

    if (index > -1) {
      let rule = rulesBank[index];
      let postFilterResults: Array<SeriesModel> = [];
      if (postProcessCache.length > 0) {
        postFilterResults = rule.filter(postProcessCache[postProcessCache.length - 1].cache, false);
      } else {
        postFilterResults = rule.filter(initialCache, false);
      }
      postProcessCache.push({ ruleId: ruleId, cache: postFilterResults });
      // return postFilterResults.length;
    }
  }
  // return cache.length;
};

const unprocessRule = (ruleId: string) => {
  let index = -1;
  index = postProcessCache.findIndex((record) => ruleId === record.ruleId);
  if (index > -1) {
    //remove post process results at index location
    postProcessCache.splice(index, 1);

    if (postProcessCache.length > index) {
      //there are items left to process
      for (let i = index; i < postProcessCache.length; i++) {
        let currRuleId = postProcessCache[i].ruleId;
        let ruleIndex = rulesBank.findIndex((rule) => currRuleId === rule.id);
        if (ruleIndex > -1) {
          let rule = rulesBank[ruleIndex];
          let inputCache = i > 0 ? postProcessCache[i - 1].cache : initialCache;
          postProcessCache[i].cache = rule.filter(inputCache, false);
        }
      }
    }
  }
};

const getPostProcessRuleSnapshots = (): Array<IPostProcessRuleSnapshot> => {
  let prevRecordCacheSize = initialCache.length;
  let postProcessRuleSnapshots = postProcessCache.map((item, index) => {
    if (index > 0) {
      prevRecordCacheSize = postProcessCache[index - 1].cache.length;
    }
    return {
      ruleId: item.ruleId,
      postProcessCacheSize: item.cache.length,
      percentageOfImprovementFromBase: 1 - item.cache.length / initialCache.length,
      percentageOfImprovementFromPrevState: 1 - item.cache.length / prevRecordCacheSize,
    } as IPostProcessRuleSnapshot;
  });
  return postProcessRuleSnapshots;
};
