import React from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import ParagraphStyle from "../../Common/Component/etc/ParagraphStyle";

interface HeadProps {
    content: string;
    subContent?: string
}

const Head: React.FC<HeadProps> = ({content, subContent}) => {
    return (
        <CustomDivStyle marginLeft={10} marginTop={30}>
            <ParagraphStyle fontSize={28} fontWeight={900} margin={"0 0 0 0"}>{content}</ParagraphStyle> 
            <ParagraphStyle fontSize={13} fontWeight={900} margin={"5 0 0 0"} color="#857777">{subContent}</ParagraphStyle>
        </CustomDivStyle>
    )
}

export default Head;