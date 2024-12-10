import React, { useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { LeftTd, NoMoneyRightTd, RightTd } from "./BuyModalStyle";
import { useUser } from "../../../Common/UserContext";
import { postData } from "../../../Api";

interface BuyModalProps {
    myPoint : number;
    writerId: number;
    price: number;
    isLackOfMoney: boolean
}

const BuyModal:React.FC<BuyModalProps> = ({myPoint, price, isLackOfMoney}) => {

    const afterPoint = myPoint - price;

    return(
        <CustomDivStyle width={'100%'}>
            <table width={'100%'} style={{border: "1px solid black", height: '112px', borderCollapse: 'collapse'}}>
                <colgroup>
                    <col style={{backgroundColor: '#EEEEEE'}}/>
                </colgroup>
                <tr>
                    <LeftTd>현재 포인트</LeftTd>
                    <RightTd>{myPoint} p</RightTd>
                </tr>
                <tr>
                    <LeftTd>구매 후 포인트</LeftTd>
                    {!isLackOfMoney && <RightTd>{afterPoint} p</RightTd>}
                    {isLackOfMoney && <NoMoneyRightTd>포인트가 부족합니다.</NoMoneyRightTd>}
                </tr>
            </table>

            <CustomDivStyle fontSize={12} height={50} display="flex" justifyContent="center" alignItems="center">
                확인하기를 누르시면 포인트가 차감됩니다.
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default BuyModal;