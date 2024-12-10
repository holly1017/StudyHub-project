import React, { useEffect, useRef, useState } from 'react';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import VideoSection from './component/VideoSection';
import ChatAndOtherSection from './component/ChatAndOtherSection';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import { getData, postData } from '../../Api';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import axios from 'axios';
import { useUser } from '../../Common/UserContext';

interface StudyRoomProps { }

interface Chat {
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

const reqUserNameArr = ['사용자1'];

// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const APPLICATION_SERVER_URL = 'https://demos.openvidu.io/';

const StudyRoom: React.FC<StudyRoomProps> = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [stompClient, setStompClient] = useState<any>(null);
    const [message, setMessage] = useState<string>('');
    const [chatArr, setChatArr] = useState<Chat[]>([]);
    const [userNameArr, setUserNameArr] = useState<User[]>([]);
    const { id } = useParams();
    const { user } = useUser();
    let userId = { nickName: user?.nickName, memberNo: user?.memberNo, profile: user?.profile };
    const [isStream, setIsStream] = useState<boolean>(false);
    const [myUserName, setMyUserName] = useState<string>('Participant' + Math.floor(Math.random() * 100));
    const [session, setSession] = useState<Session | undefined>(undefined);
    const [subscribers, setSubscribers] = useState<StreamManager | undefined>(undefined);


    const publisher = useRef<Publisher | undefined>();
    const newSession = useRef<Session | undefined>();
    const OV = useRef<OpenVidu | null>(null);
    const displayMediaStream = useRef<MediaStream>();

    useEffect(() => {
        window.addEventListener('beforeunload', leaveSession);
        return () => {
            window.removeEventListener('beforeunload', leaveSession);
        };
    }, []);

    const turnOffStream = () => {
        setIsStream(false);
        displayMediaStream.current?.getTracks().forEach(track => track.stop());
    }

    const leaveSession = () => {
        if (session) {
            session.disconnect();
        }
        setSession(undefined);
        setSubscribers(undefined);
        publisher.current = undefined;
        setMyUserName('Participant' + Math.floor(Math.random() * 100));
        setIsStream(false);
        displayMediaStream.current?.getTracks().forEach(track => track.stop());
    };

    const joinSession = async () => {
        if (!OV.current) {
            OV.current = new OpenVidu();
        }

        if (OV.current != null) newSession.current = OV.current.initSession();
        setSession(newSession.current);

        if (newSession.current != undefined) newSession.current.on('streamCreated', (event) => {
            if (newSession.current != undefined) {
                const subscriber = newSession.current.subscribe(event.stream, undefined);
                setSubscribers(subscriber);
                setIsStream(false);
                displayMediaStream.current?.getTracks().forEach(track => track.stop());
            }
        });

        if (newSession.current != undefined) newSession.current.on('streamDestroyed', (event) => {
            const streamManager = event.stream.streamManager;
            setSubscribers(streamManager);
        });

        if (newSession.current != undefined) newSession.current.on('exception', (exception: any) => {
            console.warn(exception);
        });

        try {
            const token = await getToken();
            if (newSession.current != undefined) await newSession.current.connect(token, { clientData: myUserName });
        } catch (error: any) {
            console.error('There was an error connecting to the session:', error.code, error.message);
        }
    };

    const getToken = async () => {
        if (id != undefined) {
            const sessionId = await createSession(id);
            return await createToken(sessionId);
        }
        return null;
    };

    const createSession = async (sessionId: string) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    const createToken = async (sessionId: string) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    const startDisplayStream = async () => {
        try {
            // 화면 공유 요청
            displayMediaStream.current = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            // 화면 공유가 성공적으로 시작되면, OpenVidu에 퍼블리셔를 추가
            if (OV.current != null && newSession.current !== undefined) {
                const newPublisher = await OV.current.initPublisherAsync(undefined, {
                    videoSource: displayMediaStream.current.getVideoTracks()[0],
                    audioSource: displayMediaStream.current.getAudioTracks()[0],
                    publishAudio: true,
                    publishVideo: true,
                    resolution: '1000x700',
                    frameRate: 30,
                    insertMode: 'APPEND',
                    mirror: false,
                });

                if (newSession.current !== undefined && publisher.current !== undefined) {
                    // 기존 퍼블리셔를 unpublish 하고 새로운 퍼블리셔를 publish
                    await newSession.current.unpublish(publisher.current);
                    publisher.current = undefined;
                    await newSession.current.publish(newPublisher);
                } else {
                    await newSession.current.publish(newPublisher);
                }

                setSubscribers(newPublisher);
                publisher.current = newPublisher;
                setIsStream(true);
            }
        } catch (error: any) {
            if (error.name === "NotAllowedError") {
                console.error("사용자가 화면 공유를 거부했습니다.");
            } else if (error.name === "NotFoundError") {
                console.error("사용 가능한 화면 캡처 장치가 없습니다.");
            } else {
                console.error("기타 오류:", error);
            }
        }
    }

