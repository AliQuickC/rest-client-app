import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Lang } from '../../Types/Types';

export type AppState = {
  isLogin: boolean;
  locale: Lang;
};

export const initialState: AppState = {
  isLogin: false,
  locale: 'en',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    login: (state: AppState) => {
      state.isLogin = true;
    },
    logout: (state: AppState) => {
      state.isLogin = false;
    },
    switchLanguage: (state: AppState, action: PayloadAction<Lang>) => {
      state.locale = action.payload;
    },
  },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
