import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import MoreViewButton from '../../../Common/module/etc/MoreViewButton';

interface Reviews {
    starPoint: number;
    content: string
}

interface ReviewProps {
    reviewArr: Reviews[];
}

const Review: React.FC<ReviewProps> = ({ reviewArr }) => {
    const [count, setCount] = useState(1);

    return (
        <>
            <p>탈퇴 리뷰</p>
            {
                reviewArr.slice(0, count).map((item, index) => (
                    <ReviewItem content={item.content} score={item.starPoint} />
                ))
            }
            <br></br>
            <CustomDivStyle display='flex' justifyContent='center'>
                <MoreViewButton sendMethod={() => setCount(count + 1)} />
            </CustomDivStyle>
        </>
    );
}

export default Review;