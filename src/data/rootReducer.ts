import { combineReducers } from 'redux';

import aiReducer from './aiDuck';
import applicationReducers, { ApplicationState } from './application/applicationReducers';
import datasetReducer from './datasetDuck';
import sessionsReducer from './sessionsDuck';

export interface RootState {
  application: ApplicationState;
}

const reducers = {
  application: applicationReducers,
  AIs: aiReducer,
  datasets: datasetReducer,
  sessions: sessionsReducer,
};
const rootReducer = combineReducers(reducers);

export default rootReducer;
