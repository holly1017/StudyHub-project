import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import StarRating from '../../../Common/Component/etc/StarRating';
import CustomInput from '../../../Common/Component/input/CustomInput';

interface ExpelReviewProps {
    groupName: string;
    reviewContent: string | null;
    setReviewContent: (value:string | null)=> any;
    starPoint: number | null;
    setStarPoint: (value:number | null) => any;
}

const ExpelReview: React.FC<ExpelReviewProps> = ({ groupName, reviewContent, setReviewContent, starPoint, setStarPoint }) => {
    return (
        <CustomDivStyle display='flex' flexDirection='column' alignItems='center'>
            <ParagraphStyle>[{groupName}] 그룹에 대한 리뷰를 남겨주세요.</ParagraphStyle>
            <br></br>
            <StarRating starPoint={starPoint} setStarPoint={setStarPoint} />
            <br></br>
            <CustomInput placeholderText='리뷰를 남겨주세요.' width={400} height={''} isMultiLine={true} minRows={6} maxRows={6} value={reviewContent} onChange={(e) => {setReviewContent(e.target.value)}}/>
            <br></br>
        </CustomDivStyle>
    );
}

export default ExpelReview;
