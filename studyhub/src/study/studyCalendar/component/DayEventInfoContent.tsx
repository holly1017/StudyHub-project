import React, { useEffect, useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import ModalContainer from '../../../Common/module/modal/Modal';
import DayEventView from './DayEventView';
import { getData, postData } from '../../../Api';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../../Common/UserContext';

interface Reply {
    id: number;
    user: string;
    content: string;
    parentId: number;
    dept: number;
    status: string;
    memberNo: number;
    profile: string;
}

interface DayEventInfos {
    id: number;
    content: string;
}

interface DayEventInfoContentProps {
    content: DayEventInfos[];
    reqDeleteData: (value: number) => any;
    curDate: string | undefined;
}

const DayEventInfoContent: React.FC<DayEventInfoContentProps> = ({ content, reqDeleteData, curDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentData, setContentData] = useState('');
    const [calendarNo, setCalendarNo] = useState(0);
    const [writer, setWriter] = useState('');
    const [stDate, setStDate] = useState('');
    const [edDate, setEdDate] = useState('');
    const [stTime, setStTime] = useState('');
    const [edTime, setEdTime] = useState('');
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState<string>('');
    const [reply, setReply] = useState<string>('');
    const [commentArr, setCommentArr] = useState<Reply[]>([]);
    const [commentCount, setCommentCount] = useState(0);
    const [page, setPage] = useState(1);
    const [calendarMemberNo, setCalendarMemberNo] = useState(0);

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const reqCommentData = async () => {
        try {
            const response = await getData(`/calendar/reply/list?id=${id}&calendarId=${calendarNo}&page=${page - 1}&size=10&sort=replyNo,asc`);
            console.log('POST 응답:', response);
            setCommentArr(response.reply);
            setCommentCount(response.replyCount);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const insertReply = async (parentId: number) => {
        try {
            let contentData = parentId == -1 ? comment : reply;
            if(contentData == "") return;

            const data = {
                studyId: id,
                calendarId: calendarNo,
                parentId: parentId,
                content: contentData,
                memberNo: user?.memberNo
            }

            const response = await postData(`/calendar/reply/write`, data);
            console.log('POST 응답:', response);
            if (response) {
                parentId == -1 ? setComment('') : setReply('');
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const deleteReply = async (replyNo: number) => {
        try {
            const response = await getData(`/calendar/reply/list/delete?id=${replyNo}`);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const modifyReply = async (replyNo: number) => {
        try {
            if(reply == "") return;

            const data = {
                content: reply
            }

            const response = await postData(`/calendar/reply/list/update?id=${replyNo}`, data);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqViewData = async (value: number) => {
        try {
            const response = await getData(`/calendar/list/view?studyId=${id}&calendarId=${value}`);
            console.log('POST 응답:', response);

            setWriter(response.writer);
            setContentData(response.content);
            setStDate(response.start);
            setEdDate(response.end);
            setStTime(response.stTime);
            setEdTime(response.edTime);
            setCommentArr(response.reply);
            setCommentCount(response.replyCount);
            setCalendarMemberNo(response.calendarMemberNo);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const deleteData = () => {
        reqDeleteData(calendarNo);
        closeModal();
        navigate(`/study/calendar/${id}`);
        window.location.reload();
    }

    const openModal = (title: string, id: number) => {
        setCalendarNo(id);
        reqViewData(id);
        setTitle(title);
        setIsModalOpen(true);
    }

    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <ModalContainer
                height={800}
                width={559}
                content={title}
                subContent={
                    <DayEventView commentArr={commentArr} writer={writer} content={contentData} comment={comment} 
                    setComment={setComment} replyContent={reply} setReplyContent={setReply} 
                    stDate={stDate} edDate={edDate} stTime={stTime} edTime={edTime} maxPage={commentCount} 
                    reqDeleteData={deleteData} page={page} pageOnChange={handleChange}
                    insertReply={insertReply} 
                    modifyReply={modifyReply} 
                    deleteReply={deleteReply}
                    reqCommentData={reqCommentData}
                    calendarMemberNo={calendarMemberNo}/>
                }
                rightbtnBorderColor=""
                rightbtnContent=""
                rightbtnTextColor=""
                isShowBtn={false}
                isOpen={isModalOpen} // 모달 열림 상태 전달
                onClose={closeModal} // 모달 닫기 메서드 전달
            />
            <ParagraphStyle fontSize={20} fontWeight={900} margin={'0px 20px'}>일정</ParagraphStyle>
            <CustomDivStyle whiteSpace='nowrap' overflowX='hidden' overflowY='auto' marginRight={20} height={800}>
                <table>
                    {
                        content.length === 0 ? (
                            <ul>
                                <li>
                                    <ParagraphStyle fontSize={18} margin={0}>일정이 없습니다.</ParagraphStyle>
                                </li>
                            </ul>
                        ) : (
                            content.map((item, index) => (
                                <ul key={index}>
                                    <li>
                                        <ParagraphStyle fontSize={18} margin={0} cursor='pointer' hover={true} onClick={() => openModal(item.content, item.id)}>{item.content}</ParagraphStyle>
                                    </li>
                                </ul>
                            ))
                        )
                    }
                </table>
            </CustomDivStyle>
        </>
    );
}

export default DayEventInfoContent;