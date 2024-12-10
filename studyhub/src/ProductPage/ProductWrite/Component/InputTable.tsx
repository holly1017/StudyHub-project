import React from "react";
import CustomInput from "../../../Common/Component/input/CustomInput";
import AlignCenterTd from "../../../QuestionPage/QuestionWrite/Component/InputTableStyle";
import RadioButtonGruop from "./RaioButtonGruop";

interface InputTableProps {
    productStatus : string;
    price : string;
    setProductStatus: (data : string) => void;
    setPrice: (data : string) => void;
}

const InputTable: React.FC<InputTableProps> = ({productStatus, price, setProductStatus, setPrice}) => {

    const handlePriceChage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    } 

    return (
        <>
            <table width={"100%"} border={0}>
                <tr>
                    <AlignCenterTd width={"8%"}>상태</AlignCenterTd>
                    <td width={'40%'}>
                        <RadioButtonGruop productStatus={productStatus} setProductStatus={setProductStatus}/>
                    </td>
                </tr>
                <tr>
                    <AlignCenterTd width={"8%"}>가격</AlignCenterTd>
                    <td width={'40%'}>
                        <CustomInput
                            placeholderText='가격을 입력하세요.'
                            width={'100%'}
                            height={'100%'}
                            value={price}
                            onChange={handlePriceChage}
                        />
                    </td>
                    <td>원</td>
                </tr>
            </table>
        </>
    )
}

export default InputTable;