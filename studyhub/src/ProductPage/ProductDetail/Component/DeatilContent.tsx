import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";

interface DetailContentProps {
    content : string
}

const DetailContent:React.FC<DetailContentProps> = ({content}) => {
    return(
        <CustomDivStyle width={'100%'} minHeight={100} borderTop="1px solid #898989" borderBottom="1px solid #898989" marginTop={30} whiteSpace="pre-wrap">
            <CustomDivStyle margin={30}>{content}</CustomDivStyle>
        </CustomDivStyle>
    )
}

export default DetailContent;