import React, { useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import StudyViewBtn from './StudyViewBtn';
import ModalContainer from '../../../Common/module/modal/Modal';
import AuthorityDelegate from './AuthorityDelegate';
import ExpelReview from './ExpelReview';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { postData } from '../../../Api';
import { useUser } from '../../../Common/UserContext';

interface ControlBtnProps {
    isOwner: boolean;
    isLogin: boolean;
    isJoin: boolean;
    groupName: string;
    Friends: Friend[];
    groupJoin: () => any;
}

interface Friend {
    member: string;
    studyGroupAuth: string;
    memberNo: number;
    profile: string;
}

const ControlBtn: React.FC<ControlBtnProps> = ({ isOwner, isLogin, groupName, Friends, isJoin, groupJoin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReivewModalOpen, setIsReivewModalOpen] = useState(false);
    const [reviewContent, setReviewContent] = useState<string | null>('');
    const [starPoint, setStarPoint] = useState<number | null>(2);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openRevieModal = () => setIsReivewModalOpen(true);
    const closeRevieModal = () => setIsReivewModalOpen(false);

    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const baseUrl = process.env.REACT_APP_BASE_URL || window.location.origin;


    const kickMember = async (memberNo: number | undefined) => {
        if(memberNo == undefined) return;

        const data = {
            memberNo: memberNo,
            studyNo: id
        }

        try {
            const response = await postData(`/study/studyJoin/kick`, data);
            if (response) {
                console.log('POST 응답:', response);
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const writeReview = async () => {
        try {
            const data = {
                starPoint: starPoint,
                content: reviewContent
            }

            const response = await postData(`/study/review/write?id=${id}`, data);
            console.log('POST 응답:', response);

            if(response) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const delegateData = async () => {
        try {
            if (selectedIndex != null) {
                const data = {
                    memberNo: user?.memberNo,
                    delegateMemberNo: Friends[selectedIndex].memberNo,
                    studyNo: id
                }

                const response = await postData(`/study/studyJoin/delegate`, data);
                if(response) {
                    if(await writeReview()) {
                        await kickMember(user?.memberNo);
                    }
                }
            } else {
                if(await writeReview()) {
                    await kickMember(user?.memberNo);
                }
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <CustomDivStyle display='flex' justifyContent='flex-end'>
            <ModalContainer
                height={750}
                width={559}
                content={'그룹 회원 방장 위임'}
                subContent={
                    <AuthorityDelegate myFriends={Friends} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                }
                rightbtnBorderColor="lightgreen"
                rightbtnContent="확인"
                rightbtnTextColor="lightgreen"
                isShowBtn={true}
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
                onOk={() => { closeModal(); openRevieModal(); }}
            />

            <ModalContainer
                height={600}
                width={559}
                content={'탈퇴리뷰'}
                subContent={
                    <ExpelReview groupName={groupName} reviewContent={reviewContent} setReviewContent={setReviewContent} starPoint={starPoint} setStarPoint={setStarPoint} />
                }
                rightbtnBorderColor="lightgreen"
                rightbtnContent="작성"
                rightbtnTextColor="lightgreen"
                isShowBtn={true}
                isOpen={isReivewModalOpen} // 모달 열림 상태 전달
                onClose={closeRevieModal} // 모달 닫기 메서드 전달
                onOk={() => { closeRevieModal(); delegateData(); navigate('/study'); }}
            />

            {
                isLogin && isJoin ?
                    <>
                        <StudyViewBtn content='공유하기' image={`${process.env.PUBLIC_URL}/Share.png`} border='1px solid #E2E2E2' clickEvent={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)} />
                        <StudyViewBtn content='캘린더' image={`${process.env.PUBLIC_URL}/Calendar.png`} border='1px solid #E2E2E2' clickEvent={() => { navigate(`/study/calendar/${id}`) }} />
                        <StudyViewBtn content='스터디룸' image={`${process.env.PUBLIC_URL}/StudyRoom.png`} border='1px solid #E2E2E2' clickEvent={() => { navigate(`/study/studyroom/${id}`) }} />
                        <StudyViewBtn content='탈퇴' image={`${process.env.PUBLIC_URL}/Exit.png`} backgroundColor='#FE6161' border='1px solid #FE6161' color='white' clickEvent={isOwner && Friends.length > 1 ? openModal : openRevieModal} />
                    </>
                    :
                    <StudyViewBtn content='참여' image={`${process.env.PUBLIC_URL}/Join.png`} backgroundColor='#3FC229' border='1px solid #3FC229' color='white' clickEvent={groupJoin} />
            }
        </CustomDivStyle>
    );
}

export default ControlBtn;
