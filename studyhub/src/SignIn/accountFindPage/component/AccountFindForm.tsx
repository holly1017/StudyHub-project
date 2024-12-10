import React, { useState, useEffect } from "react"; 
import CustomButton from "../../../Common/Component/button/CustomButton";
import CustomInput from "../../../Common/Component/input/CustomInput";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import ParagraphStyle from "../../../Common/Component/etc/ParagraphStyle";
import { Link, useNavigate } from "react-router-dom";
import CustomLinkStyle from "../../../Common/Component/button/CustomLinkStyle";
import { getData } from "../../../Api";

const AccountFindForm = () => {
    const [email, setEmail] = useState('');
    const [authEmail, setAuthEmail] = useState("");

    const [emailError, setEmailError] = useState("");
    const [emailAuthComplete, setEmailAuthComplete] = useState("");
    const [emailAuthError, setEmailAuthError] = useState("");
    const [emailAuthCorrect, setEmailAuthCorrect] = useState("");

    const [sendBtn, setSendBtn] = useState("전송");
    const [emailTimeLeft, setEmailTimeLeft] = useState(0);

    const [sendBtnDisabled, setSendBtnDisabled] = useState(true);

    const navigate = useNavigate();

    const sendAuthEmail = async() => {
        try {
            const response = await getData(`/member/signup/auth-email?email=${email}`); 
            if(response) {
                setEmailAuthComplete("이메일 인증 번호 전송 완료")
                setSendBtn("재전송");
                setEmailTimeLeft(180);
            } else {
                setEmailError("이메일 인증 번호 전송 실패")
            }
        } catch (error) {
            console.error('GET 요청 실패:', error);
        }
    }

    const checkAuthEmail = async() => {
        try {
            const response = await getData(`/member/signup/check-auth-email?email=${email}&authEmail=${authEmail}`); 
            if(response) {
                setEmailAuthError("");
                setEmailAuthCorrect("인증 번호가 일치합니다.");
                setSendBtnDisabled(false);
            } else {
                setEmailAuthCorrect("");
                setEmailAuthError("인증 번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error('GET 요청 실패:', error);
        }
    }


    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (emailTimeLeft > 0) {
            timer = setInterval(() => {
                setEmailTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timer); 
    }, [emailTimeLeft]);

    const handleButtonClick = () => {
        if (!sendBtnDisabled) {
            navigate("/idfind/list", { state: { email: email } });
        }
    }

    return (
        <table width={"100%"}>
            <tbody>
                <tr>
                    <td>
                        <CustomDivStyle height={20}></CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td width={"75%"}>
                        <CustomInput width="95%" height={49} placeholderText="이메일" value={email} onChange={(e) => {setEmail(e.target.value)}}></CustomInput>
                    </td>
                    <td width={"25%"}>
                        <CustomButton sendMethod={()=>{sendAuthEmail()}} width="95%" height={49} content={sendBtn} backgroundColor="#D9D9D9" textColor="#737373" fontSize={18} fontWeight={500} borderColor="" borderRadius={15} borderStyle="" borderWidth={0}></CustomButton>
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20}>
                            {emailError&&<ParagraphStyle color="red" fontSize={11}>{emailError}</ParagraphStyle>}
                            {emailAuthComplete&&<ParagraphStyle color="green" fontSize={11}>{emailAuthComplete}</ParagraphStyle>}
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td width={"75%"}>
                        <CustomInput value={authEmail} onChange={(e)=>{setAuthEmail(e.target.value)}} width="95%" height={49} placeholderText="인증 번호"></CustomInput>
                    </td>
                    <td width={"25%"}>
                        <CustomButton sendMethod={()=>{checkAuthEmail()}} width="95%" height={49} content="확인" backgroundColor="#D9D9D9" textColor="#737373" fontSize={18} fontWeight={500} borderRadius={15} borderWidth={0}></CustomButton>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <CustomDivStyle height={20} display="flex" justifyContent="space-between">
                            <CustomDivStyle>
                                {emailAuthError&&<ParagraphStyle color="red" fontSize={11}>{emailAuthError}</ParagraphStyle>}
                                {emailAuthCorrect&&<ParagraphStyle color="green" fontSize={11}>{emailAuthCorrect}</ParagraphStyle>}
                            </CustomDivStyle>
                             <CustomDivStyle marginRight={120}>
                                <ParagraphStyle color="#737373" fontSize={11}>
                                남은 시간 {Math.floor(emailTimeLeft / 60)}:{(emailTimeLeft % 60).toString().padStart(2, "0")}
                                </ParagraphStyle>
                            </CustomDivStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <CustomDivStyle marginTop={40}>
                            <CustomButton sendMethod={handleButtonClick} disabled={sendBtnDisabled} width="100%" height={49} content="계정 찾기" backgroundColor="black" textColor="white" fontSize={18} fontWeight={500} borderRadius={15} borderWidth={0}></CustomButton>
                        </CustomDivStyle>                
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default AccountFindForm;
