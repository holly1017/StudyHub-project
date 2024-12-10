import React, { useEffect } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { Box } from "@mui/material";
import Head from "../common/Head";
import PwChgForm from "./component/PwChgForm";
import { useLocation } from "react-router-dom";

const PwChgPage = () => {
    const location = useLocation();
    const { id } = location.state; 

    useEffect(() => {
        console.log(id);
    }, [])

    return (
        <CustomDivStyle display="flex" justifyContent="center" marginTop={100} marginBottom={100}>
            <Box width={"25%"} minWidth={400} height={400} border={"1px solid #D4D4D4"} borderRadius={2} boxShadow={3} padding={3} overflow="hidden">
                <Head content="비밀번호 변경" subContent="사용자 아이디와 이메일로 비밀번호를 찾습니다."></Head>
                <PwChgForm userId={id}></PwChgForm>
            </Box>
        </CustomDivStyle>
    )
}

export default PwChgPage;