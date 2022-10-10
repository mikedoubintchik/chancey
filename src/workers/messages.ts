export enum MessageType {
  WORKER_LOADED,
  INIT_RULE_ENGINE,
  INIT_RULE_ENGINE_COMPLETE,
  PROCESS_RULE,
}

export type Message = {
  type: MessageType;
  data?: any;
};
