import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const res = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return res;
}
