/*
 *
 * VerifyOwnership actions
 *
 */

import {
  VERIFY_ACCOUNT,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE,
  VERIFY_ACCOUNT_UNINITIALIZE,
} from './constants';

export function verifyAccount({ accountId }) {
  return {
    type: VERIFY_ACCOUNT,
    accountId,
  };
}

export function verifyAccountSuccess({ data }) {
  return {
    type: VERIFY_ACCOUNT_SUCCESS,
    data,
  };
}

export function verifyAccountFailure() {
  return {
    type: VERIFY_ACCOUNT_FAILURE,
  };
}

export function verifyAccountUninitialize() {
  return {
    type: VERIFY_ACCOUNT_UNINITIALIZE,
  };
}
