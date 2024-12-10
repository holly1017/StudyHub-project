import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import RequestMonitorMessage from './RequestMonitorMessage';


interface RequestMonitorProps {
    userName: string[];
}

const RequestMonitor: React.FC<RequestMonitorProps> = ({ userName }) => {
    return (
        <CustomDivStyle display='flex' width={'100%'} minWidth={300} height={500} border='1px solid #E5E7ED' borderRadius={3}>
            <CustomDivStyle overflow='auto'>
                {
                    userName.map((item, index) => (
                        <RequestMonitorMessage userName={item} />
                    ))
                }
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default RequestMonitor;
