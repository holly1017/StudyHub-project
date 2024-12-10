import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CheckArea from "./CheckArea";
import ReplyListComponent from "../../../Common/module/comment/ReplyListComponent";
import UpdateDeleteGroup from "../../../Common/module/etc/UpdateDeleteGroup";
import { AddCommentButton, EmptyHeart, FullHeart, UnderLineText } from "./AnswerAreaStyle";
import CustomAvatar from "../../../Common/Component/etc/CustomAvatar";
import AnswerUpdateArea from "./AnswerUpdateArea";
import { getData, postData } from "../../../Api";
import { useUser } from "../../../Common/UserContext";
import AdoptArea from "./AdoptArea";

interface Reply {
    id: number;
    user: string;
    content: string;
    parentId: number | null;
    dept: number;
    status: string;
    memberNo: number;
    profile: string;
}

interface Answer {
    id: number;
    writer: string;
    title: string;
    content: string;
    adooptStatus: "NO" | "YES";
    parentId: number | null;
    memberNo: number;
    profile: string;
}

interface AnswerAreaProps {
    answer: Answer[];
    width: number | string;
    title: string;
    ansContent: string;
    setTitle: (value: string) => any;
    setAnsContent: (value: string) => any;
    deleteAnswer: (answerNo: number) => any;
    showUpdate: number | null;
    handleUpdateButtonChange: (id: number) => void;
    currMemberNo: number;
    point: string;
}

