// utils.ts
import React from "react";
import ReplyItemComponent from "./ReplyItemComponent";
import CustomDivStyle from "../../../Component/etc/CustomDivStyle";

export const countCommentsAndReplies = (comments: any[]): { commentCount: number; replyCount: number } => {
  let commentCount = 0;
  let replyCount = 0;

  // 모든 댓글을 순회하면서 댓글과 대댓글의 개수를 세기
  comments.forEach(comment => {
    if (comment.parentId === null) {
      commentCount++; // 댓글
    } else {
      replyCount++; // 대댓글
    }
  });

  return { commentCount, replyCount };
};

export const renderReplies = (
  comments: any[], 
  parentId: number, 
  level: number = 1, 
  rows: number = 7, 
  btnHeight: number = 50, 
  replyContent: string,
  setReplyContent: (value:string)=>any,
  replyMethod: (parentId:number) => any, 
  deleteMethod: () => any, 
  modifyMethod: () => any
) => {
  return comments
    .filter(comment => comment.parentId === parentId) // parentId가 일치하는 대댓글만 찾기
    .map((commentItem, subIndex) => (
      <CustomDivStyle key={subIndex}>
        <ReplyItemComponent
          replyMethod={() => {replyMethod(commentItem.id)}}
          deleteMethod={deleteMethod}
          modifyMethod={modifyMethod}
          isReply={true}
          content={commentItem.content}
          userVal={commentItem.user}
          dept={level}
          rows={rows}
          btnHeight={btnHeight}
          replyContent={replyContent}
          status={commentItem.status}
          setReplyContent={setReplyContent}
          reqReplyContent={() => {}}
          memberNo={commentItem.memberNo}
        />
        {renderReplies(comments, commentItem.id, level + 1, rows, btnHeight, replyContent, setReplyContent, replyMethod, deleteMethod, modifyMethod)} {/* 하위 대댓글 렌더링 */}
      </CustomDivStyle>
    ));
};
