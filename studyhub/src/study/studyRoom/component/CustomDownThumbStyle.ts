import { styled } from '@mui/system';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface CustomDownThumbStyleProps {
    cursor: string;
}

export const CustomDownThumbStyle = styled(ThumbDownAltIcon)<CustomDownThumbStyleProps>(({ cursor }) => ({
    cursor
}));

export const CustomDownOffThumbStyle = styled(ThumbDownOffAltIcon)<CustomDownThumbStyleProps>(({ cursor }) => ({
    cursor
}));