const AnswerArea: React.FC<AnswerAreaProps> = ({
    deleteAnswer,
    width,
    setTitle,
    answer,
    showUpdate,
    handleUpdateButtonChange,
    setAnsContent,
    currMemberNo,
    point,
}) => {

    const { user } = useUser();
    const memberNo = user?.memberNo;

    const [editingMode, setEditingMode] = useState<number | null>(null);
    const [commentMode, setCommentMode] = useState<number | null>(null);

    const [replyContent, setReplyContent] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [replyArr, setReplyArr] = useState<Reply[]>([]);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (commentMode !== null) {
            reqCommentData(commentMode);
        }
    }, [page]);

    useEffect(() => {

    })

    const editingModeChange = (id: number) => {
        setEditingMode((prev) => (prev === id ? null : id));
    }

    const commentModeChange = (id: number) => {
        setCommentMode((prev) => {
            // 이미 열려 있는 경우(null로 상태를 변경) 요청을 보내지 않음
            if (prev === id) return null;
    
            // 열려 있지 않은 경우 요청을 보내고 상태를 업데이트
            reqCommentData(id);
            return id;
        });
    };

    console.log("맴버", memberNo);

    const insertReply = async (parentId: number, ansId: number) => {

        try {
            let contentData = parentId == -1 ? comment : replyContent;
            const data = {
                content: contentData,
                memberNo: memberNo
            }

            const response = await postData(`/question/reply/write?id=${ansId}&parentId=${parentId}`, data);
            console.log('POST 응답:', response);
            if (response) {
                parentId == -1 ? setComment('') : setReplyContent('');
                reqCommentData(ansId);
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqCommentData = async (ansId: number) => {
        try {
            const response = await getData(`/question/reply/list?id=${ansId}&page=${page - 1}&size=10&sort=replyNo,asc`);
            console.log('POST 댓글 응답입니다.:', response);
            setReplyArr(response.reply);
            setMaxPage(response.replyCount);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const reqReplyContent = async (replyNo: number) => {
        try {
            const response = await getData(`/question/reply?id=${replyNo}`);
            console.log('POST 응답이요dydnd:', response);
            setReplyContent(response);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const deleteReply = async (replyNo: number, ansId: number) => {
        try {
            const response = await getData(`/question/reply/list/delete?id=${replyNo}`);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData(ansId);
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const modifyReply = async (replyNo: number, ansId: number) => {
        try {
            const data = {
                content: replyContent
            }

            const response = await postData(`/question/reply/list/update?id=${replyNo}`, data);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData(ansId);
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const hasAdopted = answer.some((ans) => ans.adooptStatus === "YES");

    const sortedAnsList = answer.slice().sort((a, b) => {
        // 'YES' 상태를 우선으로 정렬
        if (a.adooptStatus === "YES" && b.adooptStatus !== "YES") return -1;
        if (a.adooptStatus !== "YES" && b.adooptStatus === "YES") return 1;
    
        // adooptStatus가 동일하면 id 오름차순 정렬
        return a.id - b.id;
    });

    return (
        <CustomDivStyle width={"100%"} marginBottom='38px'>
            {sortedAnsList.map((ans) => (

                <CustomDivStyle key={ans.id} width="100%" display="flex" borderBottom="0.6px solid #2c2c2c" paddingBottom="1%">
                    <CustomDivStyle flex={1} marginTop="2.5%" marginRight='2.5%'>
                        <CheckArea key={ans.id} adopted={ans.adooptStatus} />
                    </CustomDivStyle>

                    <CustomDivStyle flex={10}>
                        <div key={ans.id}>
                            {showUpdate != ans.id && editingMode != ans.id && <CustomDivStyle height={79} display="flex" borderBottom="0.6px solid #DBDBDB">
                                <CustomDivStyle fontSize={24} color='#2c2c2c' fontWeight={900} flex={9} display="flex" alignItems="center">
                                    {ans.title}
                                </CustomDivStyle>
                                <CustomDivStyle flex={1.1} display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between" paddingTop="9px" paddingBottom="9px" paddingRight={5}>
                                    {ans.adooptStatus === "NO" && (ans.memberNo == memberNo && <UpdateDeleteGroup modifyMethod={() => { editingModeChange(ans.id); handleUpdateButtonChange(ans.id); }} deleteMethod={() => deleteAnswer(ans.id)} ></UpdateDeleteGroup>)}
                                    {ans.adooptStatus === "NO" && memberNo === currMemberNo && !hasAdopted && (<AdoptArea memberNo={ans.memberNo} point={point} questionNo={ans.id}></AdoptArea>)}
                                    <CustomDivStyle display="flex" gap={5} alignItems="center" color='#2C2C2C' fontSize='12px' fontWeight="750">
                                        <CustomAvatar image={ans.profile} width={27} height="27px" />
                                        {ans.writer}
                                    </CustomDivStyle>
                                </CustomDivStyle>
                            </CustomDivStyle>}

                            {showUpdate != ans.id && editingMode != ans.id &&
                                <CustomDivStyle fontSize={12} color='#2c2c2c' borderBottom="0.6px solid #DBDBDB" display="flex">
                                    <CustomDivStyle padding="2%" flex={9} minHeight='59px' fontSize={16} whiteSpace="pre-wrap">
                                        {ans.content}
                                    </CustomDivStyle>
                                    <CustomDivStyle flex={1} display="flex" flexDirection="column">

                                        <CustomDivStyle flex={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                                            <AddCommentButton onClick={() => commentModeChange(ans.id)}>
                                                <UnderLineText>댓글 보기</UnderLineText>
                                            </AddCommentButton>
                                        </CustomDivStyle>

                                    </CustomDivStyle>
                                </CustomDivStyle>}
                            {showUpdate === ans.id && editingMode === ans.id && <AnswerUpdateArea id={ans.id} title={ans.title} content={ans.content} setTitle={setTitle} setAnsContent={setAnsContent}></AnswerUpdateArea>}


                            {commentMode === ans.id && replyArr.filter(cmt => cmt.parentId === ans.id) &&
                                <CustomDivStyle>
                                    <ReplyListComponent
                                        comment={replyArr}
                                        width={width}
                                        replyMethod={(parentId: number) => insertReply(parentId, ans.id)}
                                        commentMethod={() => { insertReply(-1, ans.id) }}
                                        modifyMethod={(replyNo: number) => modifyReply(replyNo, ans.id)}
                                        deleteMethod={(replyNo: number) => deleteReply(replyNo, ans.id)}
                                        replyContent={replyContent}
                                        setReplyContent={setReplyContent}
                                        page={page}
                                        pageOnChange={handleChange}
                                        maxPage={maxPage}
                                        content={comment}
                                        setContent={setComment}
                                        reqReplyContent={(id: number) => { reqReplyContent(id) }}

                                    />
                                </CustomDivStyle>
                            }
                        </div>
                    </CustomDivStyle>
                </CustomDivStyle>
            ))}
        </CustomDivStyle>
    );
};

export default AnswerArea;
