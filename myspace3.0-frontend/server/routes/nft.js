const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.post('/nfts/denom/issue', async (req, res) => {
  try {
    const resp = await fetch('http://localhost:1317/nft/nfts/denoms/issue', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    if (resp.ok) {
      const content = await resp.json();
      res.send({ success: true, content });
    } else {
      res.send({
        success: false,
        error: err.message,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
});

router.post('/nfts/mint', async (req, res) => {
  try {
    const resp = await fetch('http://localhost:1317/nft/nfts/mint', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    if (resp.ok) {
      const content = await resp.json();
      const { recipient, uri } = req.body;
      console.log(nftMap);
      console.log(recipient, ' is the recipient');
      if (Object.keys(nftMap).includes(recipient)) {
        console.log('here');
        nftMap[recipient] = [...nftMap[recipient], uri];
      } else {
        nftMap[recipient] = [uri];
      }
      res.send({ success: true, content });
    } else {
      res.send({
        success: false,
        error: 'oops',
      });
    }
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
});

router.post('/owners', async (req, res) => {
  //   try {
  //     const resp = await fetch('http://localhost:1317/nft/owners', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(req.body),
  //     });
  //     if (resp.ok) {
  //       const content = await resp.json();
  //       res.send({ success: true, content });
  //     } else {
  //       res.send({
  //         success: false,
  //         error: 'balls brother balls',
  //       });
  //     }
  //   } catch (err) {
  //     res.send({
  //       success: false,
  //       error: err.message,
  //     });
  //   }
  res.send({
    success: true,
    data: nftMap,
  });
});

router.post('/verify', async (req, res) => {
  const { accountId } = req.body;

  if (Object.keys(nftMap).includes(accountId)) {
    res.send({
      success: true,
      data: nftMap,
    });
  } else {
    res.send({ success: false, error: true });
  }
});

module.exports = router;
