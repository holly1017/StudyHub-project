import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { Td } from "../../myPage/infoPage/component/InfoPageComponentStyle";
import CustomInput from "../../Common/Component/input/CustomInput";
import CustomButton from "../../Common/Component/button/CustomButton";
import ParagraphStyle from "../../Common/Component/etc/ParagraphStyle";
import './AuthFormStyle.css';
import { getData } from "../../Api";
import { emailCheck, phoneCheck, sendAuthEmail, checkAuthEmail, sendAuthPhone, checkAuthPhone } from "./AuthFormMethod";

interface AuthFormProps {
    setAllAuth: (allAuth: boolean)=>any;
    email: string;
    setEmail: (email: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({email, setEmail, phone, setPhone, setAllAuth}) => {

    const [authEmail, setAuthEmail] = useState("");
    const [authPhone, setAuthPhone] = useState("");

    const [emailError, setEmailError] = useState("");
    const [emailAuthComplete, setEmailAuthComplete] = useState("");
    const [emailAuthError, setEmailAuthError] = useState("");
    const [emailAuthCorrect, setEmailAuthCorrect] = useState("");

    const [phoneError, setPhoneError] = useState("");
    const [phoneAuthComplete, setPhoneAuthComplete] = useState("");
    const [phoneAuthError, setPhoneAuthError] = useState("");
    const [phoneAuthCorrect, setPhoneAuthCorrect] = useState("");

    const [sendBtn, setSendBtn] = useState("전송");

    const [emailTimeLeft, setEmailTimeLeft] = useState(0);
    const [phoneTimeLeft, setPhoneTimeLeft] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (emailTimeLeft > 0) {
            timer = setInterval(() => {
                setEmailTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timer); 
    }, [emailTimeLeft]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (phoneTimeLeft > 0) {
            timer = setInterval(() => {
                setPhoneTimeLeft((prevTime) => prevTime - 1); 
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [phoneTimeLeft]);

    useEffect(() => {
        const isFormValid = 
            (!!email && !emailError && !!emailAuthComplete && !emailAuthError && !!emailAuthCorrect); 
            // &&
            // (!!phone && !phoneError && !!phoneAuthComplete && !phoneAuthError && !!phoneAuthCorrect)
            // 전화번호 인증 로직 추가 후 주석 제거
    
        setAllAuth(isFormValid);
    }, [
        email, emailError, emailAuthComplete,
        emailAuthError, emailAuthCorrect,
        phone, phoneError, phoneAuthComplete, phoneAuthError, phoneAuthCorrect
    ]);
    

    return (
        <CustomDivStyle marginTop={50}>
            <table width={"75%"} className="auth-table">
                <tbody>
                    <tr>
                        <Td>
                            <CustomInput value={email} onChange={(e)=>{setEmail(e.target.value); emailCheck(email, setEmailError, setEmailAuthComplete)}} width={433} height={48} placeholderText="이메일"></CustomInput>
                            <CustomButton sendMethod={()=>{sendAuthEmail(email, setSendBtn, setEmailTimeLeft, setEmailAuthComplete, setEmailError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={sendBtn} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {emailError && <ParagraphStyle color="red" fontSize={11}>{emailError}</ParagraphStyle>}
                                {emailAuthComplete && <ParagraphStyle color="green" fontSize={11}>{emailAuthComplete}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={authEmail} onChange={(e)=>{setAuthEmail(e.target.value)}} width={433} height={48} placeholderText="이메일 인증번호"></CustomInput>
                            <CustomButton sendMethod={()=>{checkAuthEmail(email, authEmail, setEmailAuthCorrect, setEmailAuthError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"확인"} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <CustomDivStyle height={20} display="flex" justifyContent="space-between">
                                <CustomDivStyle>
                                    {emailAuthError && <ParagraphStyle color="red" fontSize={11}>{emailAuthError}</ParagraphStyle>}
                                    {emailAuthCorrect && <ParagraphStyle color="green" fontSize={11}>{emailAuthCorrect}</ParagraphStyle>}
                                </CustomDivStyle>
                                
                                <CustomDivStyle marginRight={140}>
                                    <ParagraphStyle color="#737373" fontSize={11}>
                                        남은 시간 {Math.floor(emailTimeLeft / 60)}:{(emailTimeLeft % 60).toString().padStart(2, "0")}
                                    </ParagraphStyle>                                
                                </CustomDivStyle>
                            </CustomDivStyle>
                        </td>
                    </tr>
                    {/* <tr>
                        <Td>
                            <CustomInput value={phone} onChange={(e)=>{setPhone(e.target.value); phoneCheck(phone, setPhoneError, setPhoneAuthComplete)}} width={433} height={48} placeholderText="전화번호"></CustomInput>
                            <CustomButton sendMethod={()=>{sendAuthPhone(phone, setSendBtn,setPhoneAuthComplete, setPhoneError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"전송"} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {phoneError && <ParagraphStyle color="red" fontSize={11}>{phoneError}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={authPhone} onChange={(e)=>{setAuthPhone(e.target.value)}} width={433} height={48} placeholderText="전화번호 인증번호"></CustomInput>
                            <CustomButton sendMethod={()=>{checkAuthPhone(phone, authPhone, setPhoneAuthCorrect, setPhoneAuthError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"확인"} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <CustomDivStyle height={20} display="flex" justifyContent="space-between">
                                <CustomDivStyle>
                                    {phoneAuthError && <ParagraphStyle color="red" fontSize={11}>{phoneAuthError}</ParagraphStyle>}
                                    {phoneAuthComplete && <ParagraphStyle color="green" fontSize={11}>{phoneAuthComplete}</ParagraphStyle>}
                                </CustomDivStyle>
                                
                                <CustomDivStyle marginRight={140}>
                                    <ParagraphStyle color="#737373" fontSize={11}>
                                        남은 시간 {Math.floor(phoneTimeLeft / 60)}:{(phoneTimeLeft % 60).toString().padStart(2, "0")}
                                    </ParagraphStyle>
                                </CustomDivStyle>
                            </CustomDivStyle>
                        </td>
                    </tr> */}
                    
                </tbody>
            </table>
        </CustomDivStyle>
    )
}

export default AuthForm;