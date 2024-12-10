import React from 'react';
import CustomButton from '../../../Component/button/CustomButton';

interface CustomButtonProps {
    textColor: string,
    borderColor: string,
    content: string,
    method: ()=> any
}

const ModalButton : React.FC<CustomButtonProps> = ({textColor, borderColor, content, method}) => {
    return(
        <CustomButton width='93px' height='29px' textColor={textColor} borderWidth={2} borderStyle='solid' borderColor={borderColor} backgroundColor='white' borderRadius={6} fontSize={15} fontWeight={600} content={content} sendMethod={method}></CustomButton>
    )
}

export default ModalButton