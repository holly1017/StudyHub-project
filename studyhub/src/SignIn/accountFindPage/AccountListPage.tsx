import React, { useEffect } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { Box } from "@mui/material";
import Head from "../common/Head";
import AccountList from "./component/AccountList";
import { useLocation } from "react-router-dom";
import { getData } from "../../Api";
import {useState} from 'react';

const AccountListPage = () => {
    const location = useLocation();
    const { email } = location.state;
    const [accountList, setAccountList] = useState([]);


    const findAccount = async() => {
        try {
            const response = await getData(`/member/idfind/list?email=${email}`); 
            if (response) {
                console.log(response); // List로 콘솔에 출력
                setAccountList(response);
            }
        } catch (error) {
            console.error('GET 요청 실패:', error);
        }
    }

    useEffect(()=>{
        findAccount();
    }, [])

    return (
        <CustomDivStyle display="flex" justifyContent="center" marginTop={100} marginBottom={100}>
            <Box width={"25%"} minWidth={400} height={400} border={"1px solid #D4D4D4"} borderRadius={2} boxShadow={3} padding={3} overflow="hidden">
                <Head content="계정 찾기" subContent="이메일로 계정을 찾습니다."></Head>
                <AccountList accountList={accountList}></AccountList>    
            </Box>
        </CustomDivStyle>
    )
}

export default AccountListPage;