    const handleSendMessage = () => {
        if (stompClient && stompClient.connected && message.length > 0) {
            stompClient.publish({
                destination: `/app/chat/send/${id}`,
                body: JSON.stringify({ message: message, user: userId.nickName, profile: userId.profile }),
            });

            setMessage('');
        }
    };

    const reqData = async () => {
        try {
            const response = await getData(`/chatting/list?id=${id}`);
            console.log('POST 응답:', response);

            const updatedChatArr = response.map((chat: { user: string; isMe: boolean }) => {
                if (chat.user === userId.nickName) {
                    return { ...chat, isMe: true };
                }
                return chat;
            });

            setChatArr(updatedChatArr);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqLeaveData = async () => {
        try {
            const data = {
                message: '퇴장입니다.',
                user: userId.nickName,
                memberNo: userId.memberNo
            }
            console.log(data);
            const response = await postData(`/chatting/leave?id=${id}`, data);
            console.log('POST 응답:', response);
            leaveSession();
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    useEffect(() => {
        console.log('Updated userNameArr: ', userNameArr);
    }, [userNameArr]);

    useEffect(() => {
        // const socket = new SockJS('http://localhost:8080/chat');
        const socket = new SockJS('https://cjy951213.duckdns.org:3131/chat');
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            onConnect: () => {
                console.log('Connected to STOMP server');
                setStompClient(client);

                // STOMP 연결 성공 시 상태 확인
                if (client.connected) {
                    console.log('STOMP connection successful');
                } else {
                    console.error('STOMP client not connected');
                }

                if (id) {
                    client.subscribe(`/topic/chat/${id}`, (message) => {
                        const data = JSON.parse(message.body);
                        
                        switch (data.chatType) {
                            case 'SEND':
                                if (data.user === userId.nickName) {
                                    data.isMe = true;
                                }
                                setChatArr((prevChatArr) => [...prevChatArr, data]);
                                break;
                            case 'ENTER':
                                setUserNameArr((prevArr) => {
                                    if (!prevArr.find((item) => item.user === data.user && item.memberNo === data.memberNo)) {
                                        return [...prevArr, { user: data.user, memberNo: data.memberNo, profile: data.profile }];
                                    }
                                    return prevArr;
                                });

                                client.publish({
                                    destination: `/app/chat/arcenter/${id}`,
                                    body: JSON.stringify({ message: `${userId.nickName} has entered`, user: userId.nickName, memberNo: userId.memberNo, profile: userId.profile }),
                                });
                                break;
                            case 'LEAVE':
                                console.log(data);
                                setUserNameArr((prevArr) => {
                                    return prevArr.filter((item) => item.user != data.user);
                                });
                                break;
                            case 'ARCENTER':
                                setUserNameArr((prevArr) => {
                                    if (!prevArr.find((item) => item.user === data.user && item.memberNo === data.memberNo)) {
                                        return [...prevArr, { user: data.user, memberNo: data.memberNo, profile: data.profile }];
                                    }
                                    return prevArr;
                                });
                                break;
                        }
                    });

                    client.publish({
                        destination: `/app/chat/enter/${id}`,
                        body: JSON.stringify({ message: `${userId.nickName} has entered`, user: userId.nickName, memberNo: userId.memberNo, profile: userId.profile }),
                    });
                    console.log('Entered message sent');
                }
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            },
        });

        client.activate();

        return () => {
            reqLeaveData();
            if (client) {
                client.deactivate(); // 클라이언트 연결 종료
                console.log('Disconnected from STOMP server');
            }
        };
    }, [id]);


    useEffect(() => {
        reqData();
    }, [id]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        const initializeSession = async () => {
            await joinSession();
        };

        window.addEventListener('resize', handleResize);
        initializeSession();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const infoSectionHide = (): boolean => windowWidth > 1700;
    const chattingSectionHide = (): boolean => windowWidth > 1100;

    return (
        <CustomDivStyle display="flex" width="100%" marginTop={10} marginBottom={10} minWidth={768}>
            <VideoSection
                infoSectionHide={infoSectionHide()}
                chattingSectionHide={chattingSectionHide()}
                userName={userNameArr}
                reqUserName={reqUserNameArr}
                chatArr={chatArr}
                message={message}
                setMessage={setMessage}
                sendMessage={handleSendMessage}
                startDisplayStream={startDisplayStream}
                streamManager={subscribers}
                isStream={isStream}
                turnOffStream={turnOffStream}
            />

            <ChatAndOtherSection
                chatArr={chatArr}
                userName={userNameArr}
                reqUserName={reqUserNameArr}
                infoSectionHide={infoSectionHide()}
                chattingSectionHide={chattingSectionHide()}
                message={message}
                setMessage={setMessage}
                sendMessage={handleSendMessage}
            />
        </CustomDivStyle>
    );
};

export default StudyRoom;
