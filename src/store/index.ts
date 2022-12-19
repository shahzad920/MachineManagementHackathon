import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MachineReducer} from './reducers/Machines.reducer';
import {createLogger} from 'redux-logger';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['MachineReducer'],
};

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({MachineReducer}),
);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export {store, persistor};
