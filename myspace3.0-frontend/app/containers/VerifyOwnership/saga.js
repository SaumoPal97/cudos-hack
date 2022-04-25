import { call, put, takeEvery, all } from 'redux-saga/effects';
import NProgress from 'nprogress';
import { VERIFY_ACCOUNT } from './constants';
import { verifyAccountSuccess, verifyAccountFailure } from './actions';
import api from '../../utils/api';

export function* verifyAccount({ accountId }) {
  NProgress && NProgress.start();
  try {
    const { data, error } = yield call(api.post, `api/nft/verify`, {
      accountId,
    });
    if (!error) {
      yield put(verifyAccountSuccess({ data }));
    } else {
      yield put(verifyAccountFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(verifyAccountFailure());
  }
  NProgress && NProgress.done();
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(VERIFY_ACCOUNT, verifyAccount);
}
