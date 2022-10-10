import { LotteryDrawModel } from 'types/lottery-draw';
import Worker from 'web-worker';
import { Message, MessageType } from '../workers/messages';
import { IRuleBase } from './RuleBase';

interface IWorkerMessageEvent {
  data: Message;
}
export class RuleEngineClient {
  private ruleEngineWorker: Worker;
  private messageListenerCallbackHandler: any;
  private initialized: boolean = false;
  private processingRules: boolean = false;

  constructor(ruleEngineWorker: Worker) {
    this.ruleEngineWorker = ruleEngineWorker;
    this.messageListenerCallbackHandler = this.handleMessage.bind(this);
    this.ruleEngineWorker.addEventListener('message', this.messageListenerCallbackHandler);
  }

  private handleMessage(event: IWorkerMessageEvent) {
    let message = event.data as Message; //convinience
    if (message.type === MessageType.INIT_RULE_ENGINE_COMPLETE) {
      console.log('Rules engine initialization complete - ', message.data);
      this.initialized = true;
    }
    if (message.type === MessageType.PROCESS_RULES_COMPLETE) {
      console.log('Rules engine rule processing complete - ', message.data);
      this.processingRules = false;
    }
  }

  public async initializeRuleEngine(historicalData: Array<LotteryDrawModel>) {
    this.ruleEngineWorker.postMessage({
      type: MessageType.INIT_RULE_ENGINE,
      data: { historicalData: historicalData },
    } as Message);
    return new Promise<void>((resolve, reject) => {
      if (this.initialized) {
        resolve();
      } else {
        let intervalHander = setInterval(() => {
          if (this.initialized) {
            clearInterval(intervalHander);
            resolve();
          }
        }, 500);
      }
    });
  }
  public async processRules(ruleIds: Array<string>) {
    return new Promise<void>((resolve, reject) => {
      this.processingRules = true;
      this.ruleEngineWorker.postMessage({
        type: MessageType.PROCESS_RULES,
        data: { ruleIds: ruleIds },
      } as Message);
      let intervalHander = setInterval(() => {
        if (this.processingRules === false) {
          clearInterval(intervalHander);
          resolve();
        }
      }, 500);
    });
  }
}
