import React from 'react';
import Message from './Message';
import { Avatar } from '@mui/material';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';

interface MessageItemProps {
    message: string;
    user: string;
    image?: string;
    isMe: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, user, image, isMe }) => {
    let justifyContentValue = isMe ? 'flex-end' : '';

    return (
        <CustomDivStyle display='flex' marginBottom={10} justifyContent={justifyContentValue}>
            {!isMe && <Avatar src={image} />} 
            <Message message={message} user={user} isMe={isMe}/>
        </CustomDivStyle>
    );
}

export default MessageItem;
