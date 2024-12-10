import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Common/module/layout/Header';
import Footer from './Common/module/layout/Footer';
import HomePage from './HomePage/HomePage';
import './App.css';
import StudyList from './study/studyList/StudyList';
import SignInPage from './SignIn/signInPage/SignInPage';
import SignUp from './signUp/SignUp';
import PwFindPage from './SignIn/pwFindPage/PwFindPage';
import AccountFindPage from './SignIn/accountFindPage/AccountFindPage';
import PwChgPage from './SignIn/pwFindPage/PwChgPage';
import AccountListPage from './SignIn/accountFindPage/AccountListPage';
import QuestionListPage from './QuestionPage/QuestionList/QuestionListPage';
import ProductPageList from './ProductPage/ProductList/ProductPageList';
import QuestionDetail from './QuestionPage/QuestionDetail/QuestionDetail';
import QuestionWrite from './QuestionPage/QuestionWrite/QuestionWrite';
import ProductDetail from './ProductPage/ProductDetail/ProductDetail';
import ProductWrite from './ProductPage/ProductWrite/ProductWrite';
import InfoPage from './myPage/infoPage/InfoPage';
import GroupPage from './myPage/GroupPage/GroupPage';
import FriendPage from './myPage/FriendPage/FriendPage';
import PointPage from './myPage/pointPage/PointPage';
import QuestionPage from './myPage/questionPage/QuestionPage';
import StudyView from './study/studyView/StudyView';
import StudyModify from './study/studyModify/StudyModify';
import StudyCalendar from './study/studyCalendar/StudyCalendar';
import StudyRoom from './study/studyRoom/StudyRoom';
import CustomDivStyle from './Common/Component/etc/CustomDivStyle';
import StudyWrite from './study/studyWrite/StudyWrite';
import { UserProvider } from './Common/UserContext';
import ProtectedRoute from './Common/Component/etc/ProtectedRoute';

const App: React.FC = () => {

  return (
    <UserProvider>
    <BrowserRouter>
    <Header />
    <CustomDivStyle display='flex' flexDirection='column' minHeight={752}>
     <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/signin' element={<SignInPage/>}></Route>
      <Route path='/pwfind' element={<PwFindPage/>}></Route>
      <Route path='/pwchange' element={<PwChgPage/>}></Route>
      <Route path='/idfind/list' element={<AccountListPage/>}></Route>
      <Route path='/idfind' element={<AccountFindPage/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/study' element={<StudyList/>}></Route>
      <Route path='/study/:id' element={<StudyView/>}></Route>
      <Route path='/study/modify/:id' element={<ProtectedRoute element={<StudyModify />}/>} /> 
      <Route path='/study/write' element={<ProtectedRoute element={<StudyWrite />}/>} /> 
      <Route path="/study/calendar/:id" element={<ProtectedRoute element={<StudyCalendar />} />} />
      <Route path='/study/studyroom/:id' element={<ProtectedRoute element={<StudyRoom />}/>} /> 
      <Route path='/question' element={<QuestionListPage/>}></Route>
      <Route path='/question/write' element={<ProtectedRoute element={<QuestionWrite />}/>} /> 
      <Route path='/question/:id' element={<ProtectedRoute element={<QuestionDetail />}/>} /> 
      <Route path='/trade' element={<ProductPageList/>}></Route>
      <Route path='/trade/:id' element={<ProtectedRoute element={<ProductDetail />}/>} /> 
      <Route path='/trade/write' element={<ProtectedRoute element={<ProductWrite />}/>} /> 
      <Route path="/mypage/info" element={<ProtectedRoute element={<InfoPage />} />} />
      <Route path='/mypage/group' element={<ProtectedRoute element={<GroupPage />}/>} /> 
      <Route path='/mypage/friend' element={<ProtectedRoute element={<FriendPage />}/>} /> 
      <Route path="/mypage/point" element={<ProtectedRoute element={<PointPage />} />} />
      <Route path="/mypage/question" element={<ProtectedRoute element={<QuestionPage />} />} />
     </Routes>
     </CustomDivStyle>
     <Footer />
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
