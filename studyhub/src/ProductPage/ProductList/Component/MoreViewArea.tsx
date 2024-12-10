import React, { useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import MoreViewButton from "../../../Common/module/etc/MoreViewButton";

interface MoreViewAreaProps {
    setPage: (data: number) => void;
    page: number;
}

const MoreViewArea:React.FC<MoreViewAreaProps> = ({setPage, page}) => {

    return(
        <CustomDivStyle height={'140px'} display="flex" alignItems="center">
            <MoreViewButton sendMethod={() => {
                    setPage(page + 1);
                }} />
        </CustomDivStyle>
    )
}

export default MoreViewArea;