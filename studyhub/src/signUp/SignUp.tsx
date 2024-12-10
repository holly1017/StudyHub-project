import React from "react";
import CustomDivStyle from "../Common/Component/etc/CustomDivStyle";
import ParagraphStyle from "../Common/Component/etc/ParagraphStyle";
import ProgressStepper from "./component/ProgressStepper";

const SignUp = () => {
    return (
        <CustomDivStyle margin={"auto"} display="flex" flexDirection="column" maxWidth={768} minWidth={630}>
            
            <ParagraphStyle fontSize={25} fontWeight={900} margin={"40px 0px 0px 0px"}>회원가입</ParagraphStyle>
            
            <ProgressStepper></ProgressStepper>
            
            

        </CustomDivStyle>
    )
}

export default SignUp;