require('dotenv').config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

const find = async (req, res) => {
  const _queries = req.query;
  const user = await User.aggregate([
    {
      $lookup: {
        from: 'Takoyaki-Comment',
        localField: '_id',
        foreignField: 'userId',
        pipeline: [
          {
            $project: {
              content: 0,
              userId: 0
            }
          }
        ],
        as: 'comments'
      }
    },
    {
      $lookup: {
        from: 'Takoyaki-Article',
        localField: '_id',
        foreignField: 'userId',
        pipeline: [
          {
            $project: {
              content: 0,
              userId: 0
            }
          }
        ],
        as: 'articles'
      }
    },
    { $project: { password: 0 } },
    { $match: _queries }
  ]);
  res.send(user);
};

const signup = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // 여기 있는 account 데이터는 추후 이더리움 노드와 연동되면 채워질 부분입니다.
    const user = new User({
      userId,
      password
    });

    // user 모델에서 mongoose-unique-validator 플러그인을 적용한 채로
    // User Model에서 userID에 unique 옵션을 설정했기 때문에
    // validate() 함수에서 유효성 조사하는 과정 중 이중 아이디를 검출가능
    const newDocument = await user.save();
    res.status(201).send(newDocument);
  } catch (error) {
    const msg = {};
    msg[`${error.name}`] = `${error.message}`;
    console.error(`${error.name} : ${error.message}`);
    res.status(401).json(msg);
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    const result = await user.compare(password, user.password);
    if (!user || !result) throw new Error('Authentication failed. Invalid user or password.');
    else {
      // profile 불러오기 추가. 로그인시.
      const user = await User.findOne({ userId }, '_id userId profileImage createdAt address tokenAmount');
      const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1h' });
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000
      });
      res.status(200).json({ user, token });
    }
  } catch (error) {
    const msg = {};
    msg[`${error.name}`] = `${error.message}`;
    console.error(`${error.name} : ${error.message}`);
    res.status(401).json(msg);
  }
};

// profile 사진 업로드.
const uploadProfile = async (req, res) => {
  const { profileImage } = req.body;
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRET);
    const userId = data.userId;
    const user = await User.updateOne({ userId: userId }, { profileImage: profileImage });
    res.status(200).json({ user });
  } catch (error) {
    const msg = {};
    msg[`${error.name}`] = `${error.message}`;
    console.error(`${error.name} : ${error.message}`);
    res.status(400).json(msg);
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.SECRET);
    const userId = data.userId;
    const user = await User.findOne({ userId }, '_id userId profileImage createdAt address tokenAmount');

    res.status(200).json({ user, token });
  } catch (error) {
    const msg = {};
    msg[`${error.name}`] = `${error.message}`;
    console.error(`${error.name} : ${error.message}`);
    res.status(401).json(msg);
  }
};

module.exports = {
  find,
  signup,
  login,
  uploadProfile,
  refresh
};
