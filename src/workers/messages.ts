export enum MessageType {
  WORKER_LOADED,
  INIT_RULE_ENGINE,
  INIT_RULE_ENGINE_COMPLETE,
  PROCESS_RULES,
  PROCESS_RULES_COMPLETE,
}

export type Message = {
  type: MessageType;
  data?: any;
};
