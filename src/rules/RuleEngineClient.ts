import { LotteryDrawModel } from 'types/lottery-draw';
import Worker from 'web-worker';
import { IInitRuleEngineResponse, IPostRuleProcessingResponse, Message, MessageType } from '../workers/messages';
import { IRuleBase } from './RuleBase';

interface IWorkerMessageEvent {
  data: Message;
}
export class RuleEngineClient {
  private static privateInstance: RuleEngineClient;

  private ruleEngineWorker: Worker;
  private messageListenerCallbackHandler: any;
  private initialized: boolean = false;
  private processingRules: boolean = false;
  private postProcessingResponse: IPostRuleProcessingResponse | null = null;
  private initRuleEngineResponse: IInitRuleEngineResponse | null = null;

  constructor(ruleEngineWorker: Worker) {
    this.ruleEngineWorker = ruleEngineWorker;
    this.messageListenerCallbackHandler = this.handleMessage.bind(this);
    this.ruleEngineWorker.addEventListener('message', this.messageListenerCallbackHandler);
  }

  private handleMessage(event: IWorkerMessageEvent) {
    let message = event.data as Message; //convinience
    if (message.type === MessageType.INIT_RULE_ENGINE_COMPLETE) {
      console.log('Rules engine initialization complete - ', message.data);
      this.initRuleEngineResponse = message.data as IInitRuleEngineResponse;
      this.initialized = true;
    }
    if (message.type === MessageType.PROCESS_RULE_COMPLETE) {
      console.log('Rules engine rule processing complete - ', message.data);
      this.postProcessingResponse = message.data as IPostRuleProcessingResponse;
      this.processingRules = false;
    }
    if (message.type === MessageType.UN_PROCESS_RULE_COMPLETE) {
      console.log('Rules engine rule removal complete - ', message.data);
      this.postProcessingResponse = message.data as IPostRuleProcessingResponse;
      this.processingRules = false;
    }
  }

  public async initializeRuleEngine(historicalData: Array<LotteryDrawModel>) {
    this.ruleEngineWorker.postMessage({
      type: MessageType.INIT_RULE_ENGINE,
      data: { historicalData: historicalData },
    } as Message);
    return new Promise<IInitRuleEngineResponse | null>((resolve, reject) => {
      if (this.initialized) {
        resolve(this.initRuleEngineResponse);
      } else {
        let intervalHander = setInterval(() => {
          if (this.initialized) {
            clearInterval(intervalHander);
            resolve(this.initRuleEngineResponse);
          }
        }, 500);
      }
    });
  }

  public async processRule(ruleId: string) {
    return new Promise<IPostRuleProcessingResponse | null>((resolve, reject) => {
      this.processingRules = true;
      this.ruleEngineWorker.postMessage({
        type: MessageType.PROCESS_RULE,
        data: { ruleId: ruleId },
      } as Message);
      let intervalHander = setInterval(() => {
        if (this.processingRules === false) {
          clearInterval(intervalHander);
          resolve(this.postProcessingResponse);
        }
      }, 500);
    });
  }

  public async unprocessRule(ruleId: string) {
    return new Promise<IPostRuleProcessingResponse | null>((resolve, reject) => {
      this.processingRules = true;
      this.ruleEngineWorker.postMessage({
        type: MessageType.UN_PROCESS_RULE,
        data: { ruleId: ruleId },
      } as Message);
      let intervalHander = setInterval(() => {
        if (this.processingRules === false) {
          clearInterval(intervalHander);
          resolve(this.postProcessingResponse);
        }
      }, 500);
    });
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  public static initInstance(ruleEngineWorker: Worker): RuleEngineClient {
    if (!RuleEngineClient.privateInstance) {
      RuleEngineClient.privateInstance = new RuleEngineClient(ruleEngineWorker);
    }

    return RuleEngineClient.privateInstance;
  }
  public static get instance(): RuleEngineClient {
    return RuleEngineClient.privateInstance;
  }
}
