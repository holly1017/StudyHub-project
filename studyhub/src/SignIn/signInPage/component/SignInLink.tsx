import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { CustomTextStyle } from "../../../Common/Component/button/CustomTextStyle";

const SignInLink = () => {
    return (
        <CustomDivStyle display="flex" gap={10} justifyContent="center" alignItems="center">
            <p>계정이 없으신가요?</p>
            <CustomTextStyle href="/signup">회원가입</CustomTextStyle>
        </CustomDivStyle>
    )
}

export default SignInLink;