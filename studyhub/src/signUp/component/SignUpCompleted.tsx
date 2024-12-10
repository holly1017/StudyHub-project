import React from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { Typography } from "@mui/material";

const SignUpCompleted = () => {
    return (
        <CustomDivStyle display='flex' flexDirection='column' alignItems='center'>
            <CustomDivStyle display='flex' flexDirection='column' alignItems='center' marginTop={40}>
                <img src={`${process.env.PUBLIC_URL}/check-contained-icon.png`}/>
                <Typography fontSize={20} fontWeight={900}>회원가입 완료</Typography>
            </CustomDivStyle>
            <CustomDivStyle marginTop={30} marginBottom={30} display='flex'>
                <Typography textAlign={"center"} fontSize={18}>
                환영합니다! <br />
                스터디허브에 가입해주셔서 감사드리며, <br />
                성장과 배움의 여정을 함께하게 되어 기쁩니다. <br /><br />
                즐거운 학습 되세요! 
                </Typography>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default SignUpCompleted;