import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import Chatting from './Chatting';
import InfoSection from './InfoSection';

interface ChatInfo {
    message: string;
    user: string;
    isMe: boolean;
    profile: string;
}

interface ChatAndOtherSectionProps {
    chatArr: ChatInfo[];
    userName: User[];
    reqUserName: string[];
    infoSectionHide: boolean;
    chattingSectionHide: boolean;
    message: string;
    setMessage: (value:string) => any;
    sendMessage: () => any;
}

interface User {
    user: string,
    memberNo: number,
    profile: string
}

const ChatAndOtherSection: React.FC<ChatAndOtherSectionProps> = ({ chatArr, userName, reqUserName, infoSectionHide, chattingSectionHide, message, setMessage, sendMessage }) => {
    return (
        <CustomDivStyle display='flex' width={'35%'} marginLeft={10}>
            {chattingSectionHide && <Chatting chatArr={chatArr} message={message} setMessage={setMessage} sendMessage={sendMessage}/>}
            
            {infoSectionHide && <InfoSection userName={userName} reqUserName={reqUserName} />}
        </CustomDivStyle>
    );
}

export default ChatAndOtherSection;