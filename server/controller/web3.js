const { userSend: _userSend } = require('../utility/sendToken');
const { mintingNft } = require('../utility/mintNft');
require('dotenv').config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

const userSend = async (req, res) => {
  try {
  // 전부다 string
  // sender는 추후에 쿠키를 통해서 인증 하는 걸로 바꿔도 됨
    const { recipient, amount } = req.body;
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRET);
    const userId = data.userId;
    const user = await User.findOne({ userId }, 'address tokenAmount');
    const recip = await User.findOne({ address: recipient }, 'tokenAmount');

    const result = await _userSend(user.address, recipient, amount);

    if (result) {
      await User.findOneAndUpdate({ userId: userId }, { tokenAmount: user.tokenAmount - Number(amount) }, {
        returnOriginal: false
      });
      await User.findOneAndUpdate({ address: recipient }, { tokenAmount: recip.tokenAmount + Number(amount) }, {
        returnOriginal: false
      });
      res.status(200).json('complete');
    } else {
      throw new Error('Transaction Error');
    }
  } catch (error) {
    const msg = {};
    msg[`${error.name}`] = `${error.message}`;
    console.error(`${error.name} : ${error.message}`);
    res.status(401).json(msg);
  }
};

const mintNft = async (req, res) => {
  try {
    const { tokenURL, address } = req.body;
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRET);
    const userId = data.userId;

    

    const user = await User.findOne({ userId }, 'address tokenAmount');
    const result = await _userSend(user.address, '0xA5E535B4c93751d0C72316dA4F6FdC6cb61BC09B', '10');

    // token 이 10개 미만인경우?
    await mintingNft(address, tokenURL);

    // const result_mint mint logic
    if (result) {
      await User.findOneAndUpdate({ userId: userId }, { tokenAmount: user.tokenAmount - 10 }, {
        returnOriginal: false
      });
      res.status(200).json('complete');
    } else {
      throw new Error('Transaction Error');
    }
  } catch (error) {
    const msg = {};
    msg[`${error.name}`] = `${error.message}`;
    console.error(`${error.name} : ${error.message}`);
    res.status(401).json(msg);
  }
};

module.exports = {
  userSend,
  mintNft
};
