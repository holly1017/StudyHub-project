import { Box } from '@mui/material';
import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';

interface HeadCountProps {
  curHeadCnt: number;
  maxHeadCnt: number;
  clickEvent: ()=> any;
}

const HeadCount: React.FC<HeadCountProps> = ({ curHeadCnt, maxHeadCnt, clickEvent }) => {
    return (
        <CustomDivStyle cursor='pointer' onClick={clickEvent}>
            <Box
            boxShadow={2} 
            width={210}
            height={51}
            bgcolor="background.paper"
            m={1}
            p={1}
            border={'1px solid #d7d7d7'}
            borderRadius={1}>
              <CustomDivStyle display='flex' alignItems='center' justifyContent='space-around'>            
                <img src={`${process.env.PUBLIC_URL}/users-profiles.png`}></img>    
                <p>{curHeadCnt} / {maxHeadCnt}</p>
              </CustomDivStyle>
            </Box>
        </CustomDivStyle>
    );
}

export default HeadCount;