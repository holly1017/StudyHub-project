import React from 'react';
import { Box, Rating } from '@mui/material';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';

interface ReviewItemProps {
    content: string;
    score: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ content, score }) => {
    return (
        <CustomDivStyle width={'100%'}>
            <Box
            boxShadow={2} 
            width={'95%'}
            bgcolor="background.paper"
            m={1}
            p={2}
            border={'1px solid #d7d7d7'}
            borderRadius={3}>
                <Rating
                    name="simple-controlled"
                    value={score}
                    size="large"
                    readOnly 
                />
                <p>{content}</p>
            </Box>
        </CustomDivStyle>
    );
}

export default ReviewItem;