import React, { useEffect, useState } from "react";
import TableForm from "../../Common/module/etc/TableForm";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import PaginationButtons from "../../Common/Component/button/PaginationButtons";
import SearchInput from "../../Common/Component/input/SearchInput";
import PostPageBtn from "../../Common/Component/button/PostPageBtn";
import TopAreaDiv from "./QuestionListStyle";
import { Link, useNavigate } from "react-router-dom";
import CustomLinkStyle from "../../Common/Component/button/CustomLinkStyle";
import { getData } from "../../Api";
import { useUser } from "../../Common/UserContext";

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

const QuestionListPage: React.FC = () => {

    const { user } = useUser();
    const navigate = useNavigate();

    const loginCheck = () => {
        if (user) {
            navigate("/question/write");
        } else {
            const isOk = window.confirm('로그인 후 이용가능합니다. 로그인을 하시겠습니까?');
            if (isOk) navigate('/signin');
        }
    }

    const columns = ["번호", "제목", "작성자", "답글", "포인트", "채택여부"];

    const columnKeyMap: { [key: string]: keyof Question } = {
        "번호": "id",
        "제목": "title",
        "작성자": "writer",
        "답글": "replyCnt",
        "포인트": "point",
        "채택여부": "adoptStatus"
    }

    const iconColumns = { "채택여부": { trueIcon: "checked-icon.png", falseIcon: "cross-icon.png" } };

    const [questionArr, setQuestionArr] = useState<Question[]>([]);
    const [page, setPage] = useState(1);    // 현재 페이지
    const [maxPage, setMaxPage] = useState(0);
    const [search, setSearch] = useState<string>('');
    const [nothing, setNothing] = useState<string>('');
    const [viewNothing, setViewNothing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    }

    const reqSearchData = async (search: string, page: number) => {
        try {

            const response = await getData(`/question/list/search?search=${search}&page=${page - 1}&sort=questionNo,desc&size=12`);
            console.log("검색 응답 : ", response);

            if (response.questionCount === 0) {
                setNothing(`"${search}"(이)가 존재하지 않습니다.`);
                setViewNothing(true);
                setMaxPage(0);
            } else {
                setViewNothing(false);
                setQuestionArr(response.questions);
                setMaxPage(response.questionCount);
            }

        } catch (error) {
            console.error("검색 요청을 실패했습니다 : ", error);
        }
    }

    const reqData = async () => {
        try {
            const response = await getData(`/question/list?page=${page - 1}&sort=questionNo,desc&size=12`);
            console.log('POST 응답 : ', response);
            setQuestionArr(response.questions);
            setMaxPage(response.questionCount);
        } catch (error) {
            console.error('post 요청을 대실패하셨습니다.. : ', error);
        }
    }

    useEffect(() => {
        if (isSearching) {
            reqSearchData(search, page);
        } else {
            reqData();
        }
    }, [page, isSearching]);

    const handleSearch = () => {
        setPage(1);
        setIsSearching(true);
        reqSearchData(search, 1);
    };

    return (
        <CustomDivStyle display="flex" alignItems="center" flexDirection="column" marginTop="38px" width={"100%"} minWidth={768} maxWidth={1017} margin="auto">
            <TopAreaDiv>
                <CustomDivStyle fontSize={18}>질문 게시판</CustomDivStyle>
                <SearchInput width='58%' height="36px" placeholder="검색어를 입력해주세요." onClick={handleSearch} search={search} setSearch={setSearch}></SearchInput>
                <PostPageBtn content="글 작성하기" onClick={loginCheck}></PostPageBtn>
            </TopAreaDiv>
            <CustomDivStyle width="100%">
                {viewNothing && <CustomDivStyle paddingTop={50} fontSize={20}>{nothing}</CustomDivStyle>}
                {!viewNothing && <TableForm width='100%' columns={columns} columnKeyMap={columnKeyMap} rows={questionArr || []} iconColumns={iconColumns}></TableForm>}
                <CustomDivStyle margin="5%"><PaginationButtons size={"large"} page={page} onChange={handlePageChange} maxPage={maxPage}></PaginationButtons></CustomDivStyle>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default QuestionListPage;