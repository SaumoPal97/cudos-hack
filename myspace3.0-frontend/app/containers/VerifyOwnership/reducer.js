/*
 *
 * VerifyOwnership reducer
 *
 */
import produce from 'immer';
import {
  VERIFY_ACCOUNT,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE,
  VERIFY_ACCOUNT_UNINITIALIZE,
} from './constants';

export const initialState = {
  status: 'uninitiated',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case VERIFY_ACCOUNT:
        draft.status = 'inprogress';
        break;
      case VERIFY_ACCOUNT_SUCCESS:
        draft.status = 'success';
        break;
      case VERIFY_ACCOUNT_FAILURE:
        draft.status = 'failure';
        break;
      case VERIFY_ACCOUNT_UNINITIALIZE:
        draft.status = 'uninitiated';
        break;
    }
  });

export default homePageReducer;
