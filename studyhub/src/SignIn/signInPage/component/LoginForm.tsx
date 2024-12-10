import React, {useEffect, useState} from "react"
import CustomInput from "../../../Common/Component/input/CustomInput"
import { Checkbox, FormControlLabel } from "@mui/material"
import CustomButton from "../../../Common/Component/button/CustomButton"
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle"
import ParagraphStyle from "../../../Common/Component/etc/ParagraphStyle"
import { CustomTextStyle } from "../../../Common/Component/button/CustomTextStyle"
import { useNavigate } from "react-router-dom"
import { getData, postData } from "../../../Api"
import { useCookies } from "react-cookie";
import { useUser } from "../../../Common/UserContext"

const LoginForm = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [isIdSaved, setIsIdSaved] = useState(false);
    const [signInError, setSignInError] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["rememberMemberId"]);
    const { user, setUser, logout } = useUser();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsIdSaved(event.target.checked);
      };

    useEffect(() => {
        if (cookies.rememberMemberId !== undefined) {
            setId(cookies.rememberMemberId);
            setIsIdSaved(true);
        }
    }, []);
    
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await getData("/member/get-current-member");
            console.log(response);
            return response;
        } catch(error) {
            console.log(error);
        }
    }

    const signInMember = async () => {
        setSignInError("");  
        try {
            await sendData();  
            const response = await getUser();
            setUser(response);
            if (isIdSaved) {
                setCookie("rememberMemberId", id, { path: "/" }); 
            } else {
                removeCookie("rememberMemberId", { path: "/" });
            }
        
            navigate('/');  
        } catch (error) {
            setSignInError("계정 정보가 일치하지 않습니다.");
        }
    };

    const sendData = async () => {
        const payload = { 
          memberId: id,
          password: pw,
        };
    
        try {
            const response = await postData('/login', payload); 
            console.log('POST 응답:', response);
            
        } catch (error) {
            console.error('POST 요청 실패:', error);
            throw error;
        }
      };

      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            signInMember();
        }
    };


    return (
        <table width={"100%"}>
            <tbody>
            <tr>
                <td colSpan={2}>
                    <CustomDivStyle display="flex" justifyContent="flex-end">
                        <CustomTextStyle href="idfind">아이디를 잊으셨습니까?</CustomTextStyle>
                    </CustomDivStyle>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <CustomInput onKeyPress={handleKeyPress} value={id} onChange={(e)=>{setId(e.target.value)}} width="100%" height={49} placeholderText="아이디"></CustomInput>
                </td>
            </tr>
            <tr>
                <td>
                    <CustomDivStyle height={10}></CustomDivStyle>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <CustomDivStyle display="flex" justifyContent="flex-end">
                        <CustomTextStyle href="pwfind">비밀번호를 잊으셨습니까?</CustomTextStyle>
                    </CustomDivStyle>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <CustomInput onKeyPress={handleKeyPress} value={pw} onChange={(e)=>{setPw(e.target.value)}} width="100%" height={49} placeholderText="비밀번호" type="password"></CustomInput>
                </td>
            </tr>
            <tr>
                <td>
                    <CustomDivStyle height={20}></CustomDivStyle>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <CustomDivStyle height={20} display="flex" justifyContent="space-between">
                        <CustomDivStyle>
                            <FormControlLabel control={<Checkbox checked={isIdSaved} onChange={handleChange} />} label="아이디 저장" />  
                        </CustomDivStyle>
                        <CustomDivStyle>
                            {signInError && <ParagraphStyle color="red" fontSize={11}>{signInError}</ParagraphStyle>}
                        </CustomDivStyle>
                    </CustomDivStyle>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <CustomDivStyle marginTop={40}>
                        <CustomButton width="100%" height={49} content="로그인" backgroundColor="black" textColor="white" fontSize={18} fontWeight={500} borderRadius={15} borderWidth={0} sendMethod={signInMember}></CustomButton>
                    </CustomDivStyle>                
                </td>
            </tr>
            </tbody>
        </table>
    )
}

export default LoginForm;