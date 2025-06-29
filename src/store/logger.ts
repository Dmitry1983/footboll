import type {MiddlewareAPI, Middleware, Dispatch} from '@reduxjs/toolkit';
import type {RootState} from './';

export const loggerMiddleware: Middleware =
  (store: MiddlewareAPI<Dispatch, RootState>) => next => action => {
    console.groupCollapsed('dispatching logger :', action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    const result = next(action);
    console.log('result state', store.getState());
    console.groupEnd();
    return result;
  };
