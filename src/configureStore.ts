import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './data/rootReducer';

import { rootAiSaga } from './data/aiDuck';
import { rootDatasetsSaga } from './data/datasetDuck';
import { rootSessionsSaga } from './data/sessionsDuck';

export default function configureStore(): Store {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    // middlewares.push(logger);
  }

  const composeEnhancers = composeWithDevTools({
    trace: true,
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
  const store = createStore(
    reducers,
    /* preloadedState, */ composeEnhancers(
      applyMiddleware(...middlewares),
      // other store enhancers if any
    ),
  );

  sagaMiddleware.run(rootAiSaga);
  sagaMiddleware.run(rootDatasetsSaga);
  sagaMiddleware.run(rootSessionsSaga);

  return store;
}
