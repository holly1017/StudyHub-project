import React, { useEffect, useState } from "react";
import CustomInput from "../../../Common/Component/input/CustomInput";
import CustomButton from "../../../Common/Component/button/CustomButton";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import ParagraphStyle from "../../../Common/Component/etc/ParagraphStyle";
import { useNavigate } from "react-router-dom";
import { pwRegex, pwConfirm } from '../../../signUp/component/InfoFormMethod';
import { postData } from "../../../Api";


interface PwChgFormProps {
    userId: string;
}

const PwChgForm: React.FC<PwChgFormProps> = ({ userId }) => {
    const navigate = useNavigate();

    const [newPw, setNewPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");

    const [pwError, setPwError] = useState("");
    const [pwCheckError, setPwCheckError] = useState("");

    const [sendBtnDisabled, setSendBtnDisabled] = useState(true);

    useEffect(() => {
        console.log(userId);
    }, [])

     // 현재 비밀번호를 입력 새비밀번호입력  비밀번호확인을 완료해야지 요청을 보낼수있도록
    const updatePw = async() => {
        const payload = {
            id: userId,
            newPw: newPw
        }
        try {
            const response = await postData("/member/pwfind/update", payload)
            console.log(response);
            if(response) {
                navigate("/");
            }

        } catch (error: any) {
            console.log(error);
        }
    
    }

    useEffect(() => {
        if (!pwError && !pwCheckError && newPw && pwCheck) {
            setSendBtnDisabled(false);
        } else {
            setSendBtnDisabled(true);
        }
    }, [pwError, pwCheckError, newPw, pwCheck]);

    
    return (
        <table width={"100%"}>
            <tbody>
                <tr>
                    <td>
                        <CustomDivStyle height={20}></CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <CustomInput value={newPw} onChange={(e)=>{setNewPw(e.target.value);pwRegex(e.target.value, setPwError); pwConfirm(newPw, e.target.value, setPwCheckError);}} width="100%" height={49} placeholderText="새로운 비밀번호" type="password"></CustomInput>
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20}>
                            {pwError&&<ParagraphStyle color="red" fontSize={11}>{pwError}</ParagraphStyle>}
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <CustomInput value={pwCheck} onChange={(e)=>{setPwCheck(e.target.value); pwConfirm(newPw, e.target.value, setPwCheckError);}} width="100%" height={49} placeholderText="비밀번호 확인" type="password"></CustomInput>
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20}>
                            {pwCheckError && <ParagraphStyle color="red" fontSize={11}>{pwCheckError}</ParagraphStyle>}
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <CustomDivStyle marginTop={30}>
                            <CustomButton disabled={sendBtnDisabled} width="100%" height={49} content="확인" backgroundColor="black" textColor="white" fontSize={18} fontWeight={500} borderRadius={15} borderWidth={0} sendMethod={updatePw}></CustomButton>
                        </CustomDivStyle>                
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default PwChgForm;