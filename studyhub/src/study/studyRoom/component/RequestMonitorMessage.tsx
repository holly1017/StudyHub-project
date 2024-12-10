import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { Avatar } from '@mui/material';
import CustomButton from '../../../Common/Component/button/CustomButton';
import './RequestMonitorMessageStyle.css';

interface RequestMonitorMessageProps {
    userName: string;
}

const RequestMonitorMessage: React.FC<RequestMonitorMessageProps> = ({ userName }) => {
    return (
        <CustomDivStyle padding={10}>
            <CustomDivStyle display='flex'>
                <Avatar />
                <CustomDivStyle padding={'0px 10px'} wordBreak='break-all'>
                    {userName}께서 화면공유를 요청하셨습니다.
                </CustomDivStyle>
            </CustomDivStyle>
            <CustomDivStyle display='flex' justifyContent='flex-end' marginRight={10}>
                <CustomButton borderWidth={1} borderColor='#28D628' borderStyle='solid' backgroundColor='#28D628' textColor='white' content='확인' />
            </CustomDivStyle>
            <hr className='horizontal_rule'></hr>
        </CustomDivStyle>
    );
}

export default RequestMonitorMessage;
