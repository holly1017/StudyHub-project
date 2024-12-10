import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';
import './CalendarSectionStyle.css';
import CalendarDayEventItem from './CalendarDayEventItem';
import { Box, Drawer } from '@mui/material';
import DayEventInfoSection from './DayEventInfoSection';

interface Event {
    id: number;
    title: string;
    date?:string;
    start: string;
    end: string;
}

interface DayEventInfos {
    id: number;
    content: string;
}

interface CalendarSectionProps {
    eventList: Event[];
    setDate: (date: string) => any;
    setContent: (contentArr: DayEventInfos[]) => any;
    date: string;
    content: DayEventInfos[];
    writeEvent: (value:number, data:any)=>any;
    reqDeleteData: (value:number) => any;
    curDate: string | undefined;
    setCurDate: (value:string)=> any;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ eventList, setDate, setContent, date, content, writeEvent, reqDeleteData, curDate, setCurDate }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setClickContent(today);
    }, []);

    const convertEventType = (data:Event[]) => {
        return  eventList.map((data) => ({
            title: data.title,
            date: data.date, 
            start: data.start,
            end: data.end,
        }));
    }

    const onDateClick = (arg: DateClickArg) => {
        setCurDate(arg.dateStr);
        if(curDate != undefined) {
            setClickContent(curDate);
        } else {
            setClickContent(arg.dateStr);
        }
    };

    const setClickContent = (date: string) => {
        setDate(date);

        const selectedDateEvents: DayEventInfos[] = [];

        eventList.forEach(event => {
            const eventStart = event.start ? new Date(event.start) : null;
            const eventEnd = event.end ? new Date(event.end) : null;
            const eventDate = event.date ? event.date : null;
            const clickedDate = new Date(date);

            if (eventStart && eventEnd) {
                if (clickedDate >= eventStart && clickedDate < eventEnd) {
                    selectedDateEvents.push({id: event.id, content:event.title});
                }
            } else if (eventStart && !eventEnd) {
                if (clickedDate >= eventStart) {
                    selectedDateEvents.push({id:event.id, content:event.title});
                }
            } else if (!eventStart && eventEnd) {
                if (clickedDate <= eventEnd) {
                    selectedDateEvents.push({id:event.id, content:event.title});
                }
            } else if (eventDate) {
                if (date === eventDate) {
                    selectedDateEvents.push({id:event.id, content:event.title});
                }
            }
        });

        setContent(selectedDateEvents);
    };

    const eventContent = (eventInfo: EventContentArg) => {
        return (
            <CalendarDayEventItem eventInfo={eventInfo} />
        );
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box width={350} role="presentation">
            <DayEventInfoSection date={date} content={content} width={'99%'} writeEvent={(value:number, data:any) => {writeEvent(value, data); setOpen(false)}} reqDeleteData={(value:number) => {reqDeleteData(value); setOpen(false);}} curDate={curDate}/>
        </Box>
    );
    return (
        <>
            <FullCalendar
                locale='kr'
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={convertEventType(eventList)}
                eventContent={eventContent}
                dateClick={onDateClick}
                dayMaxEventRows={true}
                selectable={true}
                editable={true}
                customButtons={{
                    hamburger: {
                        text: '≡',
                        click: toggleDrawer(true)
                    }
                }}
                headerToolbar={{
                    left: 'hamburger prev',
                    center: 'title',
                    right: 'next'
                }}
            />
            
            <Drawer open={open} anchor={'left'} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}

export default CalendarSection;