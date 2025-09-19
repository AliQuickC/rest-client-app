import { configureStore } from '@reduxjs/toolkit';
import appState from './slice/appSlice';
import responseState from './slice/responseSlice';
import variablesState from './slice/variablesSlice';

const store = configureStore({
  reducer: {
    appState,
    responseState,
    variablesState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
