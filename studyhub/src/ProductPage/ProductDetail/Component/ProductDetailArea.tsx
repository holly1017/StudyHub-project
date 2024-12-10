import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CustomButton from "../../../Common/Component/button/CustomButton";
import { FullHeartIcon, EmptyHeartIcon, RightTd, ProductNameTd, StatusAndDateDetailTd, StatusAndDateTd, Tr20, Tr30, Table, ProductStatusSpan } from "./ProductDetailAreaStyle";
import ModalContainer from "../../../Common/module/modal/Modal";
import QuitModalContent from "../../../myPage/QuitModal/QuitModalContent";
import BuyModal from "./BuyModal";
import { useUser } from "../../../Common/UserContext";
import { postData } from "../../../Api";
import { useNavigate } from "react-router-dom";

interface ProductDetailAreaProps {
    productName: string,
    like?: boolean,
    price: number,
    productStatus: "BEST" | "TOP" | "MIDDLE" | "LOW";
    regDate: string;
    myPoint: number;
    writerId: number;
    boardId: number;
    sellStatus: "NO" | "YES"
}

const formatDate = (isoString: string) => {
    return isoString.split("T")[0];
}

const ProductDetailArea: React.FC<ProductDetailAreaProps> = ({ productName, price, productStatus, regDate, myPoint, writerId, boardId, sellStatus }) => {

    const navigate = useNavigate();

    console.log(myPoint, price);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSellStatus, setIsSellStatus] = useState(false);
    const [isInvisible, setIsInvisible] = useState(false);
    const [isLackOfMoney, setIsLackOfMoney] = useState(true);

    const openModal = () => {
        setIsModalOpen(true);
        if(myPoint >= price) {
            setIsLackOfMoney(false)
        } else {
            setIsLackOfMoney(true);
        }
    };

    const buyProduct = () => {
        if (myPoint >= price) {
            reqIncrementPoint();
            reqDeCrementPoint();
            reqSellStatusChange();
            alert("구매에 성공했습니다.");
            navigate(0);
        } else {
            alert(`포인트가 부족합니다.`);
            closeModal();
        }
    };

    const closeModal = () => setIsModalOpen(false);

    const { user } = useUser();

    const reqIncrementPoint = async () => {
        const payload = {
            memberNo: writerId,
            point: price,
            useDetail: "SELL_PRODUCT"
        }
        try {
            const response = await postData('/member/point/increment', payload);
        } catch (error) {
            console.error("에러 발생!! 포인트 증가 실패", error);
        }
    }

    const reqDeCrementPoint = async () => {
        const payload = {
            memberNo: user?.memberNo,
            point: price,
            useDetail: "BUY_PRODUCT"
        }
        try {
            const response = await postData('/member/point/decrement', payload);
            console.log(response);
        } catch (error) {
            console.error("포인트 감소 실패!!", error);
        }
    }

    const reqSellStatusChange = async () => {
        const payload = {
            boardId: boardId
        }
        try {
            const response = await postData('/trade/list/view/sold', payload);
            console.log("판매 상태 변경 성공", response);
        } catch (error) {
            console.error("판매 상태 변경 실패", error);
        }
    }

    const stateHandler = () => {
        if (writerId === user?.memberNo) {
            if (sellStatus === "NO") {
                setIsInvisible(false);
            } else {
                setIsSellStatus(true);
                setIsInvisible(true);
            }
        } else {
            if (sellStatus === "NO") {
                setIsSellStatus(false);
                setIsInvisible(true);
            } else {
                setIsSellStatus(true);
                setIsInvisible(true);
            }
        }
    };

    useEffect(() => {
        stateHandler();
    }, [sellStatus, writerId, myPoint, price])

    return (
        <CustomDivStyle width="40%" height={"100%"} marginLeft={10}>
            <Table>
                <Tr30>
                    <ProductNameTd colSpan={2}>{productName}</ProductNameTd>
                </Tr30>
                <Tr30>
                    <td></td>
                    <RightTd>{price}원</RightTd>
                </Tr30>
                <Tr20>
                    <StatusAndDateTd>상품 상태</StatusAndDateTd>
                    <StatusAndDateDetailTd>
                        <ProductStatusSpan isActive={productStatus === "LOW"}>하&nbsp;</ProductStatusSpan>
                        <ProductStatusSpan isActive={productStatus === "MIDDLE"}>중&nbsp;</ProductStatusSpan>
                        <ProductStatusSpan isActive={productStatus === "TOP"}>상&nbsp;</ProductStatusSpan>
                        <ProductStatusSpan isActive={productStatus === "BEST"}>최상</ProductStatusSpan>
                    </StatusAndDateDetailTd>
                </Tr20>
                <Tr20>
                    <StatusAndDateTd>등록일</StatusAndDateTd>
                    <StatusAndDateDetailTd>{formatDate(regDate)}</StatusAndDateDetailTd>
                </Tr20>
            </Table>

            <CustomDivStyle height="20%" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <ModalContainer
                    height={418}
                    width={559}
                    content="상품 구매"
                    subContent={<BuyModal myPoint={myPoint} writerId={writerId} price={price} isLackOfMoney={isLackOfMoney}/>}
                    rightbtnBorderColor="#ADEB96"
                    rightbtnContent="구매확정"
                    rightbtnTextColor="#ADEB96"
                    isOpen={isModalOpen} // 모달 열림 상태 전달
                    onClose={closeModal} // 모달 닫기 메서드 전달
                    onOk={buyProduct}
                />
                {isInvisible && (!isSellStatus && <CustomButton content="구매하기" backgroundColor="#ADEB96" fontSize={17} width={110} height={40} textColor="white" marginBottom={2} marginRight={2} borderRadius={12} sendMethod={openModal} />)}
                {isInvisible && (isSellStatus && <CustomButton content="판매완료" backgroundColor="#E1E1E1" fontSize={17} width={110} height={40} textColor="#B3B3B3" marginBottom={2} marginRight={2} borderRadius={12} pointerEvents="none" />)}
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default ProductDetailArea;