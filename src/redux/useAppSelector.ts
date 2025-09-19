import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppState = () => {
  const { isLogin, locale } = useAppSelector((state) => state.appState);

  return {
    isLogin,
    locale,
  };
};

export const useResponseState = () => {
  const { responseInfo, analitics } = useAppSelector(
    (state) => state.responseState
  );

  return { responseInfo, analitics };
};

export const useVariablesState = () => {
  const variables = useAppSelector((state) => state.variablesState);

  return variables;
};
