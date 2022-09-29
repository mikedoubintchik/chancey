import { createContext, Dispatch, Reducer, useContext } from 'react';
import { UserType, TicketPhotoType } from 'types/profile';

export enum ActionType {
  RESET = 'RESET',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_TICKET_PHOTOS = 'UPDATE_TICKET_PHOTOS',
  UPDATE_TICKET_PHOTOS_TEXT = 'UPDATE_TICKET_PHOTOS_TEXT',
}

export type InitialStateType = {
  user: UserType | null;
  ticketPhotos: TicketPhotoType[];
};

export const initialState: InitialStateType = {
  user: null,
  ticketPhotos: [],
};

export interface IReducer {
  type: ActionType;
  user: UserType;
  ticketPhotos: TicketPhotoType[];
  ticketText: TicketPhotoType['ticketText'];
}

export const reducer: Reducer<InitialStateType, IReducer> = (state, action) => {
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
