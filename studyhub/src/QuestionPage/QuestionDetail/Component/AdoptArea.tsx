import React, { useEffect } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { postData } from "../../../Api";
import { useNavigate } from "react-router-dom";

interface AdoptAreaProps {
    memberNo : number;
    point: string;
    questionNo : number;
}

const AdoptArea: React.FC<AdoptAreaProps> = ({memberNo, point, questionNo}) => {

    console.log(questionNo);

    const navigate = useNavigate();


    const reqAdopt = async () => {

        const numPoint = Number(point);

        try {
            const payload = {
                memberNo : memberNo,
                point: numPoint,
                useDetail : "ADOPTED_QNA"
            }
            const response = await postData('/member/point/increment', payload);
            console.log("포인트 증가 성공", response);
            reqSetAdopted();
        } catch (error) {
            console.error("오류 발생! 포인트 증가 실패");
        }
    }

    const reqSetAdopted = async () => {
        const payLoad = {
            id : questionNo
        }
        try{
            const response = await postData('/question/adopted', payLoad)
            console.log(response);
            navigate(0);
            alert("채택되었습니다.");
        } catch (error) {
            console.error("에러발생!! 채택 실패!!");
        }
    }



    return (
        <CustomDivStyle width={"70%"} height={25} border="2px solid black" cursor="pointer" justifyContent="center" display="flex" fontSize={13} alignItems="center" onClick={()=> {reqAdopt();}}>채택하기</CustomDivStyle>
    )
}

export default AdoptArea;