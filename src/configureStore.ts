import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './data/rootReducer'
import rootSaga from './data/rootSaga'

export default function configureStore(): Store {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  sagaMiddleware.run(rootSaga)

  return store
}
