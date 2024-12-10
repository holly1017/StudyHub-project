import React, { useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import UpdateDeleteGroup from '../../../Common/module/etc/UpdateDeleteGroup';
import HeadCount from './HeadCount';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import ModalContainer from '../../../Common/module/modal/Modal';
import UserExpel from './UserExpel';
import { useNavigate, useParams } from 'react-router-dom';
import CustomImageStyle from './CustomImageStyle';
import { getData } from '../../../Api';

interface MainTitleProps {
    isOwner: boolean;
    isLogin: boolean;
    hashTags: string[];
    groupName: string;
    titleName: string;
    image: string;
    curHeadCnt: number;
    maxHeadCnt: number;
    Friends: Friend[];
    joinReq: joinReq[];
    acceptMember: (memberNo:number)=>any;
    refuseMember: (memberNo:number)=>any;
    kickMember: (memberNo:number)=>any;
}

interface joinReq {
    id: number;
    member: string;
    memberNo: number;
    profile: string;
}

interface Friend {
    member: string;
    studyGroupAuth: string;
    memberNo: number;
    profile: string;
}


const MainTitle: React.FC<MainTitleProps> = ({ isOwner, isLogin, hashTags, groupName, titleName, image, curHeadCnt, maxHeadCnt, Friends, joinReq, acceptMember, refuseMember, kickMember }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const reqData = async() => {
        try {
            const response = await getData(`/study/list/delete?id=${id}`);
            navigate('/study');
            console.log('POST 응답:', response);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    return (
        <>
            <ModalContainer
                height={750}
                width={559}
                content={'그룹 회원 리스트'}
                subContent={
                    <UserExpel isOwner={isOwner} myFriends={Friends} joinReq={joinReq} acceptMember={acceptMember} refuseMember={refuseMember} kickMember={kickMember}/>
                }
                rightbtnBorderColor=""
                rightbtnContent=""
                rightbtnTextColor=""
                isShowBtn={false}
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
            />

            {
                isOwner && isLogin ?
                    <CustomDivStyle display='flex' justifyContent='flex-end' margin={'20px 0px'}>
                        <UpdateDeleteGroup modifyMethod={() => { navigate(`/study/modify/${id}`) }} deleteMethod={() => { reqData() }} />
                    </CustomDivStyle>
                    :
                    <br></br>
            }

            <CustomDivStyle border='1px solid black' borderRadius={15} width={'99%'} overflow='hidden'>
                <CustomImageStyle
                    src={image[0] != null ? image : `${process.env.PUBLIC_URL}/이미지.png`}
                    alt='Background' />
            </CustomDivStyle>
            <br></br>
            <CustomDivStyle display='flex' flexWrap='wrap'>
                {
                    hashTags.map((item, index) => (
                        <ParagraphStyle color='blue' margin='0px 10px'>#{item}</ParagraphStyle>
                    ))
                }
            </CustomDivStyle>
            <CustomDivStyle display='flex' justifyContent='space-between'>
                <CustomDivStyle display='flex' alignItems='center'>
                    <ParagraphStyle fontSize={21} fontWeight={900} margin={0}>[{groupName}] {titleName}</ParagraphStyle>
                </CustomDivStyle>
                <HeadCount curHeadCnt={curHeadCnt} maxHeadCnt={maxHeadCnt} clickEvent={openModal} />
            </CustomDivStyle>
        </>
    );
}

export default MainTitle;
