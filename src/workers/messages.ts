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
