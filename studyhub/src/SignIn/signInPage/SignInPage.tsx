import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import Head from "../common/Head";
import LoginForm from "./component/LoginForm";
import SignInLink from "./component/SignInLink";

const SignInPage = () => {

    useEffect(() => {
        // url로 접근 시
        //login 됬음? 됬으면 마이페이로 이동
        //안되어있으면 그냥 로그인 화면 보여주면 될듯?
        //feat.네이버
    }, [])

    return (
        <CustomDivStyle display="flex" justifyContent="center" marginTop={100} marginBottom={100}>
            <Box width={"25%"} minWidth={400} height={480} border={"1px solid #D4D4D4"} borderRadius={2} boxShadow={3} padding={3} overflow="hidden">
                <Head content="로그인"></Head>

                <LoginForm></LoginForm>

                <SignInLink></SignInLink>
            </Box>
        </CustomDivStyle>
    )
}

export default SignInPage;
