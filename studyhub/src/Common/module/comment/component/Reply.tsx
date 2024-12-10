import React, { useState } from "react";
import CustomButton from "../../../Component/button/CustomButton";
import ReplyStyle from "./ReplyStyle";
import './Reply.css';

interface ReplyProps {
  rows?: number;
  height?: number;
  content: string;
  setContent: (value:string) => any;
  sendMethod?: (value:any) => any;
}

const Reply: React.FC<ReplyProps> = ({sendMethod, content, setContent, rows=7, height=50}) => {

    return (
      
      <div className="reply-div">
        <br></br>
        <ReplyStyle
          id="outlined-textarea"
          placeholder="댓글을 입력해주세요."
          multiline
          width={'100%'}
          value={content}
          rows={rows}
          onChange={(e)=>setContent(e.target.value)}
        />
        <div className="reply-btn">
          <CustomButton sendMethod={sendMethod} width={100} height={height} textColor="white" borderWidth={1} borderStyle="none" borderColor="black" backgroundColor="green" borderRadius={20} fontSize={15} content="등록" fontWeight={900} />
        </div>
      </div>
    );
  }
  
  export default Reply;
  