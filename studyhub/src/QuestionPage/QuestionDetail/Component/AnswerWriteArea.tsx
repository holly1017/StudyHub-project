import React, { useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import UnderlineTextBox from "../../../Common/Component/input/UnderlineTextBox";
import TextArea from "./AnswerWriterArea";
import CustomButton from "../../../Common/Component/button/CustomButton";

interface AnswerWriterAreaProps {
    writeAnswer: (value:any) => any,
    setAnsContent: (data:string)=>any;
    setTitle: (data:string)=>any;
}

const AnswerWriterArea: React.FC<AnswerWriterAreaProps> = ({writeAnswer, setAnsContent, setTitle}) => {

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnsContent(e.target.value);
    }


    return (
        <CustomDivStyle width='100%' paddingBottom={30} borderBottom="0.6px solid #2c2c2c">
            <UnderlineTextBox width="100%" changeValue={setTitle}></UnderlineTextBox>
            <TextArea placeholder="답변 내용을 입력하세요." onChange={handleContentChange}/>
            <CustomDivStyle display="flex" justifyContent="flex-end">
                <CustomButton width={133} height={45} backgroundColor="#212121" textColor="white" borderRadius={20} content="등록하기" marginTop={25} sendMethod={writeAnswer}></CustomButton>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default AnswerWriterArea;