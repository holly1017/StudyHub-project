import React, { useEffect, useState } from "react";
import CustomAvatar from "../../Common/Component/etc/CustomAvatar";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { DateSpan, HashTag, PointText, UserId, ViewsSpan } from "./QuestionDetailCommonStyle";
import { useUser } from "../../Common/UserContext";


interface QuestionDetailProps {
    hashTag: string[],
    title: string,
    id : string,
    point: string | number,
    uploadDate: string,
    view : number,
    profile: string;
}

const formatDate = (isoString: string) => {
    return isoString.split("T")[0];
}

const QuestionDetailCommon: React.FC<QuestionDetailProps> = ({ hashTag, title, id, point, uploadDate, view, profile }) => {

    const {user} = useUser();
 
    const [flexRatio, setFlexRatio] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 942) {
                setFlexRatio(1.4);
            } else {
                setFlexRatio(1);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return() => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <CustomDivStyle width="100%" height='90px' display='flex'  borderBottom="0.6px solid #DBDBDB">
            <CustomDivStyle flex={5} display='flex' flexDirection='column'>
                <CustomDivStyle flex={1}fontSize={12}>
                    {hashTag.map((item, index) => (
                        <HashTag key={index}>#{item}&nbsp;</HashTag>
                    ))}
                </CustomDivStyle>
                <CustomDivStyle flex={3} fontSize={24} color='#2c2c2c' fontWeight={900} display='flex' alignItems='center'>{title}</CustomDivStyle>
            </CustomDivStyle>

            <CustomDivStyle height='60%' display='flex' alignSelf='center' flexDirection='column'>
                <CustomDivStyle flex={1} display="flex" justifyContent='space-between'>
                    <CustomDivStyle display='flex' marginRight={5}>
                        <CustomAvatar image={profile} width="27px" height='100%'/>
                        <UserId>&nbsp;{id}</UserId>
                    </CustomDivStyle>
                    <CustomDivStyle fontSize={12} display='flex' alignItems='center'>현상금<PointText>{point}point</PointText></CustomDivStyle>
                </CustomDivStyle>
                <CustomDivStyle flex={1} display='flex' alignItems="center" justifyContent='flex-end'>
                    <DateSpan>{formatDate(uploadDate)}</DateSpan>
                    <ViewsSpan>조회 {view}</ViewsSpan>
                </CustomDivStyle>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default QuestionDetailCommon;