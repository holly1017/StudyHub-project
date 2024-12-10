import React, { useEffect, useState } from 'react';
import './component/CalendarSectionStyle.css';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import CalendarSection from './component/CalendarSection';
import DayEventInfoSection from './component/DayEventInfoSection';
import { getData, postData } from '../../Api';
import { useParams } from 'react-router-dom';
import { useUser } from '../../Common/UserContext';
import { DateClickArg } from '@fullcalendar/interaction';

interface StudyCalendarProps {
}

interface eventData {
    id: number;
    title: string;
    start: string;
    end: string;
}

interface DayEventInfos {
    id: number;
    content: string;
}

const StudyCalendar: React.FC<StudyCalendarProps> = () => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [curDate, setCurDate] = useState<string>();
    const [content, setContent] = useState<DayEventInfos[]>([]);
    const [eventList, setEventList] = useState<eventData[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const {id} = useParams();
    const { user } = useUser();

    const callbackForContent = (data:DayEventInfos[]) => {
        setContent([...data]);
    }

    const reqData = async () => {
        try {
            const response = await getData(`/calendar/list?id=${id}`);
            console.log('POST 응답:', response);
            setEventList(response);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const reqDeleteData = async (calendarNo:number) => {
        try {
            const response = await getData(`/calendar/list/delete?studyId=${id}&calendarId=${calendarNo}`);
            console.log('POST 응답:', response);
            reqData();
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const reqWriteData = async (value:number, data:any) => {
        try {
            const response = await postData(`/calendar/write?id=${value}&memberNo=${user?.memberNo}`, data);
            console.log('POST 응답:', response);

            if(response) {
                reqData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }
    
    useEffect(() => {
        reqData();
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sectionHide = (): boolean => {
        if (windowWidth > 1550) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <CustomDivStyle display='flex' height={900} marginTop={10} marginBottom={10}>
            { sectionHide() && <DayEventInfoSection date={date} content={content} writeEvent={reqWriteData} reqDeleteData={reqDeleteData} curDate={curDate}/> }
            <CalendarSection eventList={eventList} setDate={setDate} setContent={callbackForContent} date={date} content={content} writeEvent={reqWriteData} reqDeleteData={reqDeleteData} curDate={curDate} setCurDate={setCurDate}/>
        </CustomDivStyle>
    );
}

export default StudyCalendar;