import React, { useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { Slider } from '@mui/material';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import { VolumeDown } from '@mui/icons-material';
import './UserInfoStyle.css';
import ModalContainer from '../../../Common/module/modal/Modal';
import UserDetailInfo from './UserDetailInfo';
import CustomAvatar from '../../../Common/Component/etc/CustomAvatar';

interface UserInfoItemProps {
    userName: User;
}

interface User {
    user: string,
    memberNo: number,
    profile: string
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ userName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <ModalContainer
                height={550}
                width={559}
                content={'스터디원 상세보기'}
                subContent={
                    <UserDetailInfo userName={userName}/>
                }
                rightbtnBorderColor=""
                rightbtnContent=""
                rightbtnTextColor=""
                isShowBtn={false}
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
            />

            <CustomDivStyle padding={'0px 10px'}>
                <CustomDivStyle padding={'10px 10px'} display='flex' alignItems='center' flex={'auto'}>
                    <CustomAvatar cursor='pointer' image={userName.profile} onClick={openModal}/>
                    <CustomDivStyle width={100} overflow='hidden'>
                        <ParagraphStyle margin={'0px 10px'}>{userName.user}</ParagraphStyle>
                    </CustomDivStyle>
                    {/* <VolumeDown />
                    <CustomDivStyle width={'40%'} margin={'0px 10px'}>
                        <Slider aria-label="Volume" />
                    </CustomDivStyle> */}
                </CustomDivStyle>
                <hr className='horizontal_rule'></hr>
            </CustomDivStyle>
        </>
    );
}

export default UserInfoItem;