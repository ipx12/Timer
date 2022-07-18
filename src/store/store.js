import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "@redux-saga/core";

// import { timerWatcher } from "../saga/timerSaga";

import timerReducer from '../components/Timer/timerSlice';
import sagaReduser from '../saga/sagaReducer/sagaReducer';

const rootReducer = combineReducers({
    timers: timerReducer,
    saga: sagaReduser
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        reducer: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

export default store;