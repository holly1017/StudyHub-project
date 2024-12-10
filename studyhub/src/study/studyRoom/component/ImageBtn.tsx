import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';

interface ImageBtnProps {
    image: string;
    backgroundColor?: string;
    border?: string;
    clickEvent?: ()=>any;
}

const ImageBtn: React.FC<ImageBtnProps> = ({ image, backgroundColor, border, clickEvent}) => {
    return (
        <CustomDivStyle backgroundColor={backgroundColor} border={border} width={63} height={73} borderRadius={20} display='flex' flexDirection='column' justifyContent='center' cursor='pointer' marginRight={10} onClick={clickEvent}>
            <CustomDivStyle display='flex' justifyContent='center' alignItems='center' marginBottom={10}>
                <img src={image}></img>
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default ImageBtn;