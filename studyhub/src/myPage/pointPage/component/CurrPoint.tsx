import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { CustomIcon } from "../../common/SideBarItemStyle";
import CustomButton from "../../../Common/Component/button/CustomButton";
import styled from "styled-components";
import axios from 'axios';
import { useUser } from "../../../Common/UserContext";
import ModalContainer from "../../../Common/module/modal/Modal";
import PointModal from "./PointModal";
import { postData } from "../../../Api";

const PointDiv = styled.div`
    border: 1px solid black;
    width: 90%; 
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

interface CurrPointProps {
    currPoint: number;
    reqPointInfo: ()=>void;
}

const CurrPoint: React.FC<CurrPointProps> = ({currPoint, reqPointInfo}) => {
    const [chargePoint, setChargePoint] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const memberNo = user?.memberNo;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
          document.head.removeChild(jquery);
          document.head.removeChild(iamport);
        };
    }, []);

    const requestPay = () => {
        const IMP = (window as any).IMP;
        IMP.init('imp82236188'); // 실제 가맹점 식별코드를 입력하세요.

        setIsLoading(true);

        IMP.request_pay({
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: `ORD${new Date().getTime()}`,  // 유니크한 주문번호 생성
            name: "포인트 충전",
            amount: chargePoint // 결제 금액
        }, async (rsp: any) => { // 결제 완료 후 콜백 함수
            if (rsp.imp_uid != null) {
                const payload = {
                    impUid: rsp.imp_uid,
                    memberNo: memberNo,
                    useDetail: "CHARGE"
                }
                try{
                    const response = await postData("/member/mypage/point/charge", payload);
                    console.log(response);
                    alert('결제 성공');
                    reqPointInfo();
                    closeModal();

                } catch(error) {
                    console.log(error);
                    alert('결제에러 실패');
                }
            } else {
                alert('id null 결제 실패');
            }
            console.log(rsp);
            setIsLoading(false); // 결제 요청 종료 상태 설정
        });
    };

    return (
        <CustomDivStyle margin={20}>
            <CustomDivStyle marginTop={40} display="flex" justifyContent={"space-evenly"} alignItems={"center"}>
                <PointDiv>
                    <CustomIcon src={`${process.env.PUBLIC_URL}/point-icon.png`} alt="icon"></CustomIcon>
                    <p>현재 포인트</p>
                    <p>{currPoint}p</p>
                    <CustomButton sendMethod={openModal} backgroundColor="#7D7D7D" textColor="white" fontSize={17} width={119} height={37} borderColor="" borderRadius={15} borderStyle="" borderWidth={0} content="충전하기" fontWeight={0}></CustomButton>
                </PointDiv>
            </CustomDivStyle>

            <CustomDivStyle height="20%" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <ModalContainer
                    height={600}
                    width={559}
                    content="상품 구매"
                    subContent={<PointModal currPoint={currPoint} chargePoint={chargePoint} setChargePoint={setChargePoint}/>}
                    rightbtnBorderColor="#ADEB96"
                    rightbtnContent="구매확정"
                    rightbtnTextColor="#ADEB96"
                    isOpen={isModalOpen} // 모달 열림 상태 전달
                    onOk={requestPay}
                    onClose={closeModal} // 모달 닫기 메서드 전달
                />
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default CurrPoint;
