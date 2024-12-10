import { styled } from '@mui/system';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

interface CustomUpThumbStyleProps {
    cursor: string;
}

export const CustomUpThumbStyle = styled(ThumbUpAltIcon)<CustomUpThumbStyleProps>(({ cursor }) => ({
    cursor
}));

export const CustomUpOffThumbStyle = styled(ThumbUpOffAltIcon)<CustomUpThumbStyleProps>(({ cursor }) => ({
    cursor
}));