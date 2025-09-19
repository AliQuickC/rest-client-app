import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { actions as appActions } from './slice/appSlice';
import { actions as responseActions } from './slice/responseSlice';

const rootActions = {
  ...appActions,
  ...responseActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
