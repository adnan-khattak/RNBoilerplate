export interface AppState {
  isLoading: boolean;
  selectedItemId?: string;
}

export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_ITEM'; payload?: string };
