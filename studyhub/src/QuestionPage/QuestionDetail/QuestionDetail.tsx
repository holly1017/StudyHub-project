import React, { useEffect, useState } from "react";
import UnderLineTitle from "../../Common/Component/etc/UnderLineTitle";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import QuestionDetailCommon from "../Common/QuestionDetailCommon";
import ContentArea from "./Component/ContentArea";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData } from "../../Api";
import AnswerWriterArea from "./Component/AnswerWriteArea";
import AnswerArea from "./Component/AnswerArea";
import { useUser } from "../../Common/UserContext";

interface Answer {
  id: number;
  writer: string;
  title: string;
  content: string;
  adooptStatus: "NO" | "YES";
  parentId: number | null;
  deleteStatus: string;
  memberNo: number;
  profile: string
}

interface QuestionObject {
  id: string;
  hashTagArr: string[];
  title: string;
  writer: string;
  point: string;
  uploadDate: string;
  view: number;
  content: string;
  deleteStauts: string;
  memberNo: number;
  likeNo: number;
  profile: string;
}

interface QuestionProps {
}


const QuestionDetail: React.FC<QuestionProps> = ({ }) => {
  const { id } = useParams();

  const { user } = useUser();

  const [showAnswerWriter, setShowAnswerWriter] = useState(false);

  const handleAnswerButtonChange = () => {
    setShowAnswerWriter(!showAnswerWriter);
  }

  const [showUpdate, setShowUpdate] = useState<number | null>(null);

  const handleUpdateButtonChange = (id: number) => {
    setShowUpdate((prev) => (prev === id ? null : id));
  }

  const [answer, setAnswer] = useState<Answer[]>([]);
  const [title, setTitle] = useState<string>('');
  const [ansContent, setAnsContent] = useState<string>('');
  const [adopted, setAdopted] = useState<"NO" | "YES" >("NO");


  const [questionData, setQuestionData] = useState<QuestionObject>({ id: '', hashTagArr: [], title: '', writer: '', point: '', uploadDate: '', view: 0, content: '', deleteStauts: '', memberNo: 0, likeNo: 0, profile: ''});

  const memberNo = user?.memberNo;

  const reqData = async () => {
    try {
      const response = await getData(`/question/list/view?id=${id}`);
      console.log("post 응답 : ", response);
      setQuestionData({
        id: response.id,
        hashTagArr: response.hashTagArr == null ? [] : response.hashTagArr.split(','),
        title: response.title,
        writer: response.writer,
        point: response.point,
        uploadDate: response.uploadDate,
        view: response.view,
        content: response.content,
        deleteStauts: response.deleteStatus,
        memberNo: response.memberNo,
        likeNo: response.likeNo,
        profile: response.profile
      });

      const filterAnswer = (response.answer || []).filter((answer: Answer) => answer.deleteStatus === 'NO');
      setAnswer(filterAnswer);
      console.log("답변입니다 : ", filterAnswer);
    } catch (error) {
      console.log("질문 상세 내역 요청 실패 : ", error);
    }
  }

  const writeAnswer = async () => {
    const payload = {
      title: title,
      content: ansContent,
      adopted: adopted,
      parentId: id,
      memberNo: memberNo
    };

    try {
      const response = await postData("/question/write", payload);
      console.log("답변 응답 완료");
      setTitle('');
      setAnsContent('');
      reqData();
      setShowAnswerWriter(false);
    } catch (error) {
      console.log("답변 응답 실패... : ", error);
    }
  }

  const deleteAnswer = async (answerNo: number) => {
    try {
      const response = await getData(`/question/list/delete?id=${answerNo}`);
      console.log("삭제 응답에 성공했습니다.", response);
      reqData();
    } catch (error) {
      console.error("삭제 에러 발생! : ", error);
    }
  }

  useEffect(() => {
    console.log(id);
    reqData();
    // 서버에 위 아이디값으로 게시물데이터 가져온다.
    setAnswer([]);
  }, [id])
  

  return (
    <CustomDivStyle display='flex' alignItems="center" flexDirection="column" marginTop="38px" minHeight={400} width={"100%"} minWidth={768} maxWidth={1017} margin="auto">
      <UnderLineTitle width="100%" content="질문게시판"></UnderLineTitle>
      <QuestionDetailCommon hashTag={questionData.hashTagArr} title={questionData.title} id={questionData.writer} point={questionData.point} uploadDate={questionData.uploadDate} view={questionData.view} profile={questionData.profile}></QuestionDetailCommon>
      <ContentArea content={questionData.content} viewAnswerWriteMethod={handleAnswerButtonChange} memberNo={questionData.memberNo} id={questionData.id} likeNo={questionData.likeNo}></ContentArea>
      {showAnswerWriter && <AnswerWriterArea writeAnswer={writeAnswer} setAnsContent={setAnsContent} setTitle={setTitle} />}
      <AnswerArea
        setAnsContent={setAnsContent}
        ansContent={ansContent}
        handleUpdateButtonChange={handleUpdateButtonChange}
        showUpdate={showUpdate}
        answer={answer}
        deleteAnswer={(answerNo: number) => deleteAnswer(answerNo)}
        width={'100%'}
        title={title}
        setTitle={setTitle}
        currMemberNo={questionData.memberNo}
        point={questionData.point}></AnswerArea>
    </CustomDivStyle>
  )
}

export default QuestionDetail;