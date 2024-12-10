import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import AnswerButton from "./AnswerButton";
import { useUser } from "../../../Common/UserContext";
import { EmptyHeart, FullHeart } from "./AnswerAreaStyle";
import { postData } from "../../../Api";

interface ContentAreaProps {
    content: string;
    viewAnswerWriteMethod: () => any,
    memberNo: number,
    id: string;
    likeNo: number;
}

const ContentArea: React.FC<ContentAreaProps> = ({ content, viewAnswerWriteMethod, memberNo, id, likeNo }) => {

    const { user } = useUser();
    const currMemberNo = user?.memberNo;

    const [heartState, setHeartState] = useState(false);

    const likeIncrease = async () => {

        setHeartState(true);

        const payload = {
            boardNo: id,
            memberNo: currMemberNo
        }

        try {
            const response = await postData('/question/list/view/like', payload);
            console.log("성공", response);
        } catch (error) {
            console.error("증가 실패!", error);
        }
    }

    const likeDecrease = async () => {

        setHeartState(false);

        const payload = {
            boardNo: id,
            memberNo: currMemberNo
        }

        try {
            const response = await postData('/question/list/view/unlike', payload);
            console.log("성공 삭제", response);
        } catch (error) {
            console.error("증가 실패!", error);
        }
    }


    const [isViewBtn, setIsViewBtn] = useState(false);

    useEffect(() => {
        if (currMemberNo === undefined) {
            setIsViewBtn(false); // 로그인된 유저가 없으면 버튼 숨기기
        } else if (memberNo !== currMemberNo) {
            setIsViewBtn(true); // 다른 유저의 게시글이면 버튼 표시
        } else {
            setIsViewBtn(false); // 본인 게시글이면 버튼 숨기기
        }
    }, [memberNo, currMemberNo])

    useEffect(() => {
        console.log("좋아요 수 번호 : ", likeNo);
        setHeartState(likeNo > 0); 
    }, [likeNo]);

    return (
        <CustomDivStyle minHeight={58} width='100%' borderBottom="0.6px solid #2c2c2c">
            <CustomDivStyle display="flex">
                <CustomDivStyle width="100%" minHeight={58}>
                    <CustomDivStyle margin='2%' marginBottom={0} wordBreak="break-all" whiteSpace="pre-wrap">{content}</CustomDivStyle>
                </CustomDivStyle>
                <CustomDivStyle marginTop={10}>
                {isViewBtn &&  (heartState ? <FullHeart onClick={likeDecrease}/> : <EmptyHeart onClick={likeIncrease} />)}
                </CustomDivStyle>
            </CustomDivStyle>
            <CustomDivStyle height="76px" display="flex" justifyContent="center" alignItems="center">
                {isViewBtn && <AnswerButton viewAnswerWriteMethod={viewAnswerWriteMethod} />}
            </CustomDivStyle>
        </CustomDivStyle>

    )
}

export default ContentArea;