import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CustomButton from '../../Common/Component/button/CustomButton';
import AgreementForm from './AgreementForm';
import InfoForm from './InfoForm';
import AuthForm from './AuthForm';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import SignUpCompleted from './SignUpCompleted';
import { Link, useNavigate } from 'react-router-dom';
import CustomLinkStyle from '../../Common/Component/button/CustomLinkStyle';
import { postData } from '../../Api';

const steps = ['이용 약관 동의', '본인 정보 입력', '본인 인증'];

export default function ProgressStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [allAgreed, setAllAgreed] = React.useState(false); 
  const [allCompleted, setAllCompleted] = React.useState(false); 
  const [allAuth, setAllAuth] = React.useState(false); 
  
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pwCheck, setPwCheck] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [detailAddress, setDetailAddress] = React.useState("");
  const [chipsData, setChipsData] = React.useState<string[]>([]);
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const stepComponents = [
    <AgreementForm setAllAgreed={setAllAgreed} />, 
    <InfoForm 
      setAllCompleted={setAllCompleted}
      id={id} setId={setId}
      pw={pw} setPw={setPw}
      pwCheck={pwCheck} setPwCheck={setPwCheck}
      nickName={nickName} setNickName={setNickName}
      postcode={postcode} setPostcode={setPostcode}
      address={address} setAddress={setAddress}
      detailAddress={detailAddress} setDetailAddress={setDetailAddress}
      chipsData={chipsData} setChipsData={setChipsData} 
    />,
    <AuthForm
      setAllAuth={setAllAuth}
      email={email} setEmail={setEmail}
      phone={phone} setPhone={setPhone}
    />
  ];

  const sendData = async () => {
    const payload = { 
      id: id,
      pw: pw,
      nickName: nickName,
      postcode: postcode,
      address: address,
      detailAddress: detailAddress,
      hashTag: chipsData,
      email: email,
      phone: phone,
    };

    try {
        const response = await postData('/member/signup/insert', payload); 
        console.log('POST 응답:', response);
    } catch (error) {
      console.log(payload);
        console.error('POST 요청 실패:', error);
    }
  };

  const insertMemberData = () => {
    console.log("insert 실행");
    sendData();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    allReset(); 
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const allReset = () => {
    setId("");
    setPw("");
    setPwCheck("");
    setNickName("");
    setPostcode("");
    setAddress("");
    setDetailAddress("");
    setChipsData([]);
    setEmail("");
    setPhone("");
    setAllAgreed(false);
    setAllCompleted(false);
    setAllAuth(false);
  };

  return (
    <Box width={"100%"} marginTop={5}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <SignUpCompleted />
          <Box display={"flex"} flexDirection={'column'} alignItems={"center"} pt={2}>
            <Box flex={"1 1 auto"}/>
            <CustomDivStyle  marginBottom={50}>
              <CustomLinkStyle to='/signin'>
                <CustomButton content={"로그인하기"} width={150} height={60} backgroundColor="#212121" textColor="#FFF" borderRadius={10} fontSize={18} fontWeight={900}></CustomButton>
              </CustomLinkStyle>
            </CustomDivStyle>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CustomDivStyle>
              <CustomDivStyle>
                {stepComponents[activeStep]}
              </CustomDivStyle>

              <CustomDivStyle marginTop={30} marginBottom={30}>
                <Box display={'flex'} flexDirection={'row'} pt={2}>
                  {(activeStep === 1 || activeStep === 2) && <CustomButton content={"뒤로가기"} sendMethod={handleBack} width={150} height={60} backgroundColor="#212121" textColor="#FFF" borderRadius={10} fontSize={18} fontWeight={900}></CustomButton>} 

                  <Box flex={"1 1 auto"}/>

                  {
                    activeStep === steps.length - 1 ? 
                    <CustomButton 
                        content='완료' 
                        width={150} 
                        height={60} 
                        backgroundColor="#212121" 
                        textColor="#FFF" 
                        borderRadius={10} 
                        fontSize={18} 
                        fontWeight={900} 
                        sendMethod={() => { handleNext(); insertMemberData(); }} 
                        disabled={!allAuth}
                    />
                    :
                    activeStep === 0 ?
                    <CustomButton 
                        content='다음' 
                        width={150} 
                        height={60} 
                        backgroundColor="#212121" 
                        textColor="#FFF" 
                        borderRadius={10} 
                        fontSize={18} 
                        fontWeight={900} 
                        sendMethod={handleNext} 
                        disabled={!allAgreed}
                    />
                    :
                    <CustomButton 
                        content='다음' 
                        width={150} 
                        height={60} 
                        backgroundColor="#212121" 
                        textColor="#FFF" 
                        borderRadius={10} 
                        fontSize={18} 
                        fontWeight={900} 
                        sendMethod={handleNext} 
                        disabled={!allCompleted} 
                    />
                }

                </Box>
              </CustomDivStyle>
          </CustomDivStyle>
        </React.Fragment>
      )}
    </Box>
  );
}
