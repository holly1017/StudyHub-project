import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import DayEventInfoHead from './DayEventInfoHead';
import DayEventInfoContent from './DayEventInfoContent';
import { useParams } from 'react-router-dom';

interface DayEventInfos {
    id: number;
    content: string;
}

interface DayEventInfoSectionProps {
    date: string;
    content: DayEventInfos[];
    width?: string | number;
    writeEvent: (value: number, data:any) => any;
    reqDeleteData: (value:number) => any;
    curDate: string | undefined;
}

const DayEventInfoSection: React.FC<DayEventInfoSectionProps> = ({ date, content, width = '20%', writeEvent, reqDeleteData, curDate }) => {
    const { id } = useParams();

    const wrtie = (data:any) => {
        const parsedId = id ? parseInt(id) : NaN;
        if (!isNaN(parsedId)) {
            writeEvent(parsedId, data);
        }
    }

    return (
        <CustomDivStyle width={width} border='1px solid #d7d7d7' borderRadius={10} marginRight={5}>
            <DayEventInfoHead date={date} writeEvent={wrtie} />
            <br></br>
            <DayEventInfoContent content={content} reqDeleteData={reqDeleteData} curDate={curDate}/>
        </CustomDivStyle>
    );
}

export default DayEventInfoSection;