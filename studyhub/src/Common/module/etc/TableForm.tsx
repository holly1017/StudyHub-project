import React from "react";
import { Icon, Table, Td, Th, TitleA } from "./TableFormStyle";
import CustomDivStyle from "../../Component/etc/CustomDivStyle";
import { postData } from "../../../Api";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

interface TableFormProps {
    width: number | string;
    columns: string[];
    rows: Question[];
    iconColumns?: { [key: string]: { trueIcon: string, falseIcon: string } };
    postDetail?: () => any;
    rowsPerPage?: number;
    setRowsPerPage?: (data: number) => void;
    totalCnt?: number;
    setTotalCnt?: (data: number) => void;
    columnKeyMap?: { [key: string]: keyof Question }
}

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


const renderCellContent = (
    column: string,
    rows: number,
    data: string | number | undefined,
    iconColumns?: { [key: string]: { trueIcon: string, falseIcon: string } },
    isFirstColumn?: boolean, // 첫 번째 열을 확인하는 인자 추가
    memberNo?: number,
    currMemberNo?: number | undefined,
    loginCheck?: (id: number) => void
) => {
    if (typeof data === 'string' && iconColumns && iconColumns[column]) {
        const { trueIcon, falseIcon } = iconColumns[column];
        if (data === 'NO') {
            return <Icon src={`${process.env.PUBLIC_URL}/${falseIcon}`} alt="iconN" />;
        } else if (data === 'YES') {
            return <Icon src={`${process.env.PUBLIC_URL}/${trueIcon}`} alt="iconY" />;
        }
    }

    // 첫 번째 열이라면 a 태그로 감싸기
    if (isFirstColumn) {

        const reqIncrementViewCnt = async () => {

            console.log(rows, currMemberNo);

            const payload = {
                boardNo: rows,
                memberNo: currMemberNo
            }
            try {
                const response = await postData("/question/list/view/viewCount", payload);
                console.log("조회수 요청 성공", response);
            } catch (error) {
                console.error("조회수 증가 실패", error)
            }
        }
        return <TitleA onClick={() => {
            reqIncrementViewCnt();
            loginCheck?.(rows);
        }}>{data}</TitleA>
    }

    return data;
};

const TableForm: React.FC<TableFormProps> = ({ width, columns, rows, iconColumns, columnKeyMap }) => {


    const { user } = useUser();

    const navigate = useNavigate(); // Hooks 호출

    const loginCheck = (id: number) => {
        if (user) {
            navigate(`/question/${id}`);
        } else {
            const isOk = window.confirm('로그인 후 이용가능합니다. 로그인을 하시겠습니까?');
            if (isOk) navigate('/signin');
        }
    };


    return (
        <CustomDivStyle width={width} margin="auto">
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <Th key={index}>{column}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => {
                                const fieldName = columnKeyMap ? columnKeyMap[column] : undefined;
                                const cellData = fieldName ? row[fieldName] : undefined;

                                return (
                                    <Td key={colIndex}>
                                        {renderCellContent(column, row["id"], cellData, iconColumns, colIndex === 1, row.memberNo, user?.memberNo, loginCheck)} {/* 첫 번째 열 여부 전달 */}
                                    </Td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </CustomDivStyle>
    );
};

export default TableForm;
