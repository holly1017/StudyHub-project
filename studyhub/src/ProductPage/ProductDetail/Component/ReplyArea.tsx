import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import ReplyListComponent from "../../../Common/module/comment/ReplyListComponent";

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

interface ReplyAreaProps {
    replyArr: Reply[];
    replyMethod: (parentId: number) => any;
    modifyMethod: (replyNo: number) => any;
    deleteMethod: (replyNo: number) => any;
    content: string;
    setContent: (data: string) => void;
    replyContent: string;
    setReplyContent: (data: string) => void;
    page: number;
    handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    reqReplyContent: (replyNo: number) => any;
    maxPage: number;
    children?: React.ReactNode;
}

const ReplyArea: React.FC<ReplyAreaProps> = ({
    replyArr,
    replyMethod,
    modifyMethod,
    deleteMethod,
    content,
    setContent,
    replyContent,
    setReplyContent,
    page,
    handleChange,
    reqReplyContent,
    maxPage
}) => {

    return (
        <CustomDivStyle width="100%">
            <ReplyListComponent
                comment={replyArr} width={"100%"}
                replyMethod={(parentId: number) => replyMethod(parentId)}
                commentMethod={() => { replyMethod(-1) }}
                modifyMethod={(replyNo: number) => { modifyMethod(replyNo) }}
                deleteMethod={(replyId: number) => { deleteMethod(replyId) }}
                content={content}
                setContent={setContent}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                page={page}
                pageOnChange={handleChange}
                reqReplyContent={(id: number) => { reqReplyContent(id) }}
                maxPage={maxPage} />
        </CustomDivStyle>
    )
}

export default ReplyArea;