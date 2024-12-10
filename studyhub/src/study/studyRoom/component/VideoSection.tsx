import React, { useEffect, useRef, useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import OptionBar from './OptionBar';
import Chatting from './Chatting';
import { StreamManager } from 'openvidu-browser';

interface ChatInfo {
    message: string;
    user: string;
    isMe: boolean;
    profile: string;
}

interface User {
    user: string,
    memberNo: number,
    profile: string
}

interface VideoSectionProps {
    infoSectionHide: boolean;
    chattingSectionHide: boolean;
    userName: User[];
    reqUserName: string[];
    chatArr: ChatInfo[];
    message: string;
    setMessage: (value:string) => any;
    sendMessage: () => any;
    startDisplayStream: ()=>any;
    streamManager?: StreamManager;
    isStream: boolean;
    turnOffStream: () => any;
}

const VideoSection: React.FC<VideoSectionProps> = ({ infoSectionHide, chattingSectionHide, userName, reqUserName, chatArr, message, setMessage, sendMessage, startDisplayStream, streamManager, isStream, turnOffStream }) => {
    const [displayVideo, setDisplayVideo] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (streamManager && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    const changeDisplayVideo = () => {
        setDisplayVideo(!displayVideo);
    }

    useEffect(() => {
        setDisplayVideo(true);
    }, [chattingSectionHide])

    return (
        <CustomDivStyle display='flex' flexDirection='column' minWidth={768} width={'62%'}>
            <CustomDivStyle>
                {
                    displayVideo ?
                        <video width={'100%'} height={700} autoPlay playsInline controls ref={videoRef}/>
                        :
                        <Chatting width={'100%'} height={700} chattingWidth={640} chatArr={chatArr} message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                }
            </CustomDivStyle>
            <OptionBar infoSectionHide={infoSectionHide} chattingSectionHide={chattingSectionHide} userName={userName} reqUserName={reqUserName} clickEvent={changeDisplayVideo} startDisplayStream={startDisplayStream} isStream={isStream} turnOffStream={turnOffStream}/>
        </CustomDivStyle>
    );
}

export default VideoSection;