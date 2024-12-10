import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';

interface StudyViewBtnProps {
    content: string;
    image: string;
    backgroundColor?: string;
    border?: string;
    color?: string;
    clickEvent?: ()=>any;
}

const StudyViewBtn: React.FC<StudyViewBtnProps> = ({ content, image, backgroundColor, border, color, clickEvent }) => {
    return (
        <CustomDivStyle backgroundColor={backgroundColor} border={border} width={63} height={73} borderRadius={20} display='flex' flexDirection='column' justifyContent='center' cursor='pointer' marginRight={10} onClick={clickEvent}>
            <CustomDivStyle display='flex' justifyContent='center' alignItems='center' marginBottom={10}>
                <img src={image}></img>
            </CustomDivStyle>
            <CustomDivStyle display='flex' justifyContent='center'>
                <ParagraphStyle margin={0} fontSize={11} color={color}>{content}</ParagraphStyle>
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default StudyViewBtn;