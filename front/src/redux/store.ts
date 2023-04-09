import {configureStore, MiddlewareArray, PreloadedState} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import logger2 from './../middleware/logger'


import rootReducer from "./rootReducer";
import { persistStore } from 'redux-persist'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();




// creating store
export let store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(thunk,sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export function setupStore(preloadedState?: PreloadedState<RootState>){
  return store
  
}
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default {
    store,
    persistor,
};