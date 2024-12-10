import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import Nav from "../common/Nav";
import Header from "../common/Header";
import QuestionList from "./component/QuestionList";
import NavDrawer from "../common/NavDrawer";
import { getData } from "../../Api";
import { useUser } from "../../Common/UserContext";
import PaginationButtons from "../../Common/Component/button/PaginationButtons";

interface Question {
    id: number;
    title: string;
    writer: string;
    replyCnt: number;
    point: number;
    adoptStatus: "YES" | "NO";
    deleteStatus: "YES" | "NO";
    memberNo: number;
}

const QuestionPage = () => {
    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [hideNav, setHideNav] = useState(false);
    const [page, setPage] = useState(1); // 현재 페이지
    const [maxPage, setMaxPage] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | number>("질문한 글");
    const options = ["질문한 글", "답변한 글", "좋아요한 글"];
    const [optionData, setOptionData] = useState<string>(options[0]);

    const { user } = useUser();
    const memberNo = user?.memberNo;

    useEffect(() => {
        const checkScreenWidth = () => {
            setHideNav(window.innerWidth < 1020);
        };

        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);

        return () => window.removeEventListener("resize", checkScreenWidth);
    }, []);

    useEffect(() => {
        // 서버에서 받아온 사용자의 질문 리스트를 set
        getGroupList(optionData);
    }, [optionData, page]);

    const getGroupList = async (option: any) => {
        try {
            let url = `/member/mypage/qna-myqna?memberNo=${memberNo}&page=${page - 1}&sort=questionNo,desc&size=8`;

            if (option === "답변한 글") {
            url = `/member/mypage/qna-myans?memberNo=${memberNo}&page=${page - 1}&sort=questionNo,desc&size=8`;
            } else if (option === "좋아요한 글") {
                url = `/member/mypage/qna-like?memberNo=${memberNo}&page=${page - 1}&sort=questionNo,desc&size=8`;
            }

            const response = await getData(url);

            console.log(response);

            setQuestionList(response.questions);
            setMaxPage(response.questionCount);
        } catch (error) {
            console.log("GET Error : ", error);
        }
    };

    const handleOptionChange = (value: string) => {
        setOptionData(value);
        setPage(1); 
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <CustomDivStyle margin={"auto"} maxWidth={1000} minWidth={700} minHeight={759} display="flex">
            {!hideNav && <Nav selected={"질문관리"} />}

            <CustomDivStyle width={"75%"} overflow={"auto"} minWidth={720} marginTop={50}>
                {hideNav && <NavDrawer selected="질문관리"></NavDrawer>}
                <Header></Header>

                <QuestionList questionList={questionList} optionData={optionData} options={options} handleOptionChange={handleOptionChange}></QuestionList>

                <CustomDivStyle marginTop="20px" marginBottom={50}>
                    <PaginationButtons size={"medium"} page={page} maxPage={maxPage} onChange={handlePageChange} />
                </CustomDivStyle>
            </CustomDivStyle>
        </CustomDivStyle>
    );
};

export default QuestionPage;
