import React, { useState } from "react";
import CustomAvatar from "../../../Component/etc/CustomAvatar";
import {useReplyVisibility} from './ReplyItem';
import Reply from "./Reply";
import CustomDivStyle from "../../../Component/etc/CustomDivStyle";
import UpdateDeleteGroup from "../../etc/UpdateDeleteGroup";
import './ReplyItemComponentStyle.css';
import { useUser } from "../../../UserContext";

interface ReplyItemProps {
  isReply: boolean,
  content: string,
  userVal: string,
  dept: number,
  rows?: number;
  btnHeight?: number;
  replyContent: string;
  status: string;
  setReplyContent: (value:string) => any;
  replyMethod: (parentId:number) => any,
  modifyMethod: () => any,
  deleteMethod: () => any,
  reqReplyContent: ()=> any,
  memberNo: number;
  profile ?: string;
}

const ReplyItemComponent: React.FC<ReplyItemProps> = ({ isReply, content, userVal, dept, rows, status, btnHeight, replyContent, setReplyContent, replyMethod, modifyMethod, deleteMethod, reqReplyContent, memberNo, profile }) => {
  const { isReplyVisible, handleAddReply } = useReplyVisibility();
  const [isModify, setIsModify] = useState(false);

  const { user } = useUser();

  const replyFunc = (parentId:number) => {
      if(replyContent == "") return;
      replyMethod(parentId);
      handleAddReply()
  }

  const modifyFunc = () => {
      if(replyContent == "") return;
      modifyMethod();
      handleAddReply();
      setIsModify(!isModify);
      setReplyContent('');
  }

  return (
    <div>
      <CustomDivStyle display="flex">
        {
          <CustomDivStyle marginLeft={(dept+1) * 20}></CustomDivStyle>
        }
        {isReply && (
          <CustomDivStyle marginRight={10}>
            <img src={`${process.env.PUBLIC_URL}/arrow-curve-left-right.png`} alt="Reply Indicator" />
          </CustomDivStyle>
        )}
        <div>
          <CustomAvatar image={profile} width={36} height={36} />
        </div>
        <CustomDivStyle marginLeft={10} flex={1} overflow='hidden'>
          <CustomDivStyle display="flex" alignItems="center" justifyContent="space-between">
            <CustomDivStyle display="flex" alignItems="center">
              <div>{userVal}</div>
              <CustomDivStyle padding={'0px 10px'} cursor="pointer" onClick={handleAddReply}>답글</CustomDivStyle>
            </CustomDivStyle>
            { (status=="NO" && user?.memberNo==memberNo) && <UpdateDeleteGroup modifyMethod={() => {handleAddReply(); reqReplyContent(); setIsModify(!isModify)}} deleteMethod={deleteMethod}/>}
          </CustomDivStyle>
          <CustomDivStyle marginTop={5} fontSize={14}>{ status=="NO" ? content : "삭제된 댓글입니다."}</CustomDivStyle>
        </CustomDivStyle>
      </CustomDivStyle>
      {isReplyVisible && <Reply sendMethod={isModify ? modifyFunc : replyFunc} rows={rows} height={btnHeight} content={replyContent} setContent={setReplyContent}/>}
      <hr className="horizontal_rule_reply"/>
    </div>
  );
}

export default ReplyItemComponent;
