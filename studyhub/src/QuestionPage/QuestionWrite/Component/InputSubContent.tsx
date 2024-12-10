import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import InputTable from "./InputTable";

interface InputSubContentProps {
    chipsData : string[],
    setChipsData : (chipsData : string[]) => void,
    point: string;
    setPoint: (data : string) => void
}

const InputSubContent:React.FC<InputSubContentProps> = ({chipsData, setChipsData, point, setPoint}) => {
    return(
        <CustomDivStyle minHeight="136px" width="100%" display="flex" borderBottom="0.6px solid #DBDBDB">
            <InputTable chipsData={chipsData} setChipsData={setChipsData} point={point} setPoint={setPoint}></InputTable>
        </CustomDivStyle>
    )
}

export default InputSubContent;