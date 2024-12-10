import React, { useEffect, useRef } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import MessageItem from './MessageItem';
import CustomInput from '../../../Common/Component/input/CustomInput';
import CustomButton from '../../../Common/Component/button/CustomButton';

interface ChatInfo {
    message: string;
    user: string;
    isMe: boolean;
    profile: string;
}

interface ChattingProps {
    chatArr: ChatInfo[];
    width?: string | number;
    height?: string | number;
    chattingWidth?: string | number;
    message: string;
    setMessage: (value: string) => any;
    sendMessage: () => any;
}

const Chatting: React.FC<ChattingProps> = ({
    chatArr,
    width = '50%',
    height = 808,
    chattingWidth = 250,
    message,
    setMessage,
    sendMessage
}) => {
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const isAtBottom = () => {
        if (!chatContainerRef.current) return false;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        return scrollTop + clientHeight >= scrollHeight - 80;
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
            setMessage('');
        }
    };

    useEffect(() => {
        if (isAtBottom() && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatArr]);

    return (
        <CustomDivStyle
            width={width}
            height={height}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            border='1px solid #E5E7ED'
            borderRadius={10}
            padding={5}
            minWidth={310}
        >
            <CustomDivStyle
                overflow='auto'
                padding={'0px 10px'}
                ref={chatContainerRef}
            >
                {chatArr.map((item, index) => (
                    <MessageItem key={index} message={item.message} user={item.user} isMe={item.isMe} image={item.profile}/>
                ))}
            </CustomDivStyle>

            <CustomDivStyle display='flex' marginTop={10}>
                <CustomInput
                    placeholderText='채팅을 입력해주세요'
                    width={chattingWidth}
                    height={'100%'}
                    isMultiLine={true}
                    minRows={3}
                    maxRows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <CustomDivStyle width={5}></CustomDivStyle>
                <CustomButton
                    width={'90%'}
                    height={'100%'}
                    flex='auto'
                    content='전송'
                    borderWidth={1}
                    borderStyle='solid'
                    borderColor='#737373'
                    sendMethod={sendMessage}
                />
            </CustomDivStyle>
        </CustomDivStyle>
    );
};

export default Chatting;
