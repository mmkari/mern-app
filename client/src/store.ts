import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'core/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'core/rootSaga';
// import {RootState} from "core/types"
// import {AnyAction} from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const res = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return res;
}
