import { createContext, Dispatch, Reducer, useContext } from 'react';
import { UserType } from 'types/profile';

export enum ActionType {
  RESET = 'RESET',
  UPDATE_USER = 'UPDATE_USER',
}

export type InitialStateType = {
  user: UserType | null;
};

export const initialState: InitialStateType = {
  user: null,
};

export interface IReducer {
  type: ActionType;
  user: UserType;
}

export const reducer: Reducer<InitialStateType, IReducer> = (state, action) => {
  switch (action.type) {
    case ActionType.RESET:
      return {
        ...state,
      };
    case ActionType.UPDATE_USER:
      return { ...state, user: action.user };
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
