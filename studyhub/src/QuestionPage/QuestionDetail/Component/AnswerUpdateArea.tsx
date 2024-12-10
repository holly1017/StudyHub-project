import React, { useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import UnderlineTextBox from "../../../Common/Component/input/UnderlineTextBox";
import TextArea from "./AnswerWriterArea";
import CustomButton from "../../../Common/Component/button/CustomButton";
import { postData } from "../../../Api";
import { useNavigate } from "react-router-dom";

interface AnswerWriterAreaProps {
    id: number,
    setAnsContent: (data:string)=>any;
    setTitle: (data:string)=>any;
    title: string;
    content: string;
}

const AnswerUpdateArea: React.FC<AnswerWriterAreaProps> = ({id, title, content}) => {

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnsContent(e.target.value);
    }

    const [ansTitle, setAnsTitle] = useState(title);
    const [ansContent, setAnsContent] = useState(content);

    const navigate = useNavigate();

    const updateAnswer = async (answerNo: number) => {
        try {
          const data = {
            content: ansContent,
            title: ansTitle
          }
    
          const response = await postData(`/question/list/update?id=${id}`, data);
    
          console.log("업데이트 응답에 성공하셨습니다.");
          console.log(response);
          navigate(0);
    
        //   reqData();
        } catch (error) {
          console.error("에러 발생!!!! : ", error);
        }
      }

      

    return (
        <CustomDivStyle width='100%' paddingBottom={20}>
            <UnderlineTextBox width="100%" changeValue={setAnsTitle} value={ansTitle}></UnderlineTextBox>
            <TextArea placeholder="답변 내용을 입력하세요." onChange={handleContentChange} value={ansContent}/>
            <CustomDivStyle display="flex" justifyContent="flex-end">
                <CustomButton width={133} height={45} backgroundColor="#212121" textColor="white" borderRadius={20} content="등록하기" marginTop={25} sendMethod={()=>{updateAnswer(id)}}></CustomButton>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default AnswerUpdateArea;