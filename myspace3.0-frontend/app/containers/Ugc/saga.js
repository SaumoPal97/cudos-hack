import { call, put, takeEvery, all } from 'redux-saga/effects';
import NProgress from 'nprogress';
import { MINT_NFT_DATA, FETCH_NFT_DATA } from './constants';
import {
  mintNftDataSuccess,
  mintNftDataFailure,
  fetchNftDataSuccess,
  fetchNftDataFailure,
} from './actions';
import api from '../../utils/api';

export function* mintNftData({
  tokenId,
  name,
  fileMetaData,
  accountId,
  recipient,
  uri,
}) {
  NProgress && NProgress.start();
  try {
    const { error } = yield call(api.post, `api/nft/nfts/mint`, {
      denom_id: tokenId,
      name,
      uri,
      data: JSON.stringify(fileMetaData),
      recipient,
      base_req: {
        from: accountId,
        chain_id: 'cudos-network',
      },
    });
    if (!error) {
      yield put(mintNftDataSuccess());
    } else {
      yield put(mintNftDataFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(mintNftDataFailure());
  }
  NProgress && NProgress.done();
}

export function* fetchNftData({ accountId, id }) {
  NProgress && NProgress.start();
  try {
    const { data, error } = yield call(api.post, `api/nft/owners`, {
      denom_id: id,
      owner_address: accountId,
      pagination: {
        offset: '1',
        limit: '5',
        count_total: true,
      },
    });
    if (!error) {
      yield put(fetchNftDataSuccess({ data, accountId }));
    } else {
      yield put(fetchNFftDataFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(fetchNftDataFailure());
  }
  NProgress && NProgress.done();
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(MINT_NFT_DATA, mintNftData);
  yield takeEvery(FETCH_NFT_DATA, fetchNftData);
}
