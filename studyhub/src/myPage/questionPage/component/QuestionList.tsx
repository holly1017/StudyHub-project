import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import SelectItems from "../../../Common/Component/etc/SelectItems";
import TableForm from "../../../Common/module/etc/TableForm";
import PaginationButtons from "../../../Common/Component/button/PaginationButtons";
import { getData } from "../../../Api";
import { useUser } from "../../../Common/UserContext";
import QuestionSelectItems from "./QuestionSelectItems";
import { SelectChangeEvent } from "@mui/material";

interface Question {
    id: number;
    title : string;
    writer: string;
    replyCnt : number;
    point: number;
    adoptStatus : "YES" | "NO";
    deleteStatus: "YES" | "NO";
    memberNo : number;
}
interface QuestionListProps {
    questionList: Question[];
    options: string[]
    optionData: any;
    handleOptionChange: (value: string) => any;
}

const QuestionList:React.FC<QuestionListProps> = ({questionList, options, optionData, handleOptionChange}) => {
    
    const [page, setPage] = useState(1);    // 현재 페이지
    const [count, setCount] = useState(1);  // 총 페이지 갯수
    const [totalCnt, setTotalCnt] = useState(0); // 전체 데이터 갯수

    const { user, setUser, logout } = useUser();
    const memberId = user?.memberId;

    const columns = ["번호", "제목", "작성자", "답글", "포인트", "채택여부"];

    const columnKeyMap: {[key: string]: keyof Question} = {
        "번호" : "id",
        "제목" : "title",
        "작성자" : "writer",
        "답글" : "replyCnt", 
        "포인트" : "point",
        "채택여부" : "adoptStatus"
    }    
    
    const iconColumns = { "채택여부": { trueIcon: "checked-icon.png", falseIcon: "cross-icon.png" } };
    return (
        <CustomDivStyle display="flex" flexDirection="column">
            <CustomDivStyle marginTop={39} display="flex" justifyContent="flex-end" height={56} marginBottom="2%">
                <QuestionSelectItems width={122} height={37} options={options} optionData={optionData} handleOptionChange={handleOptionChange}></QuestionSelectItems>     
            </CustomDivStyle>
            <CustomDivStyle>
                <TableForm width='100%' columns={columns} columnKeyMap={columnKeyMap} rows={questionList} iconColumns={iconColumns}></TableForm>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default QuestionList;