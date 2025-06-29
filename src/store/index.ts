import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { reduxPersistStorage } from './MMKVStorage';
import listSlice from './listSlice';
import teamSlice from './teamSlice';
import { crashReporter } from './crashReporter';
import { loggerMiddleware } from './logger';

export * from './listSlice';
export * from './teamSlice';

const rootReducer = combineReducers({
  list: listSlice.reducer,
  team: teamSlice.reducer,
});

// persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxPersistStorage,
  whitelist: ['list', 'team'], // сохраняем только нужные поля
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ignoredActions,
      },
    }).concat(crashReporter, loggerMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
