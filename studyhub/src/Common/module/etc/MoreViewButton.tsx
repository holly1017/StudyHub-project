import React from 'react';
import CustomButton from '../../Component/button/CustomButton';

interface MoreViewButtonProps {
    sendMethod?: () => any
}

const MoreViewButton : React.FC<MoreViewButtonProps> = ({sendMethod}) => {
    return(
        <CustomButton width='383px' height='46px' textColor='#898989' borderWidth={1} borderStyle='solid' borderColor='#898989' backgroundColor='white' borderRadius={0} fontSize={16} fontWeight={800} content='더보기' sendMethod={sendMethod}></CustomButton>
    )
}

export default MoreViewButton