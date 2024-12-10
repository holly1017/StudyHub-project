import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import RequestMonitor from './RequestMonitor';
import UserInfo from './UserInfo';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import './InfoSectionStyle.css';

interface InfoSectionProps {
    userName: User[];
    reqUserName: string[];
}

interface User {
    user: string,
    memberNo: number,
    profile: string
}

const InfoSection: React.FC<InfoSectionProps> = ({ userName, reqUserName }) => {
    return (
            <CustomDivStyle width={"50%"} minWidth={300} display='flex' flexDirection='column' justifyContent='' marginLeft={10}>
                 <ParagraphStyle margin={0} fontSize={18}>사용자 리스트</ParagraphStyle>
                 <hr className='horizontal_rule_custom'></hr>
                
                <UserInfo userName={userName} />
                <br></br>
                {/* <RequestMonitor userName={reqUserName} /> */}
            </CustomDivStyle>
    );
}

export default InfoSection;