import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import RegiContainer from "../../Common/module/etc/RegiContainer";
import InputSubContent from "./Component/InputSubContent";
import SubmitButtonArea from "./Component/SubmitButtonArea";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Api";
import { useUser } from "../../Common/UserContext";

interface QuestionWriteProps {
}

const QuestionWrite: React.FC<QuestionWriteProps> = ({ }) => {

    const [contents, setContents] = useState("");
    const [title, setTitle] = useState("");
    const [chipsData, setChipsData] = useState<string[]>([]);
    const [point, setPoint] = useState('');
    const [currPoint, setCurrPoint] = useState<number>(0);

    const { user } = useUser();
    const memberNo = user?.memberNo;

    const navigate = useNavigate();

    const writeQuestion = async () => {
        // 서버에 작성할 데이터 insert 요청
        const payload = {
            title: title,
            content: contents,
            hashTag: chipsData,
            point: point,
            memberNo: memberNo
        };

        try {

            const response = await postData("/question/write", payload);
            console.log("응답완료", response);
            navigate('/question');

        } catch (error) {
            console.log("응답실패");
        }

    }

    const reqPoint = async () => {
        try {
            const response = await postData('/member/profile', { memberNo });
            console.log("회원 정보 요청 : ", response);
            setCurrPoint(response.point);
        } catch (error) {
            console.error("에러발생 !!", error);
        }
    }

    const payload = {
        memberNo : user?.memberNo,
        point : point,
        useDetail : "REQ_QNA"
    }

    const payPoint = async () => {
        try {
        const response = await postData('/member/point/decrement', payload);
        console.log("포인트 사용 성공", response);
        } catch (error) {
            console.error("에러 발생!", error);
        }
    }

    useEffect(() => {
        reqPoint();
    }, []);

    return (
        <CustomDivStyle display='flex' alignItems="center" flexDirection="column" marginTop="38px" minHeight={400} width={"100%"} minWidth={768} maxWidth={1017} margin="auto">
            <RegiContainer ContainerWidth={'100%'} InputWidth={'100%'} TitleWidth={'100%'} content={'질문 게시판'} placeholder={'내용을 입력해주세요.'} onChangeContent={setContents} onChangeTitle={setTitle} title={title} contents={contents}></RegiContainer>
            <InputSubContent chipsData={chipsData} setChipsData={setChipsData} point={point} setPoint={setPoint} />
            <SubmitButtonArea clickEvent={() => { writeQuestion(); reqPoint();}} point={point} currPoint={currPoint} payPoint={payPoint}/>
        </CustomDivStyle>
    )
}

export default QuestionWrite;