import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { appReducer, initialState } from './appReducer';
import { AppState, AppAction } from './appTypes';

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(
    () => ({state, dispatch}),
    [state]
  );
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used inside AppProvider');
  return context;
};
