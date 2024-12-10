import React, { useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import CustomButton from '../../../Common/Component/button/CustomButton';
import ModalContainer from '../../../Common/module/modal/Modal';
import InviteFriend from '../../studyWrite/component/InviteFriend';
import { useNavigate } from 'react-router-dom';

interface PageButtonProps {
    isWritePage: boolean;
    sendMethod: () => any;
}

const PageButton: React.FC<PageButtonProps> = ({ isWritePage, sendMethod }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    let align = '';

    if (isWritePage) {
        align = 'space-between';
    } else {
        align = 'flex-end';
    }

    const myFriends = ['친구1', '친구1', '친구1', '친구1', '친구1', '친구1', '친구1', '친구1', '친구1', '친구1', '친구1', '친구1'];

    return (
        <>
            <ModalContainer
                height={750}
                width={559}
                content={'그룹 회원 초대'}
                subContent={
                    <InviteFriend myFriends={myFriends} />
                }
                rightbtnBorderColor=""
                rightbtnContent=""
                rightbtnTextColor=""
                isShowBtn={false}
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
            />

            <CustomDivStyle display='flex' justifyContent={align}>
                {isWritePage && <CustomButton width={150} height={60} textColor='black' borderWidth={0} borderStyle='none' borderColor='#DADADA' backgroundColor={'#DADADA'} borderRadius={10} fontSize={20} content='초대' fontWeight={600} sendMethod={openModal} />}
                <CustomButton width={150} height={60} textColor='white' borderWidth={0} borderStyle='none' borderColor='#212121' backgroundColor={'#212121'} borderRadius={10} fontSize={20} content='등록' fontWeight={600} sendMethod={sendMethod}/>
            </CustomDivStyle>
        </>
    );
}

export default PageButton;