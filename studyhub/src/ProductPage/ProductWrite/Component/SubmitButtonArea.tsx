import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CustomButton from "../../../Common/Component/button/CustomButton";

interface SubmitButtonAreaProps {
    clickEvent?: () => any;
    price?: string;
}

const SubmitButtonArea: React.FC<SubmitButtonAreaProps> = ({ clickEvent, price }) => {

    const submitPrice = () => {
        const numberPrice = Number(price);

        const isValidPrice = (price: string) => {
            
            const regex = /^[1-9]\d*$/; 
            return regex.test(price);
        };
        
        if (price === undefined || price === null || price.trim() === "") {
            alert("모든 요소를 입력하셔야 등록이 가능합니다.");
        } else {
            if (!isValidPrice(price)) {
                if (isNaN(numberPrice)) {
                    alert("포인트는 숫자만 등록 가능합니다.");
                } else if (numberPrice < 1) {
                    alert("포인트는 1 이상의 수만 등록할 수 있습니다.");
                } else {
                    alert("소수는 등록이 불가능합니다.");
                }
            } else {
                if (numberPrice > 1000000000) {
                    alert("최대 포인트는 1,000,000,000원 입니다.");
                } else {
                    if (clickEvent) {
                        clickEvent();
                    }
                }
            }
        }
    }

    return (
        <CustomDivStyle width="100%" display="flex" justifyContent="flex-end" marginTop={30} marginBottom={38}>

            <CustomButton width={150} height={60} textColor='white' borderWidth={0} borderStyle='none' borderColor='#212121' backgroundColor={'#212121'} borderRadius={10} fontSize={20} content='등록' fontWeight={600} sendMethod={submitPrice} />

        </CustomDivStyle>
    )
}

export default SubmitButtonArea;