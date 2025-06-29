import type {MiddlewareAPI, Middleware} from '@reduxjs/toolkit';
export const crashReporter: Middleware =
  (store: MiddlewareAPI) => next => (action: any) => {
    try {
      return next(action);
    } catch (err) {
      const state = store.getState();
      console.error('crashReporter', {action, state, err});
      throw err;
    }
  };
