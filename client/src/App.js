import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import DetailPage from './Pages/DetailPage';
import MainPage from './Pages/MainPage';
import MintPage from './Pages/MintPage';
import WritePage from './Pages/WritePage';
import AccountPage from './Pages/AccountPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppContext } from './AppContext';
import { createTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';

import './App.css';

const App = () => {

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [userArticles, setUserArticles] = useState('');
  const [userProfileImg, setUserProfileImg] = useState('');
  const [userNft, setUserNft] = useState('');
  const [address, setAddress] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [jwt, setJwt] = useState('');
  const [cookie, setCookie, deleteCookie] = useCookies(['token']);

  // login 상태
  const [isLoggedin, setIsLoggedin] = useState(false);
  // 회원가입 모달
  const [loginmodalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  // 메인페이지 Articles
  const [mainArticles, setMainArticles] = useState([]);
  // 지역 데이터 Regions
  const [regionList, setRegionList] = useState([]);
  // detailArticle
  const [detailArticle, setDetailArticle] = useState('');
  // mui 팔레트
  const theme = createTheme({
    palette: {
      background: {
        paper: '#ffffff',
        footer: '#a9def9',
        header: '#a9def9',
        lock: '#a9def9',
        yellow: '#F0B918'
      },
      text: {
        primary: '#ffffff',
        secondary: 'black'
      },
      button: {
        primary: '#ba5624'
      }

    }
  });

  const context = {
    state: {
      userId: userId,
      email: email,
      tokenAmount: tokenAmount,
      userArticles: userArticles,
      userProfileImg: userProfileImg,
      userNft: userNft,
      address: address,
      imgSrc: imgSrc,
      isLoggedin: isLoggedin,
      loginmodalOpen: loginmodalOpen,
      signupmodalOpen: signupModalOpen,
      theme: theme,
      jwt: jwt,
      cookie: cookie,
      mainArticles: mainArticles,
      regionList: regionList,
      detailArticle: detailArticle
    },
    action: {
      setUserId: setUserId,
      setEmail: setEmail,
      setTokenAmount: setTokenAmount,
      setUserArticles: setUserArticles,
      setUserProfileImg: setUserProfileImg,
      setUserNft: setUserNft,
      setAddress: setAddress,
      setImgSrc: setImgSrc,
      setIsLoggedin: setIsLoggedin,
      setLoginModalOpen: setLoginModalOpen,
      setSignupModalOpen: setSignupModalOpen,
      setJwt: setJwt,
      deleteCookie: deleteCookie,
      setCookie: setCookie,
      setMainArticles: setMainArticles,
      setRegionList: setRegionList,
      setDetailArticle: setDetailArticle
    }
  };

  return (
    <AppContext.Provider value={context}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/write' element={<WritePage />} />
        <Route path='/mint' element={<MintPage />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
};

export default App
;
