import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ResponseInfo = {
  responseCode: number;
  data: string;
  duration: string;
  responseSize: string;
} | null;

type ResponseAnalitics = {
  responseCode: number;
  duration: string;
  timestamp: string;
  method: string;
  requestSize: string;
  responseSize: string;
  errorDetails: string;
  endpoint: string;
  linkToRestClient: string;
};

export type ResponseState = {
  responseInfo: ResponseInfo | null;
  analitics: ResponseAnalitics | null;
};

export const initialState: ResponseState = {
  responseInfo: null,
  analitics: null,
};

export const responseSlice = createSlice({
  name: 'responseSlice',
  initialState,
  reducers: {
    setResponse: (
      state: ResponseState,
      action: PayloadAction<ResponseState>
    ) => {
      state.analitics = action.payload.analitics;
      state.responseInfo = action.payload.responseInfo;
    },
  },
});

export const actions = responseSlice.actions;

export default responseSlice.reducer;
