import { styled } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const LeftIcon = styled(ArrowBackIosNewIcon) (
    () => ({
        cursor: 'pointer',
        color: '#898989'
    })
)

export const RightIcon = styled(ArrowForwardIosIcon) (
    () => ({
        cursor: 'pointer',
        color: '#898989'
    })
)