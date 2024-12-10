import React from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { Box } from "@mui/material";
import Head from "../common/Head";
import AccountFindForm from "./component/AccountFindForm";

const AccountFindPage = () => {
    return (
        <CustomDivStyle display="flex" justifyContent="center" marginTop={100} marginBottom={100}>
            <Box width={"25%"} minWidth={400} height={410} border={"1px solid #D4D4D4"} borderRadius={2} boxShadow={3} padding={3} overflow="hidden">
                <Head content="계정 찾기" subContent="이메일로 계정을 찾습니다."></Head>
                <AccountFindForm></AccountFindForm> 
            </Box>
        </CustomDivStyle>
    )
}

export default AccountFindPage;