import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CustomButton from "../../../Common/Component/button/CustomButton";

interface SubmitButtonAreaProps {
    clickEvent?: () => any;
    point?: string
    currPoint?: number;
    payPoint? : () => Promise<void>
}

const SubmitButtonArea: React.FC<SubmitButtonAreaProps> = ({ clickEvent, point, currPoint, payPoint }) => {

    const submitPoint = () => {
        const numberPoint = Number(point);

        console.log(currPoint);
        console.log(point);

        const isValidPoint = (point: string) => {
            const regex = /^[1-9]\d*$/;
            return regex.test(point);
        };

        if (point !== undefined && currPoint !== undefined && 0 <= currPoint) {
            if (!isValidPoint(point)) {
                if (isNaN(numberPoint)) {
                    alert("포인트는 숫자만 등록 가능합니다.");
                } else if (numberPoint < 1) {
                    alert("포인트는 1 이상의 수만 등록할 수 있습니다.");
                } else {
                    alert("소수는 등록이 불가능합니다.");
                }
            } else {
                if (numberPoint > 10000) {
                    alert("최대 포인트는 10,000원 입니다.");
                } else if (currPoint < numberPoint) {
                    alert("보유 포인트가 부족합니다. (당신의 현재 포인트 " + currPoint + "point)");
                } else {
                    if (clickEvent) {
                        clickEvent();
                    } if (payPoint) {
                        payPoint();
                    }
                }
            }
        }
    };

    return (
        <CustomDivStyle width="100%" display="flex" justifyContent="flex-end" marginTop={150} marginBottom={38}>

            <CustomButton width={150} height={60} textColor='white' borderWidth={0} borderStyle='none' borderColor='#212121' backgroundColor={'#212121'} borderRadius={10} fontSize={20} content='등록' fontWeight={600} sendMethod={submitPoint} />

        </CustomDivStyle>
    )
}

export default SubmitButtonArea;