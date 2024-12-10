import React from 'react';
import TitleContainer from "./UnderLineTitleStyle";

interface UnderLineTitleProps {
    content : string;
    width : number | string;
}

const UnderLineTitle : React.FC<UnderLineTitleProps> = ({content, width}) => {
    return (
        <TitleContainer width={width}>{content}</TitleContainer>
    )
}

export default UnderLineTitle;