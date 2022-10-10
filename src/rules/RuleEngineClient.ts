import { LotteryDrawModel } from 'types/lottery-draw';
import Worker from 'web-worker';
import { Message, MessageType } from '../workers/messages';

interface IWorkerMessageEvent {
  data: Message;
}
export class RuleEngineClient {
  private ruleEngineWorker: Worker;
  private messageListenerCallbackHandler: any;
  private initialized: boolean = false;

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
}
