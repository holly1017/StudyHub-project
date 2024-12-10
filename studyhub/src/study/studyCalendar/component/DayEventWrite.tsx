import React, { useEffect, useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import UnderlineTextBox from '../../../Common/Component/input/UnderlineTextBox';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import CustomInput from '../../../Common/Component/input/CustomInput';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './DayEventWriteStyle.css';

interface DayEventWriteProps {
    title: string;
    content: string;
    stDate: string;
    edDate: string;
    stTime: string;
    edTime: string;
    setTitle: (value:string) => any;
    setContent: (value:string) => any;
    setStDate: (value:string) => any;
    setEdDate: (value:string) => any;
    setStTime: (value:string) => any;
    setEdTime: (value:string) => any;
}

const DayEventWrite: React.FC<DayEventWriteProps> = ({ title, content, stDate, edDate, stTime, edTime, setTitle, setContent, setStDate, setEdDate, setStTime, setEdTime }) => {
    const incrementDateByOneDay = (dateStr: string) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    }
    
    return (
        <CustomDivStyle>
            <UnderlineTextBox width={'100%'} value={title} changeValue={setTitle}/>
            <CustomDivStyle display='flex' alignItems='center' margin={'10px 0px'}>
                <CalendarMonthIcon fontSize='large'></CalendarMonthIcon>
                <input type='date' className='input_style' value={stDate} onChange={(e) => {setStDate(e.target.value)}}/>
                <ParagraphStyle margin={'10px 10px'} fontSize={18}> ~ </ParagraphStyle>
                <input type='date' className='input_style' value={edDate} onChange={(e) => {setEdDate(incrementDateByOneDay(e.target.value))}}/>
            </CustomDivStyle>
            <CustomDivStyle display='flex' alignItems='center' margin={'10px 0px'}>
                <AccessTimeIcon fontSize='large'></AccessTimeIcon>
                <input type='time' className='input_style' value={stTime} onChange={(e) => {setStTime(e.target.value)}}/>
                <ParagraphStyle margin={'10px 10px'} fontSize={18}> ~ </ParagraphStyle>
                <input type='time' className='input_style' value={edTime} onChange={(e) => {setEdTime(e.target.value)}}/>
            </CustomDivStyle>
            <CustomInput placeholderText='일정 내용을 입력하세요.' width={400} height={''} isMultiLine={true} minRows={10} maxRows={10} value={content} onChange={(e)=>{setContent(e.target.value)}}/>
        </CustomDivStyle>
    );
}

export default DayEventWrite;