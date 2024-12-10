import React, { useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import PostPageBtn from '../../../Common/Component/button/PostPageBtn';
import ModalContainer from '../../../Common/module/modal/Modal';
import DayEventWrite from './DayEventWrite';

interface DayEventInfoHeadProps {
    date: string;
    writeEvent: (data:any)=>any;
}

const DayEventInfoHead: React.FC<DayEventInfoHeadProps> = ({ date, writeEvent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stDate, setStDate] = useState<string>('');
    const [edDate, setEdDate] = useState<string>('');
    const [stTime, setStTime] = useState<string>('');
    const [edTime, setEdTime] = useState<string>('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const write = () => {
        if(title == "" || content == "" || stDate == "" || edDate == "") {
            alert("시간을 제외한 모든 항목을 작성해주세요.");
            return;
        }

        if(new Date(stDate) > new Date(edDate)) {
            alert("시작일과 종료일을 확인해주세요.");
            return;
        }

        const data = {
            title: title,
            content: content,
            stDate: stDate,
            edDate: edDate,
            stTime: stTime,
            edTime: edTime
        }

        writeEvent(data);
        closeModal();
    }

    return (
        <>
            <ModalContainer
                height={750}
                width={559}
                content={'일정 작성'}
                subContent={
                    <DayEventWrite title={title} content={content} stDate={stDate} edDate={edDate} stTime={stTime} edTime={edTime} setTitle={setTitle} setContent={setContent} setStDate={setStDate} setEdDate={setEdDate} setStTime={setStTime} setEdTime={setEdTime}/>
                }
                rightbtnBorderColor=""
                rightbtnContent="등록"
                rightbtnTextColor=""
                isShowBtn={true}
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
                onOk={()=>{write();}}
            />

            <CustomDivStyle display='flex' justifyContent='space-between' margin={'10px 20px'}>
                <ParagraphStyle fontSize={20} fontWeight={900} margin={0}>{date}</ParagraphStyle>
                <PostPageBtn content='새 일정 등록' onClick={openModal} />
            </CustomDivStyle>
        </>
    );
}

export default DayEventInfoHead;