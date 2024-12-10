import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';

interface MessageProps {
    message: string;
    user: string;
    isMe: boolean;
}

const Message: React.FC<MessageProps> = ({ message, user, isMe }) => {
    return (
        <CustomDivStyle display='flex' flexDirection='column' marginLeft={10}>
            {!isMe && <ParagraphStyle margin={'0px 0px 5px 0px'}>{user}</ParagraphStyle>}
            
            {
            isMe ? 
            <CustomDivStyle width={200} border={'1px solid #28D628'} borderRadius={'10px 0px 10px 10px'} padding={'10px'} backgroundColor={'#28D628'} whiteSpace={'normal'} wordWrap='break-word'><ParagraphStyle margin={'0px 0px 5px 0px'} color='white'>{message}</ParagraphStyle></CustomDivStyle>
            : 
            <CustomDivStyle width={200} border={'1px solid #E5E5EA'} borderRadius={'0px 10px 10px 10px'} padding={'10px'} backgroundColor={'#E5E5EA'} whiteSpace={'normal'} wordWrap='break-word'><ParagraphStyle margin={'0px 0px 5px 0px'}>{message}</ParagraphStyle></CustomDivStyle>
            }
            
        </CustomDivStyle>
    );
}

export default Message;
