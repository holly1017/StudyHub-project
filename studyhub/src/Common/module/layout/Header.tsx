import React, {useEffect, useState} from 'react';
import './Header.css';
import AccountMenu from './component/AccountMenu';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getData } from '../../../Api';
import { useUser } from '../../UserContext';
import CustomDivStyle from '../../Component/etc/CustomDivStyle';


const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const { user } = useUser();

    return (
        <div className="header">
            <div className="header-left">
                <button className="button-logo"></button>
            </div>
            <div className="header-center">
                <div className="header-center-content">
                    <Link to={'/'} className='button-nav'>HOME</Link>
                    <Link to={'/study'} className='button-nav'>스터디</Link>
                    <Link to={'/question'} className='button-nav'>Q&A</Link>
                    <Link to={'/trade'} className='button-nav'>거래장터</Link>
                </div>
            </div>
            <div className="header-right">
                {/* 로그인 상태에 따라 다른 컴포넌트 렌더링 */}
                {user ? (
                    // 로그인한 상태일 때
                    <div className="header-right-content">
                        <CustomDivStyle fontSize={15} color="white" overflow='hidden' textOverflow='ellipsis'>{user.nickName}</CustomDivStyle>
                        <AccountMenu />
                    </div>
                ) : (
                    // 비로그인 상태일 때
                    <div className="header-right-content">
                        <Link to={'/signin'} className='button-signup'>로그인</Link>
                        <button className="button-divider">|</button>
                        <Link to={'/signup'} className='button-signup'>회원가입</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
