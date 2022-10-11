import { createContext, Dispatch, Reducer, useContext } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { getRulesBank } from 'rules/RuleUtils';
import { LotteryDrawModel } from 'types/lottery-draw';
import { TicketPhotoType, UserType } from 'types/profile';
import { SeriesModel } from 'types/series';
import Worker from 'web-worker';
import { IRuleBase } from '../rules/RuleBase';

const worker = new Worker(new URL('./../workers/rule-engine.worker.ts', import.meta.url), {
  type: 'module',
});
RuleEngineClient.initInstance(worker);

export enum ActionType {
  RESET = 'RESET',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_TICKET_PHOTOS = 'UPDATE_TICKET_PHOTOS',
  UPDATE_TICKET_PHOTOS_TEXT = 'UPDATE_TICKET_PHOTOS_TEXT',
  ADD_ENGINE_RULE = 'ADD_ENGINE_RULE',
  REMOVE_RULE = 'REMOVE_RULE',
  INITIALIZE_CACHE = 'INITIALIZE_CACHE',
  UPDATE_HISTORICAL_DATA = 'UPDATE_HISTORICAL_DATA',
  INITIALIZE_RULES_BANK = 'INITIALIZE_RULES_BANK',
  UPDATE_CHANCES = 'UPDATE_CHANCES',
}
export interface IReducer {
  type: ActionType;
  user: UserType;
  ticketPhotos: TicketPhotoType[];
  ticketText: TicketPhotoType['ticketText'];
  rule: IRuleBase;
  id: IRuleBase['id'];
  cache: Array<SeriesModel>;
  historicalData: Array<LotteryDrawModel>;
  rulesBank: Array<IRuleBase>;
  finalChances: number;
}

export type InitialStateType = {
  user: UserType | null;
  ticketPhotos: TicketPhotoType[];
  rules: IRuleBase[];
  cache: Array<SeriesModel>;
  historicalData: LotteryDrawModel[];
  rulesBank: IRuleBase[];
  finalChances: number;
};

export const initialState: InitialStateType = {
  user: null,
  ticketPhotos: [],
  rules: [],
  cache: [],
  historicalData: [],
  rulesBank: [],
  finalChances: 0,
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
    case ActionType.UPDATE_TICKET_PHOTOS:
      return { ...state, ticketPhotos: action.ticketPhotos };
    case ActionType.UPDATE_TICKET_PHOTOS_TEXT: {
      const lastTicket = state.ticketPhotos.pop() as TicketPhotoType;
      const updatedTicket = { ...lastTicket, ticketText: action.ticketText };
      const updatedTickets = state.ticketPhotos;
      updatedTickets.push(updatedTicket);
      return { ...state, ticketPhotos: updatedTickets };
    }
    case ActionType.ADD_ENGINE_RULE: {
      //

      return { ...state, finalChances: action.rule.postProcessingChances, rules: [...state.rules, action.rule] };
    }
    case ActionType.REMOVE_RULE: {
      const updatedRules = state.rules.filter(({ id }) => id !== action.rule.id);
      return { ...state, finalChances: action.rule.postProcessingChances, rules: updatedRules };
    }
    case ActionType.INITIALIZE_CACHE: {
      return { ...state, cache: action.cache };
    }
    case ActionType.UPDATE_HISTORICAL_DATA: {
      const rulesBank = getRulesBank(action.historicalData);
      RuleEngineClient.instance.initializeRuleEngine(action.historicalData).then(() => {});
      // console.log('🚀 ~ file: store.ts ~ line 80 ~ action.historicalData', action.historicalData);
      return { ...state, rulesBank: rulesBank, historicalData: action.historicalData };
    }
    case ActionType.INITIALIZE_RULES_BANK: {
      return { ...state, rulesBank: action.rulesBank };
    }
    case ActionType.UPDATE_CHANCES: {
      return { ...state, finalChances: action.finalChances };
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
