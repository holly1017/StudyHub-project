import React, { useEffect, useRef } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import ReplyListComponent from '../../../Common/module/comment/ReplyListComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import UpdateDeleteGroup from '../../../Common/module/etc/UpdateDeleteGroup';
import './DayEventViewStyle.css';
import { useUser } from '../../../Common/UserContext';
import { getData } from '../../../Api';

interface Reply {
    id: number;
    user: string;
    content: string;
    parentId: number | null;
    dept: number;
    status: string;
    memberNo: number;
    profile: string;
}

interface DayEventViewProps {
    commentArr: Reply[];
    writer: string;
    content: string;
    comment: string;
    stDate: string;
    edDate: string;
    stTime: string;
    edTime: string;
    setComment: (value: string) => any;
    replyContent: string;
    setReplyContent: (value: string) => any;
    maxPage: number;
    reqDeleteData: () => any;
    page?: number;
    pageOnChange?: (event: React.ChangeEvent<unknown>, value: number) => any;
    insertReply: (parentId:number) => any;
    modifyReply: (replyNo:number) => any;
    deleteReply: (replyNo:number) => any;
    reqCommentData: ()=> any;
    calendarMemberNo: number;
}

const DayEventView: React.FC<DayEventViewProps> = ({ commentArr, writer, content, comment, setComment, replyContent, setReplyContent, stDate, edDate, stTime, edTime, maxPage, reqDeleteData, page, pageOnChange, insertReply,  modifyReply, deleteReply, reqCommentData, calendarMemberNo}) => {
    const { user } = useUser();
    const firstInit = useRef<boolean>(false);

    useEffect(() => {
        if(firstInit.current == true) {
            reqCommentData();
        }
    }, [page])

    useEffect(() => {
        firstInit.current = true;
    }, [])

    const reqReplyContent = async (replyNo: number) => {
        try {
            const response = await getData(`/study/reply?id=${replyNo}`);
            console.log('POST 응답:', response);
            setReplyContent(response);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };
    
    return (
        <CustomDivStyle width={'100%'} overflowX='auto' height={500}>
            <CustomDivStyle display='flex' alignItems='center'>
                <CalendarMonthIcon fontSize='large'></CalendarMonthIcon>
                <input type='date' className='input_style' value={stDate} readOnly />
                <ParagraphStyle margin={'10px 10px'} fontSize={18}> ~ </ParagraphStyle>
                <input type='date' className='input_style' value={edDate} readOnly />
            </CustomDivStyle>
            <CustomDivStyle display='flex' alignItems='center'>
                <AccessTimeIcon fontSize='large'></AccessTimeIcon>
                <input type='time' className='input_style' value={stTime} readOnly />
                <ParagraphStyle margin={'10px 10px'} fontSize={18}> ~ </ParagraphStyle>
                <input type='time' className='input_style' value={edTime} readOnly />
            </CustomDivStyle>
            <CustomDivStyle display='flex' alignItems='center' justifyContent='space-between' marginRight={10}>
                <CustomDivStyle display='flex' alignItems='center'>
                    <PersonOutlineIcon fontSize='large'></PersonOutlineIcon>
                    <ParagraphStyle margin={'10px 10px'}>{writer}</ParagraphStyle>
                </CustomDivStyle>
                { calendarMemberNo == user?.memberNo && <UpdateDeleteGroup modifyOption={false} modifyMethod={() => { }} deleteMethod={() => { reqDeleteData(); }} />}
            </CustomDivStyle>
            <hr></hr>
            <CustomDivStyle padding={10} minHeight={320} wordBreak='break-all'>
                {content}
            </CustomDivStyle>
            <hr></hr>
            <ReplyListComponent comment={commentArr} width={"100%"} commentRowsCnt={3} btnHeight={30} replyMethod={(parentId: number) => insertReply(parentId)} commentMethod={() => { insertReply(-1) }} 
                    modifyMethod={(replyNo:number) => { modifyReply(replyNo) }} deleteMethod={(replyId:number) => { deleteReply(replyId) }} content={comment} setContent={setComment} replyContent={replyContent} setReplyContent={setReplyContent} reqReplyContent={(id: number) => { reqReplyContent(id) }} maxPage={maxPage} page={page} pageOnChange={pageOnChange}/>
        </CustomDivStyle>
    );
}

export default DayEventView;