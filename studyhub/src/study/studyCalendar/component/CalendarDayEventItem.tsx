import React from 'react';
import { Box } from '@mui/material';
import { EventContentArg } from '@fullcalendar/core';

interface CalendarDayEventItemProps {
    eventInfo: EventContentArg;
}

const CalendarDayEventItem: React.FC<CalendarDayEventItemProps> = ({ eventInfo }) => {
    const isAllDay = eventInfo.event.allDay;
    return (
        <Box
        width={'100%'}
        bgcolor={ isAllDay ? '#5A90FF' : '#FF8652'}
        borderRadius={'3px'}
        p={0.5}
        color={'#fff'}
        fontWeight={600}
        >
            {eventInfo.event.title}
        </Box>
    );
}

export default CalendarDayEventItem;