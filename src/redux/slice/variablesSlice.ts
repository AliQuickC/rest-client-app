import { createSlice } from '@reduxjs/toolkit';

export type VariablesState = {
  [key: string]: string;
};

export const initialState: VariablesState = {
  apiKey: '85dcaeb171a84c298fef338bfc441a17',
  baseUrl: 'swapi.tech/api',
  bodyValue: 'hwerher',
  headerValue: 'application/json',
};

export const variablesSlice = createSlice({
  name: 'variablesSlice',
  initialState,
  reducers: {},
});

export const actions = variablesSlice.actions;

export default variablesSlice.reducer;
