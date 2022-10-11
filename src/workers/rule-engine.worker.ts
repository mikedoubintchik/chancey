/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { IRuleBase } from 'rules/RuleBase';
import { getRulesBank } from 'rules/RuleUtils';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SeriesModel } from 'types/series';
import { getAllCombinations } from 'utils/combinatorics';
import { MessageType, Message } from './messages';
// declare const self: DedicatedWorkerGlobalScope;
type CacheRecord = {
  ruleId: string;
  cache: Array<SeriesModel>;
};

let cache: Array<SeriesModel> = [];
let rulesBank: Array<IRuleBase> = [];
let postProcessCache: Array<CacheRecord> = [];

postMessage({ type: MessageType.WORKER_LOADED, data: {} } as Message);
onmessage = (event) => {
  let m = event.data as Message;
  if (m.type === MessageType.INIT_RULE_ENGINE && cache.length === 0) {
    let historicalData = m.data.historicalData as Array<LotteryDrawModel>;
    rulesBank = getRulesBank(historicalData);
    cache = getAllCombinations();
    postMessage({
      type: MessageType.INIT_RULE_ENGINE_COMPLETE,
      data: { cacheSize: cache.length, rulesBankSize: rulesBank.length },
    } as Message);
  }
  if (m.type === MessageType.PROCESS_RULE) {
    let ruleId = m.data.ruleId;
    // console.log(ruleIds);
    let countAfterRuleProcessing = processRule(ruleId);
    postMessage({
      type: MessageType.PROCESS_RULE_COMPLETE,
      data: { countAfterRuleProcessing: countAfterRuleProcessing },
    } as Message);
    // console.log(`processing rule index ${ruleIndex}`);
  }
};

const processRule = (ruleId: string) => {
  let index = -1;
  index = postProcessCache.findIndex((record) => ruleId === record.ruleId);
  if (index > -1) {
    return postProcessCache[index].cache.length;
  }

  index = rulesBank.findIndex((rule) => ruleId === rule.id);

  if (index > -1) {
    let rule = rulesBank[index];
    let postFilterResults: Array<SeriesModel> = [];
    if (postProcessCache.length > 0) {
      postFilterResults = rule.filter(postProcessCache[postProcessCache.length - 1].cache, false);
    } else {
      postFilterResults = rule.filter(cache, false);
    }
    postProcessCache.push({ ruleId: ruleId, cache: postFilterResults });
    return postFilterResults.length;
  }
  return cache.length;
};
