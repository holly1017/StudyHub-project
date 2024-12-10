import { styled } from '@mui/material/styles';

interface ParagraphStyleProps {
    margin?: string | number;
    fontSize?: number | string;
    color?: string;
    fontWeight?: number;
    cursor?: string;
    hover?: boolean;
    width?: string | number;
    minWidth?: string | number;
}

const ParagraphStyle = styled("p")<ParagraphStyleProps>(({ margin, fontSize, color, fontWeight, cursor, hover, width, minWidth }) => ({
    margin,
    fontSize,
    color,
    fontWeight,
    cursor,
    width,
    minWidth,
    ...(hover && {
        '&:hover': {
            color: 'blue'
        }
    })
}));

export default ParagraphStyle;