import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducers from './reducers'
import rootSaga from './sagas'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
  )
  sagaMiddleware.run(rootSaga)

  return store
}
