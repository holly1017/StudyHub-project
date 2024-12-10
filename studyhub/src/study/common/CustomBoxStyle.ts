import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyleProps {
    display: string;
    gap: number; // gap은 숫자로 유지
    mt: number;
}

const CustomBoxStyle = styled(Box)<StyleProps>(({display, gap, mt}) => ({
    display,
    flexWrap: "wrap",
    gap,
    marginTop: mt*8,
}));

export default CustomBoxStyle;