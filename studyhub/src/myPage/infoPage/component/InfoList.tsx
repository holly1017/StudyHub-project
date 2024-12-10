import React, { useEffect, useRef, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CustomInput from "../../../Common/Component/input/CustomInput";
import CustomButton from "../../../Common/Component/button/CustomButton";
import { Td } from "./InfoPageComponentStyle";
import CustomAvatar from "../../../Common/Component/etc/CustomAvatar";
import ParagraphStyle from "../../../Common/Component/etc/ParagraphStyle";
import { CustomTextStyle } from "../../../Common/Component/button/CustomTextStyle";
import { ImgInput, StyledTd } from "./InfoListStyle";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { emailCheck, phoneCheck, sendAuthEmail, checkAuthEmail, sendAuthPhone, checkAuthPhone } from "../../../signUp/component/AuthFormMethod";
import { nickNameCheck, nickNameRegex } from "../../../signUp/component/InfoFormMethod";
import { postData, postMultiPartData } from "../../../Api";
import { useNavigate } from "react-router-dom";


interface User {
    profile: string;
    memberId: string;
    nickName: string;
    address: string;
    popularity: number;
    email: string;
    phone: string;
    hashTag: string;
}

interface InfoListProps {
    infoUser: User; 
}

const InfoList: React.FC<InfoListProps> = ({infoUser}) => {
    const [infoUserPostCode, infoUserAddress, infoUserDetailAddress] = infoUser.address.split(",");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<File | null>(null); 
    const [nickName, setNickName] = useState(infoUser.nickName);
    const [postCode, setPostCode] = useState(infoUserPostCode);
    const [address, setAddress] = useState(infoUserAddress);
    const [detailAddress, setDetailAddress] = useState(infoUserDetailAddress);
    const [email, setEmail] = useState(infoUser.email);
    const [phone, setPhone] = useState(infoUser.phone);
    const [password, setPassword] = useState('');
    const [authEmail, setAuthEmail] = useState("");
    const [authPhone, setAuthPhone] = useState("");

    const [pwCheckError, setPwCheckError] = useState("");
    const [isNickNameChanged, setIsNickNameChanged] = useState(true);
    const [nickNameError, setNickNameError] = useState("");
    const [nickNameAvailable, setNickNameAvailable] = useState("");

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

    const navigate = useNavigate();

    const [imgReader, setImgReader] = useState(infoUser.profile);

    const [sendBtnDisabled, setSendBtnDisabled] = useState(true);

    const [openPostcode, setOpenPostcode] = useState(false);
    const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const openAddressModal = () => {
        open({ onComplete: selectAddress });
    };

    const selectAddress = (data: any) => {
        setOpenPostcode(false);
        setPostCode(data.zonecode);
        setAddress(data.address);
    }

    useEffect(()=>{
        setImgReader(infoUser.profile);
        setNickName(infoUser.nickName)
        setPostCode(infoUserPostCode);
        setAddress(infoUserAddress);
        setDetailAddress(infoUserDetailAddress);
        setEmail(infoUser.email);
        setPhone(infoUser.phone);
        
    }, [infoUser])    

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

  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgReader(reader.result as string);
        }
        setProfile(file);
        reader.readAsDataURL(file);
      }
    };
  
    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      fileInputRef.current?.click();
    };

    const updateInfo = async () => {

        const formData = new FormData();
        console.log(profile);
        const data = {
            memberId: infoUser.memberId,
            nickName: nickName,
            postCode: postCode,
            address: address,
            detailAddress: detailAddress,
            email: email,
            phone: phone,
            password: password
        };

        formData.append("member", new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (profile) {
            formData.append("file", profile);
        }
        
        try {
            const response = await postMultiPartData('/member/mypage/info-update', formData);
            console.log('POST 응답:', response);
            navigate(0);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const resetInfo = () => {
        setImgReader(infoUser.profile);
        setNickName(infoUser.nickName)
        setPostCode(infoUserPostCode);
        setAddress(infoUserAddress);
        setDetailAddress(infoUserDetailAddress);
        setEmail(infoUser.email);
        setPhone(infoUser.phone);
    }

    useEffect(() => {
        if (!nickNameError && !pwCheckError && !emailAuthError && emailAuthCorrect && !emailError &&/* !phoneAuthError && !phoneError &&*/ nickName && postCode && address && detailAddress && email && authEmail /*&& phone && authPhone*/ && password) {
            setSendBtnDisabled(false);
        } else {
            setSendBtnDisabled(true);
        }
    }, [nickNameError, pwCheckError, emailAuthError, emailError, /*phoneAuthError, phoneError,*/ nickName, postCode, address, detailAddress, email, authEmail/*, phone, authPhone*/, password]);

    return (
        <CustomDivStyle display="flex" justifyContent="center" marginBottom={50}>
            <table>
                <tr>
                    <td>
                        <CustomDivStyle display={"flex"} marginTop={36} justifyContent={"space-evenly"} alignItems={"center"}>
                            <CustomDivStyle display="flex" flexDirection="column" gap={10} alignItems="center">
                                <CustomAvatar width={130} height={130} image={imgReader} />
                                <CustomTextStyle href="#" onClick={handleLinkClick}>프로필 사진 변경</CustomTextStyle>
                                <ImgInput
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".jpg"
                                />
                            </CustomDivStyle>
                            <CustomDivStyle>
                                <table width={195}>
                                    <tr>
                                        <StyledTd color={"#737373"}>ID</StyledTd>
                                        <StyledTd color={"#000"}>{infoUser.memberId}</StyledTd>
                                    </tr>
                                    <tr>
                                        <td>
                                            <CustomDivStyle height={20}></CustomDivStyle>
                                        </td>
                                    </tr>
                                    <tr>
                                        <StyledTd color={"#737373"}>인기도</StyledTd>
                                        <StyledTd color={"#000"}>{infoUser.popularity}</StyledTd>
                                    </tr>
                                </table>
                            </CustomDivStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>닉네임</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput width={433} height={48} placeholderText="닉네임" value={nickName} onChange={(e) => { setNickName(e.target.value); setIsNickNameChanged(infoUser.nickName == e.target.value); nickNameRegex(e.target.value, setNickNameError, setNickNameAvailable) }}></CustomInput>
                        <CustomButton disabled={isNickNameChanged} sendMethod={() => { nickNameCheck(nickName, setNickNameAvailable, setNickNameError) }} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} borderColor="" backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"중복 확인"} fontWeight={600}></CustomButton>
                    </Td>
                </tr>
                <tr>
                    <Td>
                        {nickNameError && <ParagraphStyle color="red" fontSize={11}>{nickNameError}</ParagraphStyle>}
                        {nickNameAvailable && <ParagraphStyle color="green" fontSize={11}>{nickNameAvailable}</ParagraphStyle>}
                     </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>우편번호</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput width={433} height={48} placeholderText="우편번호"  value={postCode} onChange={(e)=>{setPostCode(e.target.value)}}></CustomInput>
                        <CustomButton sendMethod={openAddressModal} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} borderColor="" backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"주소 검색"} fontWeight={600}></CustomButton>
                    </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>주소</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput width={557} height={48} placeholderText="주소" value={address} onChange={(e)=>{setAddress(e.target.value)}}></CustomInput> 
                    </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>상세주소</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput width={557} height={48} placeholderText="상세주소" value={detailAddress} onChange={(e)=>{setDetailAddress(e.target.value)}}></CustomInput> 
                    </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>이메일</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput width={433} height={48} placeholderText="이메일" value={email} onChange={(e)=>{setEmail(e.target.value); emailCheck(email, setEmailError, setEmailAuthComplete)}}></CustomInput> 
                        <CustomButton sendMethod={()=>{sendAuthEmail(email, setSendBtn, setEmailTimeLeft, setEmailAuthComplete, setEmailError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} borderColor="" backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"인증"} fontWeight={600}></CustomButton>
                    </Td>
                </tr>
                <tr>
                    <td>
                        {emailError && <ParagraphStyle color="red" fontSize={11}>{emailError}</ParagraphStyle>}
                        {emailAuthComplete && <ParagraphStyle color="green" fontSize={11}>{emailAuthComplete}</ParagraphStyle>}
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>이메일 인증번호</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput value={authEmail} onChange={(e)=>{setAuthEmail(e.target.value)}} width={433} height={48} placeholderText="이메일 인증번호"></CustomInput> 
                        <CustomButton sendMethod={()=>{checkAuthEmail(email, authEmail, setEmailAuthCorrect, setEmailAuthError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} borderColor="" backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"확인"} fontWeight={600}></CustomButton>
                    </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={10} display="flex" justifyContent="space-between">
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
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>전화번호</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput width={433} height={48} placeholderText="전화번호" value={phone} onChange={(e)=>{setPhone(e.target.value); phoneCheck(phone, setPhoneError, setPhoneAuthComplete)}}></CustomInput> 
                        <CustomButton sendMethod={()=>{sendAuthPhone(phone, setSendBtn,setPhoneAuthComplete, setPhoneError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} borderColor="" backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"인증"} fontWeight={600}></CustomButton>
                    </Td>
                </tr>
                <tr>
                    <Td>
                        {phoneError && <ParagraphStyle color="red" fontSize={11}>{phoneError}</ParagraphStyle>}
                    </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>전화번호 인증번호</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput value={authPhone} onChange={(e)=>{setAuthPhone(e.target.value)}} width={433} height={48} placeholderText="전화번호 인증번호"></CustomInput> 
                        <CustomButton sendMethod={()=>{checkAuthPhone(phone, authPhone, setPhoneAuthCorrect, setPhoneAuthError)}} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} borderColor="" backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"확인"} fontWeight={600}></CustomButton>
                    </Td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <CustomDivStyle height={10} display="flex" justifyContent="space-between">
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
                <tr>
                    <td>
                        <CustomDivStyle height={20} marginTop={20}>
                            <ParagraphStyle color="#000" fontWeight={900} fontSize={13}>비밀번호</ParagraphStyle>
                        </CustomDivStyle>
                    </td>
                </tr>
                <tr>
                    <Td>
                        <CustomInput value={password} onChange={(e)=>{setPassword(e.target.value)}} width={557} height={48} placeholderText="비밀번호" type="password"></CustomInput>
                    </Td>
                </tr>
                <tr>
                    <Td>
                        {pwCheckError && <ParagraphStyle color="red" fontSize={11}>{pwCheckError}</ParagraphStyle>}
                    </Td>
                </tr>
                <tr>
                    <td>
                        <CustomDivStyle display="flex" justifyContent="flex-end" gap={10} marginTop={30}>
                            <CustomButton sendMethod={resetInfo} width={133} height={44} textColor={"#000"} borderWidth={1} borderStyle={"solid"} borderColor={"#000"} backgroundColor={"#FFF"} borderRadius={15} fontSize={16} content={"초기화"} fontWeight={600}></CustomButton>
                            <CustomButton disabled={sendBtnDisabled} sendMethod={updateInfo} width={133} height={44} textColor={"#FFF"} borderWidth={1} borderStyle={"solid"} borderColor={"#000"} backgroundColor={"#000"} borderRadius={15} fontSize={16} content={"변경"} fontWeight={600}></CustomButton>
                        </CustomDivStyle>    
                    </td>
                </tr>
                
            </table>
                
        </CustomDivStyle>
    )
}

export default InfoList;