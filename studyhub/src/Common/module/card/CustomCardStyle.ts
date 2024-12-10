import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

interface CustomCardProps {
  width: number | string,
  height?: number | string,
  minHeight?: number | string,
}

const CustomCardStyle = styled(Card)<CustomCardProps>(({ width, height, minHeight }) => ({
  width,
  height,
  minHeight,
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center"
}));

export default CustomCardStyle;