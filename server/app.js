require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { expressjwt: jwtMiddleware } = require('express-jwt');

const mongoose = require('mongoose');
const credential = './credentials/X509-cert.pem';

mongoose.connect(process.env.MONGODB, {
  ssl: true,
  sslValidate: true,
  sslKey: credential,
  sslCert: credential
});

const port = 3001;

const articleRouter = require('./router/articles');
const userRouter = require('./router/users');
/* const web3Router = require('./router/web3'); */

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// 토큰 읽는 미들웨어
// Authorization => req.auth 객체
app.use(
  jwtMiddleware({
    secret: process.env.SECRET,
    credentialsRequired: false,
    algorithms: ['HS256']
  })
);
//파일 길이가 너무 길어서  limit 최대치.
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));

app.use(cookieParser())

app.use('/articles', articleRouter);
app.use('/users', userRouter);

//app.use('/', web3Router);


app.get('/', (req, res) => {
  res.status(200).send('Welcome');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString()
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString()
  });
});

app.listen(port, () => {
  console.log(`[RUN] Server... | http://localhost:${port}`);
});

module.exports = app;
