import Modal from "@mui/material/Modal";
import * as React from 'react';
import { ButtonArea, ContentFont, ModalBox, SubContentFont } from './ModalStyle';
import ModalButton from "./component/ModalButton";
import CustomDivStyle from '../../Component/etc/CustomDivStyle';

/*
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    -> 모달 열림상태, 모달 닫기 메소드 파라미터로 넘기기 (isOpen, onClose)
*/

interface ModalProps {
    height: number | string;
    width: number | string;
    content: string;
    subContent: React.ReactNode;
    rightbtnTextColor: string;
    rightbtnBorderColor: string;
    rightbtnContent: string;
    isShowBtn?: boolean;
    isOpen: boolean; // 모달 열림 상태
    onClose: () => void; // 모달 닫기 메서드
    onOk ?: () => any;
}

const ModalContainer: React.FC<ModalProps> = ({
    height,
    width,
    content,
    subContent,
    rightbtnContent,
    rightbtnBorderColor,
    rightbtnTextColor,
    isShowBtn = true,
    isOpen,
    onClose,
    onOk = onClose
}) => {
    return (
        <div>
            <Modal
                open={isOpen} // 모달 열림 상태
                onClose={onClose} // 모달 닫기 메서드
            >
                <ModalBox width={width} height={height}>
                    <ContentFont>{content}</ContentFont>
                    <SubContentFont>
                        <CustomDivStyle display='flex' justifyContent='center'>{subContent}</CustomDivStyle>
                    </SubContentFont>
                    <CustomDivStyle marginBottom={30}>
                        <ButtonArea>
                            <ModalButton textColor={"black"} borderColor={"black"} content={"창 닫기"} method={onClose} />
                            { isShowBtn && <ModalButton textColor={rightbtnTextColor} borderColor={rightbtnBorderColor} content={rightbtnContent} method={onOk} /> }
                        </ButtonArea>
                    </CustomDivStyle>
                </ModalBox>
            </Modal>
        </div>
    )
}

export default ModalContainer;
