import { createContext, Dispatch, Reducer, useContext } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { getRulesBank } from 'rules/RuleUtils';
import { LotteryDrawModel } from 'types/lottery-draw';
import { SignupUserType, TicketPhotoType, UserType } from 'types/profile';
import { SeriesModel } from 'types/series';
import Worker from 'web-worker';
import { IPostProcessRuleSnapshot } from 'workers/messages';
import { IRuleBase } from '../rules/RuleBase';

const worker = new Worker(new URL('./../workers/rule-engine.worker.ts', import.meta.url), {
  type: 'module',
});
RuleEngineClient.initInstance(worker);

export enum ActionType {
  RESET = 'RESET',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_NAME = 'UPDATE_USER_NAME',
  UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN',
  UPDATE_WELCOME_FINISHED = 'UPDATE_WELCOME_FINISHED',
  UPDATE_TICKET_PHOTOS = 'UPDATE_TICKET_PHOTOS',
  UPDATE_TICKET_PHOTOS_TEXT = 'UPDATE_TICKET_PHOTOS_TEXT',
  ADD_ENGINE_RULE = 'ADD_ENGINE_RULE',
  REMOVE_RULE = 'REMOVE_RULE',
  INITIALIZE_CACHE = 'INITIALIZE_CACHE',
  UPDATE_HISTORICAL_DATA = 'UPDATE_HISTORICAL_DATA',
  INITIALIZE_RULES_BANK = 'INITIALIZE_RULES_BANK',
  UPDATE_CHANCES = 'UPDATE_CHANCES',
  UPDATE_GUIDED_TOUR = 'UPDATE_GUIDED_TOUR',
}
export interface IReducer {
  type: ActionType;
  user: UserType;
  displayName: SignupUserType['displayName'];
  token: SignupUserType['token'];
  welcomeFinished: boolean;
  ticketPhotos: TicketPhotoType[];
  ticketText: TicketPhotoType['ticketText'];
  rule: IRuleBase;
  id: IRuleBase['id'];
  cache: Array<SeriesModel>;
  historicalData: Array<LotteryDrawModel>;
  rulesBank: Array<IRuleBase>;
  initialChances: number;
  finalChances: number;
  postProcessingSnapshots: Array<IPostProcessRuleSnapshot>;
}

export type InitialStateType = {
  user: UserType | null;
  signupUser: SignupUserType | null;
  welcomeFinished: boolean;
  ticketPhotos: TicketPhotoType[];
  rules: IRuleBase[];
  cache: Array<SeriesModel>;
  historicalData: LotteryDrawModel[];
  rulesBank: IRuleBase[];
  initialChances: number;
  finalChances: number;
  // postProcessingSnapshot: [];
};

export const initialState: InitialStateType = {
  user: null,
  signupUser: null,
  welcomeFinished: false,
  ticketPhotos: [],
  rules: [],
  cache: [],
  historicalData: [],
  rulesBank: [],
  initialChances: 0,
  finalChances: 0,
  // postProcessingSnapshot: [],
};

export const reducer: Reducer<InitialStateType, IReducer> = (state, action) => {
  // console.log('reducing...', action.type);
  switch (action.type) {
    case ActionType.RESET:
      return {
        ...state,
        user: null,
        ticketPhotos: [],
      };
    case ActionType.UPDATE_USER:
      return { ...state, user: action.user };
    case ActionType.UPDATE_USER_NAME:
      return { ...state, signupUser: { ...state.signupUser, displayName: action.displayName } };
    case ActionType.UPDATE_USER_TOKEN:
      return { ...state, signupUser: { ...state.signupUser, token: action.token } };
    case ActionType.UPDATE_WELCOME_FINISHED:
      return { ...state, welcomeFinished: action.welcomeFinished };
    case ActionType.UPDATE_TICKET_PHOTOS:
      return { ...state, ticketPhotos: action.ticketPhotos };
    case ActionType.UPDATE_TICKET_PHOTOS_TEXT: {
      const lastTicket = state.ticketPhotos.pop() as TicketPhotoType;
      const updatedTicket = { ...lastTicket, ticketText: action.ticketText };
      const updatedTickets = state.ticketPhotos;
      console.log('🚀 ~ file: store.ts:85 ~ updatedTicket', updatedTicket);
      updatedTickets.push(updatedTicket);
      return { ...state, ticketPhotos: updatedTickets };
    }
    case ActionType.ADD_ENGINE_RULE: {
      let modifiedRules = [...state.rules, action.rule];
      action.postProcessingSnapshots.forEach((snap) => {
        let ruleIndex = modifiedRules.findIndex((rule) => rule.id === snap.ruleId);
        if (ruleIndex > -1) {
          modifiedRules[ruleIndex].setPostProcessingSnapshot(snap);
        }
      });
      let finalChances =
        action.rule.postProcessingSnapshot != null ? action.rule.postProcessingSnapshot.postProcessCacheSize : 0;
      return {
        ...state,
        finalChances: finalChances,
        rules: modifiedRules,
      };
    }
    case ActionType.REMOVE_RULE: {
      const updatedRules = state.rules.filter(({ id }) => id !== action.rule.id);
      let finalChances = state.initialChances;
      if (updatedRules.length > 0) {
        action.postProcessingSnapshots.forEach((snap) => {
          let ruleIndex = updatedRules.findIndex((rule) => rule.id === snap.ruleId);
          if (ruleIndex > -1) {
            updatedRules[ruleIndex].setPostProcessingSnapshot(snap);
          }
        });
        let lastRulePostProcessingSnapshot = updatedRules[updatedRules.length - 1].postProcessingSnapshot;
        if (lastRulePostProcessingSnapshot != null) {
          finalChances = lastRulePostProcessingSnapshot.postProcessCacheSize;
        }
      }

      return { ...state, finalChances: finalChances, rules: updatedRules };
    }
    case ActionType.INITIALIZE_CACHE: {
      return { ...state, cache: action.cache };
    }
    case ActionType.UPDATE_HISTORICAL_DATA: {
      const rulesBank = getRulesBank(action.historicalData);
      return { ...state, rulesBank: rulesBank, historicalData: action.historicalData };
    }
    case ActionType.INITIALIZE_RULES_BANK: {
      return { ...state, rulesBank: action.rulesBank };
    }
    case ActionType.UPDATE_CHANCES: {
      let initialChances = state.initialChances;
      if (action.initialChances) {
        initialChances = action.initialChances;
      }
      return { ...state, initialChances: initialChances, finalChances: action.finalChances };
    }
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useStore = () => useContext(AppContext);
