import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

interface StyleProps {
    width?: number | string,
    height?: number | string,
    textColor?: string,
    borderWidth?: number,
    borderStyle?: string,
    borderColor?: string,
    backgroundColor?: string,
    borderRadius?: number,
    fontSize?: number,
    fontWeight?: number,
    flex?: string,
    marginBottom? : string | number,
    marginRight? : string | number,
    marginTop? : string | number,
    onCustomClick? : () => void;
    pointerEvents? : 'auto' | 'none' | 'inherit';
  }

const CustomButtonStyle = styled(Button)<StyleProps>(({ width, height, textColor, borderWidth, borderStyle, borderColor, backgroundColor, borderRadius, fontSize, fontWeight, flex, marginBottom, marginRight, marginTop, onCustomClick, pointerEvents}) => ({
    width,
    height,
    color: textColor, // 텍스트 색상 지정
    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
    backgroundColor,
    borderRadius,
    fontSize,
    fontWeight,
    flex,
    marginBottom,
    marginRight,
    marginTop,
    onCustomClick,
    pointerEvents,
}));

export default CustomButtonStyle;