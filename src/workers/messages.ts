export enum MessageType {
  WORKER_LOADED,
  INIT_RULE_ENGINE,
  INIT_RULE_ENGINE_COMPLETE,
  PROCESS_RULE,
  PROCESS_RULE_COMPLETE,
  UN_PROCESS_RULE,
  UN_PROCESS_RULE_COMPLETE,
}

export type Message = {
  type: MessageType;
  data?: any;
};

export interface IInitRuleEngineResponse {
  cacheSize: number;
  rulesBankSize: number;
}

export interface IPostProcessRuleSnapshot {
  ruleId: string;
  postProcessCacheSize: number;
  percentageOfImprovementFromBase: number;
  percentageOfImprovementFromPrevState: number;
}
export interface IPostRuleProcessingResponse {
  // cacheSize: number;
  ruleSnapShots: Array<IPostProcessRuleSnapshot>;
}
