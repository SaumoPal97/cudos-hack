/**
 *
 * HomePage
 *
 */

import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { saveAccountData } from './actions';
import { useToast, immediateToast } from 'izitoast-react';
import 'izitoast-react/dist/iziToast.css';
import { v4 as uuidv4 } from 'uuid';

export function HomePage({ saveAccountData }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [symbol, setSymbol] = useState(null);

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
            <h1>How to use MySpace3.0?</h1>
            <ul>
              <li>- Create your creator denomination</li>
              <li>- Mint your NFTs</li>
              <li>- Display your NFTs inside your metaverse gallery</li>
              <li>
                - Lock your gallery behind a NFT access token for followers to
                view
              </li>
            </ul>
          </div>
        </h2>
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={accountId ? accountId : null}
          onChange={evt => setAccountId(evt.target.value)}
          placeholder="Enter your Cudos wallet address"
        />
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={id ? id : null}
          onChange={evt => setId(evt.target.value)}
          placeholder="Enter your token id"
        />
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={name ? name : null}
          onChange={evt => setName(evt.target.value)}
          placeholder="Enter your token name"
        />
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={symbol ? symbol : null}
          onChange={evt => setSymbol(evt.target.value)}
          placeholder="Enter your token symbol"
        />
        <Link
          to={`${!name || !accountId || !symbol || !id ? '' : '/ugc'}`}
          onClick={() => {
            if (!name || !accountId || !symbol || !id) {
              immediateToast('error', {
                message: 'Token details or wallet address cannot be empty',
                position: 'topRight',
                zindex: 50,
              });
            } else {
              saveAccountData({ name, accountId, symbol, id });
            }
          }}
          className="font-mono w-2/5 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center mt-10"
        >
          <button>
            <span>Brace yourself - Minting your denomination!!</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    saveAccountData: op => dispatch(saveAccountData(op)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
