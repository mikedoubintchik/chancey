/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { getRulesBank } from 'rules/RuleUtils';
import { LotteryDrawModel } from 'types/lottery-draw';
import { getAllCombinations } from 'utils/combinatorics';
import { MessageType, Message } from './messages';
// declare const self: DedicatedWorkerGlobalScope;
let cache = [];
let rulesBank = [];
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
    let ruleIndex = m.data.ruleIndex;
    console.log(m.data);
    // console.log(`processing rule index ${ruleIndex}`);
  }
};
