import React, { useState, useEffect } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import CustomInput from "../../Common/Component/input/CustomInput";
import CustomButton from "../../Common/Component/button/CustomButton";
import ParagraphStyle from "../../Common/Component/etc/ParagraphStyle";
import { Td } from "../../myPage/infoPage/component/InfoPageComponentStyle";
import CustomBoxStyle from "../../study/common/CustomBoxStyle";
import { useChipData } from "../../study/studyList/component/SubContentMethod";
import HashTagItem from "../../Common/Component/etc/HashTagItem";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { idRegex, pwRegex, pwConfirm, nickNameRegex, chipDataCheck, idCheck, nickNameCheck } from './InfoFormMethod';

interface InfoFormProps {
    setAllCompleted: (allCompleted: any) => void,
    id: string;
    setId: (id: string) => void;
    pw: string;
    setPw: (pw: string) => void;
    pwCheck: string;
    setPwCheck: (pwCheck: string) => void;
    nickName: string;
    setNickName: (nickName: string) => void;
    postcode: string;
    setPostcode: (postcode: string) => void;
    address: string;
    setAddress: (address: string) => void;
    detailAddress: string;
    setDetailAddress: (detailAddress: string) => void;
    chipsData: string[];
    setChipsData: (chip: string[]) => void;
}

const InfoForm: React.FC<InfoFormProps> = ({
    setAllCompleted,
    id, setId,
    pw, setPw,
    pwCheck, setPwCheck,
    nickName, setNickName,
    postcode, setPostcode,
    address, setAddress,
    detailAddress, setDetailAddress,
    chipsData, setChipsData
}) => {

    const { inputValue, handleKeyDown, handleDelete, handleInputChange } = useChipData(chipsData, setChipsData);

    const [idError, setIdError] = useState("");
    const [idAvailable, setIdAvailable] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwCheckError, setPwCheckError] = useState("");
    const [nickNameError, setNickNameError] = useState("");
    const [nickNameAvailable, setNickNameAvailable] = useState("");
    const [chipDataError, setChipDataError] = useState("");

    const [openPostcode, setOpenPostcode] = useState(false);
    const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const openAddressModal = () => {
        open({ onComplete: selectAddress });
    };

    const selectAddress = (data: any) => {
        setOpenPostcode(false);
        setPostcode(data.zonecode);
        setAddress(data.address);
    }

    useEffect(() => {
        const isFormValid = 
            id && !idError && idAvailable &&
            pw && !pwError &&
            pwCheck && !pwCheckError &&
            nickName && !nickNameError && nickNameAvailable &&
            postcode &&
            address &&
            detailAddress &&
            chipsData.length > 0 && !chipDataError;
    
        setAllCompleted(isFormValid);
    }, [
        id, idError, idAvailable, 
        pw, pwError, 
        pwCheck, pwCheckError, 
        nickName, nickNameError, nickNameAvailable, 
        postcode, 
        address, 
        detailAddress, 
        chipsData, chipDataError, 
        setAllCompleted
    ]);
    

    return (
        <CustomDivStyle marginTop={50}>
            <table width={"75%"}>
                <tbody>
                    <tr>
                        <Td>
                            <CustomInput value={id} onChange={(e) => { setId(e.target.value); idRegex(e.target.value, setIdError,setIdAvailable) }} width={433} height={48} placeholderText="아이디"></CustomInput>
                            <CustomButton sendMethod={() => { if (id&&!idError) {idCheck(id, setIdAvailable, setIdError)} }} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"중복 확인"} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {idError && <ParagraphStyle color="red" fontSize={11}>{idError}</ParagraphStyle>}
                                {idAvailable && <ParagraphStyle color="green" fontSize={11}>{idAvailable}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={pw} onChange={(e) => { setPw(e.target.value); pwRegex(e.target.value, setPwError); pwConfirm(pw, e.target.value, setPwCheckError);}} width={557} height={48} placeholderText="비밀번호" type="password"></CustomInput>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {pwError && <ParagraphStyle color="red" fontSize={11}>{pwError}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={pwCheck} onChange={(e) => { setPwCheck(e.target.value); pwConfirm(pw, e.target.value, setPwCheckError); }} width={557} height={48} placeholderText="비밀번호 확인" type="password"></CustomInput>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {pwCheckError && <ParagraphStyle color="red" fontSize={11}>{pwCheckError}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={nickName} onChange={(e) => { setNickName(e.target.value); nickNameRegex(e.target.value, setNickNameError, setNickNameAvailable) }} width={433} height={48} placeholderText="닉네임"></CustomInput>
                            <CustomButton sendMethod={() => { nickNameCheck(nickName, setNickNameAvailable, setNickNameError) }} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"중복 확인"} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {nickNameError && <ParagraphStyle color="red" fontSize={11}>{nickNameError}</ParagraphStyle>}
                                {nickNameAvailable && <ParagraphStyle color="green" fontSize={11}>{nickNameAvailable}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={postcode} onChange={(e) => { setPostcode(e.target.value) }} width={433} height={48} placeholderText="우편번호"></CustomInput>
                            <CustomButton sendMethod={openAddressModal} width={106} height={48} textColor={"#737373"} borderWidth={0} borderStyle={"solid"} backgroundColor={"#D9D9D9"} borderRadius={15} fontSize={16} content={"주소 검색"} fontWeight={600}></CustomButton>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={address} onChange={(e) => { setAddress(e.target.value) }} width={557} height={48} placeholderText="주소"></CustomInput>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput value={detailAddress} onChange={(e) => { setDetailAddress(e.target.value) }} width={557} height={48} placeholderText="상세 주소"></CustomInput>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomInput width={557} height={48} placeholderText="스터디 카테고리" value={inputValue} onKeyDown={handleKeyDown} onChange={handleInputChange}></CustomInput>
                        </Td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDivStyle height={20}>
                                {chipDataError && <ParagraphStyle color="red" fontSize={11}>{chipDataError}</ParagraphStyle>}
                            </CustomDivStyle>
                        </td>
                    </tr>
                    <tr>
                        <Td>
                            <CustomDivStyle>
                                {chipDataError && <ParagraphStyle color="red" fontSize={11}>{chipDataError}</ParagraphStyle>}
                                <CustomBoxStyle display='flex' gap={5} mt={1}>
                                    {chipsData.map((chip, index) => (
                                        <HashTagItem key={index} content={chip} onDelete={() => handleDelete(chip)} />
                                    ))}
                                </CustomBoxStyle>
                            </CustomDivStyle>
                        </Td>
                    </tr>
                </tbody>
            </table>
        </CustomDivStyle>
    );
}

export default InfoForm;
