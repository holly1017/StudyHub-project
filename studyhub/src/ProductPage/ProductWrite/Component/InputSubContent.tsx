import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import InputTable from "./InputTable";

interface InputSubContentProps {
    productStatus: string;
    price: string;
    setProductStatus: (data : string) => void;
    setPrice: (data: string) => void;
}

const InputSubContent: React.FC<InputSubContentProps> = ({productStatus, price, setProductStatus, setPrice}) => {
    return(
        <CustomDivStyle minHeight="136px" width="100%" display="flex" borderBottom="0.6px solid #DBDBDB">
            <InputTable productStatus={productStatus} price={price} setProductStatus={setProductStatus} setPrice={setPrice}></InputTable>
        </CustomDivStyle>
    )
}

export default InputSubContent;