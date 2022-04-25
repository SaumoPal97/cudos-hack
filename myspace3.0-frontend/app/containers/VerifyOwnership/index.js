/**
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectStatus } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { verifyAccount, verifyAccountUninitialize } from './actions';
import { useToast, immediateToast } from 'izitoast-react';
import 'izitoast-react/dist/iziToast.css';

export function VerifyOwnership({ status, verifyAccount }) {
  useInjectReducer({ key: 'verify', reducer });
  useInjectSaga({ key: 'verify', saga });
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    if (status == 'success') {
      immediateToast('success', {
        message: 'Verification successful',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        window.location.href = 'http://localhost:3001';
      }, 3000);
    }
    if (status == 'failure') {
      immediateToast('error', {
        message: 'Verification failed, please retry',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        verifyAccountUninitialize();
      }, 3000);
    }
  }, [status]);

  return (
    <div
      className="w-screen h-screen"
      style={{
        background: `url("https://visualise.com/wp-content/uploads/2017/09/Metaverse-1020x620-c-default.png") no-repeat center center fixed`,
        backgroundSize: '100% 100%',
      }}
    >
      <h1 className="font-mono m-0 pt-10 text-white flex flex-row justify-center mb-20">
        Welcome to MySpace 3.0 - Metaverse on Cudos
      </h1>
      <div className="flex flex-col items-center justify-center h-1/2">
        <h2 className="font-mono m-0 pt-10 text-white flex flex-row justify-center font-bold text-xl">
          <div className="text-center pb-10">
            <h1>Verify Ownership of Creator NFT</h1>
          </div>
        </h2>
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={accountId ? accountId : null}
          onChange={evt => setAccountId(evt.target.value)}
          placeholder="Enter your Cudos wallet address"
        />
        <button
          onClick={() => {
            if (!accountId) {
              immediateToast('error', {
                message: 'Cudos wallet address cannot be empty',
                position: 'topRight',
                zindex: 50,
              });
            } else {
              verifyAccount({ accountId });
            }
          }}
          className="font-mono w-2/5 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center mt-10"
        >
          <span>Brace yourself - Verifying your ownership!!</span>
        </button>
      </div>
    </div>
  );
}

VerifyOwnership.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  status: makeSelectStatus()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    verifyAccount: op => dispatch(verifyAccount(op)),
    verifyAccountUninitialize: op => dispatch(verifyAccountUninitialize(op)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VerifyOwnership);
