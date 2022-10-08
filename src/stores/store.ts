import { createContext, Dispatch, Reducer, useContext } from 'react';
import { LotteryDrawModel } from 'types/lottery-draw';
import { TicketPhotoType, UserType } from 'types/profile';
import { RuleType } from 'types/rules';
import { IRuleBase } from '../rules/RuleBase';

export enum ActionType {
  RESET = 'RESET',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_TICKET_PHOTOS = 'UPDATE_TICKET_PHOTOS',
  UPDATE_TICKET_PHOTOS_TEXT = 'UPDATE_TICKET_PHOTOS_TEXT',
  ADD_RULE = 'ADD_RULE',
  REMOVE_RULE = 'REMOVE_RULE',
  INITIALIZE_CACHE = 'INITIALIZE_CACHE',
  UPDATE_HISTORICAL_DATA = 'UPDATE_HISTORICAL_DATA',
  INITIALIZE_RULES_BANK = 'INITIALIZE_RULES_BANK',
}
export interface IReducer {
  type: ActionType;
  user: UserType;
  ticketPhotos: TicketPhotoType[];
  ticketText: TicketPhotoType['ticketText'];
  rule: IRuleBase;
  id: IRuleBase['id'];
  cache: number[][];
  historicalData: Array<LotteryDrawModel>;
  rulesBank: Array<IRuleBase>;
}

export type InitialStateType = {
  user: UserType | null;
  ticketPhotos: TicketPhotoType[];
  rules: IRuleBase[];
  cache: number[][];
  historicalData: LotteryDrawModel[];
  rulesBank: IRuleBase[];
};

export const initialState: InitialStateType = {
  user: null,
  ticketPhotos: [],
  rules: [],
  cache: [],
  historicalData: [],
  rulesBank: [],
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
    case ActionType.ADD_RULE: {
      return { ...state, rules: [...state.rules, action.rule] };
    }
    case ActionType.REMOVE_RULE: {
      const updatedRules = state.rules.filter(({ id }) => id !== action.id);
      return { ...state, rules: updatedRules };
    }
    case ActionType.INITIALIZE_CACHE: {
      return { ...state, cache: action.cache };
    }
    case ActionType.UPDATE_HISTORICAL_DATA: {
      // console.log('🚀 ~ file: store.ts ~ line 80 ~ action.historicalData', action.historicalData);
      return { ...state, historicalData: action.historicalData };
    }
    case ActionType.INITIALIZE_RULES_BANK: {
      return { ...state, rulesBank: action.rulesBank };
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
