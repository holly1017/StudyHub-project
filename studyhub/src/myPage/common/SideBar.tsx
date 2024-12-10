import React, { useState } from "react";
import SideBarItem from "./SideBarItem";
import ModalContainer from "../../Common/module/modal/Modal";
import QuitModalContent from "../QuitModal/QuitModalContent";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Api";
import { useUser } from "../../Common/UserContext";

interface SideBarProps {
    selected: string;
}

const SideBar: React.FC<SideBarProps> = ({ selected }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logout } = useUser();

    const [pw, setPw] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const deleteMember = async () => {
        try {
            await sendData();
            logout();
            navigate("/");

        } catch(error) {
            console.log(error);
        }
    }

    const sendData = async () => {
        const payload = {
            id: user?.memberId,
            pw: pw
        }
        
        try {
            const response = await postData("/member/mypage/delete", payload)
            console.log(response)
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/* 모달 컴포넌트 추가 */}
            <ModalContainer 
                height={378} 
                width={559} 
                content="회원 탈퇴" 
                subContent={<QuitModalContent pw={pw} setPw={setPw}/>} 
                rightbtnBorderColor="red" 
                rightbtnContent="탈퇴" 
                rightbtnTextColor="red" 
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
                onOk={deleteMember}
            />
            
            <SideBarItem 
                icon={'info-icon.png'} 
                content={'내정보'} 
                selected={selected === '내정보'} 
                method={() => { navigate('/mypage/info') }} 
            />
            <br /><br />
            <SideBarItem 
                icon={'group-icon.png'} 
                content={'그룹관리'} 
                selected={selected === '그룹관리'} 
                method={() => { navigate('/mypage/group') }} 
            />
            <br /><br />    
            <SideBarItem 
                icon={'friend-icon.png'} 
                content={'친구관리'} 
                selected={selected === '친구관리'} 
                method={() => { navigate('/mypage/friend') }} 
            />
            <br /><br /> 
            <SideBarItem 
                icon={'point-icon.png'} 
                content={'포인트'} 
                selected={selected === '포인트'} 
                method={() => { navigate('/mypage/point') }} 
            />
            <br /><br /> 
            <SideBarItem 
                icon={'question-icon.png'} 
                content={'질문관리'} 
                selected={selected === '질문관리'} 
                method={() => { navigate('/mypage/question') }} 
            />
            <br /><br /> 
            <SideBarItem 
                icon={'quit-icon.png'} 
                content={'탈퇴'} 
                selected={selected === '탈퇴'} 
                method={openModal}
            />
        </div>
    );
}

export default SideBar;
