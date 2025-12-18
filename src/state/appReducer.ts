import { AppState, AppAction } from './appTypes';

export const initialState: AppState = {
  isLoading: false,
  selectedItemId: undefined,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItemId: action.payload };
    default:
      return state;
  }
};
