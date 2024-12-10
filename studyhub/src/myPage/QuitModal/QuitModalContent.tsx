import React from "react";
import CustomInput from "../../Common/Component/input/CustomInput";
import { ModalText } from "./QuitModalContentStyle";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";

interface QuitModalContentProps {
    pw: string,
    setPw: (value: string)=>void
}

const QuitModalContent:React.FC<QuitModalContentProps> = ({pw, setPw}) => {
    
    return (
        <CustomDivStyle display="flex" flexDirection="column" alignItems="center">
            <ModalText>탈퇴한 계정은 다시 복구할 수 없습니다. <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호를 입력해주세요.</ModalText>
            <CustomInput value={pw} onChange={(e)=>{setPw(e.target.value)}} width={286} height={45} placeholderText="현재 비밀번호" type="password"></CustomInput>
        </CustomDivStyle>
    )
}

export default QuitModalContent;