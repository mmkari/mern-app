import { all } from 'redux-saga/effects';

import { movieSagas } from 'movie/sagas';

export default function* rootSaga() {
  yield all([...movieSagas]);
}
