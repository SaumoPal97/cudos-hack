/**
 *
 * Ugc
 *
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ipfs from '../../utils/ipfs';
import api from '../../utils/api';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAccountName,
  makeSelectAccountId,
  makeSelectTokenId,
  makeSelectTokenSymbol,
} from '../HomePage/selectors';
import {
  fetchNftData,
  fetchNftDataUninitialize,
  mintNftData,
  mintNftDataUninitialize,
} from './actions';
import {
  makeSelectFetchData,
  makeSelectFetchStatus,
  makeSelectMintStatus,
} from './selectors';
import { useToast, immediateToast } from 'izitoast-react';
import 'izitoast-react/dist/iziToast.css';

export function Ugc({
  name,
  tokenId,
  tokenSymbol,
  accountId,
  fetchData,
  fetchStatus,
  mintStatus,
  fetchNftData,
  mintNftData,
  mintNftDataUninitialize,
}) {
  useInjectReducer({ key: 'ugc', reducer });
  useInjectSaga({ key: 'ugc', saga });

  useEffect(() => {
    if (mintStatus === 'inprogress') {
      immediateToast('info', {
        message: 'You will be notifed when minting is over',
        position: 'topRight',
        zindex: 50,
      });
    }
    if (mintStatus === 'success') {
      immediateToast('success', {
        message: 'Minting successful',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        mintNftDataUninitialize();
        setImage(null);
        setFileMetaData(null);
        setBuffer(null);
      }, 3000);
    }
    if (mintStatus === 'error') {
      immediateToast('error', {
        message: 'Minting failed, please retry',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        mintNftDataUninitialize();
      }, 3000);
    }
  }, [mintStatus]);

  useEffect(() => {
    if (fetchStatus === 'error') {
      immediateToast('error', {
        message: 'Fetching failed, please refresh',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        fetchNftDataUninitialize();
      }, 3000);
    }
  }, [fetchStatus]);

  const [nftData, setNftData] = useState([]);
  const [image, setImage] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [fileMetaData, setFileMetaData] = useState({});
  const [recipient, setRecipient] = useState(accountId);
  const [transactions, setTransactions] = useState([
    {
      scheduleId: '0.0.9346352',
      token: '0.0.9364173',
      amt: '250 ℏ',
      verified: false,
    },
  ]);
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    fetchNftData({ accountId, id: tokenId });
  }, []);

  useEffect(() => {
    if (mintStatus === 'success') {
      fetchNftData({ accountId, id: tokenId });
    }
  }, [mintStatus]);

  useEffect(() => {
    (async () => {
      setNftData(fetchData);
    })();
  }, [fetchData]);

  const onSelectFile = event => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      setFileMetaData(
        Object.assign({}, fileMetaData, {
          name: 'Cudos Metaverse Token',
          token: tokenSymbol,
          type: event.target.files[0].type,
        }),
      );
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        let image1 = new Image();
        image1.src = reader.result;
        image1.addEventListener('load', () => {
          setImage(reader.result);
        });
      });
      const reader1 = new FileReader();
      reader1.readAsArrayBuffer(event.target.files[0]);
      reader1.addEventListener('load', () => {
        setBuffer(Buffer(reader1.result));
      });
    }
    event.target.value = '';
  };

  const uploadFile = async event => {
    event.preventDefault();
    console.log('uploading');
    const added1 = await ipfs.add({
      content: buffer,
    });
    console.log('ipfs image data ', added1.path);
    mintNftData({
      tokenId,
      name,
      fileMetaData,
      accountId,
      recipient,
      uri: `https://cloudflare-ipfs.com/ipfs/${added1.path}`,
    });
  };

  const showNfts = () => {
    return nftData && nftData.length > 0 ? (
      <div className="grid grid-cols-3 gap-4">
        {nftData.map(el => (
          <div className="p-5 bg-white border border-white rounded-md flex flex-col items-center">
            <img className="w-48 h-48" src={`${el}`} />
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div
      className="w-screen h-screen overflow-y-scroll"
      style={{ backgroundColor: '#f4eee4' }}
    >
      <h1 className="font-mono m-0 pt-10 flex flex-row justify-center">
        {`Hello ${name} (Token Symbol: ${tokenSymbol})`}
      </h1>
      <div className="flex flex-col items-center">
        <Link
          to={{
            pathname: `/verify/${tokenSymbol}`,
          }}
          target="_blank"
          className="mt-10 font-mono w-1/4 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center"
        >
          <button>
            <span>Enter your metaverse 🚀 </span>
          </button>
        </Link>
        <div
          className="flex flex-row justify-between font-mono w-full h-screen mt-10"
          style={{ padding: '20px' }}
        >
          <div
            className="flex flex-col items-center h-screen overflow-y-scroll"
            style={{
              width: '50%',
              float: 'left',
              padding: '20px',
              borderRight: '2px dashed gray',
            }}
          >
            <span className="text-2xl font-bold my-5">Your NFTs</span>
            {(fetchData || []).length > 0 ? (
              <div>{showNfts()}</div>
            ) : (
              <span>You don't seem to have any NFTs</span>
            )}
          </div>
          <div
            className="flex flex-col items-center"
            style={{
              width: '50%',
              float: 'left',
              padding: '20px',
            }}
          >
            <span className="text-2xl font-bold my-5">Mint a NFT</span>
            <div
              className={`w-full ${
                image ? '' : 'flex flex-row justify-center'
              }`}
            >
              {image ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="rounded-sm w-48 h-48"
                    src={image}
                    alt="nft_upload_pic"
                  />
                  <input
                    id="nft_transfer_address"
                    name="nft_transfer_address"
                    type="text"
                    className="w-3/4 font-mono border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
                    value={recipient || null}
                    placeholder="Enter recipient address"
                    onChange={e => setRecipient(e.target.value)}
                  />
                  <input
                    id="nft_metadata_price"
                    name="nft_metadata_price"
                    type="text"
                    className="w-3/4 font-mono border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
                    value={fileMetaData.price || null}
                    placeholder="Enter NFT Base Price (in CUDOS)"
                    onChange={e => {
                      let newPrice = e.target.value;
                      setFileMetaData(prevState => {
                        return Object.assign({}, prevState, {
                          price: newPrice,
                        });
                      });
                    }}
                  />
                  <button
                    className="mt-10 font-mono w-1/4 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center px-2 py-1"
                    onClick={uploadFile}
                  >
                    <span>Mint your NFT 🔥 </span>
                  </button>
                </div>
              ) : (
                <div
                  className="w-48 h-48 border border-gray-500 border-dashed rounded-md text-center flex flex-row justify-center items-center cursor-pointer"
                  onClick={handleClick}
                >
                  <span className="text-3xl">+</span>
                  <input
                    id="nft_upload"
                    name="nft_upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={e => {
                      onSelectFile(e);
                      e.target.value = null;
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Ugc.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  name: makeSelectAccountName()(state),
  accountId: makeSelectAccountId()(state),
  fetchData: makeSelectFetchData()(state),
  fetchStatus: makeSelectFetchStatus()(state),
  mintStatus: makeSelectMintStatus()(state),
  tokenSymbol: makeSelectTokenSymbol()(state),
  tokenId: makeSelectTokenId()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchNftData: op => dispatch(fetchNftData(op)),
    fetchNftDataUninitialize: op => dispatch(fetchNftDataUninitialize(op)),
    mintNftData: op => dispatch(mintNftData(op)),
    mintNftDataUninitialize: op => dispatch(mintNftDataUninitialize(op)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Ugc);
