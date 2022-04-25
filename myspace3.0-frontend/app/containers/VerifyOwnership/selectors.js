import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectVerify = state => state.verify || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectStatus = () =>
  createSelector(
    selectVerify,
    state => state.status,
  );

export { makeSelectStatus };
