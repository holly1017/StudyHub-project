import React from "react";
import Reply from "./component/Reply";
import ReplyItemComponent from "./component/ReplyItemComponent";
import PaginationButtons from "../../Component/button/PaginationButtons";
import { countCommentsAndReplies, renderReplies } from "./component/ReplyList"; 
import CustomDivStyle from "../../Component/etc/CustomDivStyle";

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

interface ReplyListProps {
  comment: Reply[];
  width: number | string;
  commentRowsCnt?: number;
  btnHeight?: number;
  content: string;
  replyContent: string;
  setReplyContent: (value:string)=>any;
  setContent: (value:string)=>any;
  commentMethod: () => any;
  replyMethod: (parentId:number) => any;
  modifyMethod: (replyNo:number) => any;
  deleteMethod: (replyNo:number) => any;
  page?: number;
  pageOnChange?: (event: React.ChangeEvent<unknown>, value: number) => any;
  reqReplyContent: (id:number) => any;
  maxPage?: number;
}

const ReplyListComponent: React.FC<ReplyListProps> = ({ comment, width, commentRowsCnt, btnHeight, content, setContent, replyContent, setReplyContent, commentMethod, replyMethod, modifyMethod, deleteMethod, page, pageOnChange, reqReplyContent, maxPage }) => {
  const { commentCount, replyCount } = countCommentsAndReplies(comment);
  
  return (
    <CustomDivStyle width={width} margin="auto" marginTop={10}>
      <CustomDivStyle display="flex" marginBottom={10}>
        <img src={`${process.env.PUBLIC_URL}/message-circle.png`} width={25} />
        <CustomDivStyle display="flex" alignItems="center" marginLeft={5}>댓글({commentCount + replyCount}개)</CustomDivStyle>
      </CustomDivStyle>
      {comment
        .map((commentItem, index) => {
          const isReply = commentItem.parentId === -1 ? false : true;
          return (
          <CustomDivStyle key={index}>
            {
            <ReplyItemComponent
              replyMethod={() => {replyMethod(commentItem.id)}} 
              deleteMethod={() => {deleteMethod(commentItem.id)}}
              modifyMethod={() => {modifyMethod(commentItem.id)}}
              isReply={isReply}
              content={commentItem.content}
              userVal={commentItem.user}
              dept={commentItem.dept}
              rows={commentRowsCnt}
              btnHeight={btnHeight}
              replyContent={replyContent}
              status={commentItem.status}
              setReplyContent={setReplyContent}
              reqReplyContent={() => {reqReplyContent(commentItem.id)}}
              memberNo={commentItem.memberNo}
              profile={commentItem.profile}
            /> 
            }
          </CustomDivStyle> );
      })}
      <CustomDivStyle display="flex" justifyContent="center" marginTop={10} marginBottom={10}>
        <PaginationButtons size="medium" page={page} onChange={pageOnChange} maxPage={maxPage}/>
      </CustomDivStyle>
      <Reply sendMethod={commentMethod} rows={commentRowsCnt} height={btnHeight} content={content} setContent={setContent}/>
    </CustomDivStyle>
  );
}

export default ReplyListComponent;
