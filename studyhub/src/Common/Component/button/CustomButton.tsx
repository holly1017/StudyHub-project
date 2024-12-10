import React from 'react';
import CustomButtonStyle from './CustomButtonStyle';
import CustomDivStyle from '../etc/CustomDivStyle';

interface CustomButtonProps {
    width?: number | string,
    height?: number | string,
    textColor?: string,
    borderWidth?: number,
    borderStyle?: string,
    borderColor?: string,
    backgroundColor?: string,
    borderRadius?: number,
    fontSize?: number,
    content?: string,
    fontWeight?: number,
    flex?: string,
    sendMethod?: (value:any) => any,
    marginRight?: string | number,
    marginBottom?: string | number,
    disabled?: boolean,
    marginTop? : string | number,
    pointerEvents? : 'auto' | 'none' | 'inherit';
}

const CustomButton: React.FC<CustomButtonProps> = ({width, height, textColor, borderWidth, borderStyle, borderColor, backgroundColor, borderRadius, fontSize, content, fontWeight, flex, sendMethod, disabled, marginBottom, marginRight, marginTop, pointerEvents}) => {
  return (
    <CustomDivStyle flex={flex}>
        <CustomButtonStyle onClick={sendMethod} width={width} height={height} textColor={textColor} borderWidth={borderWidth} borderStyle={borderStyle} borderColor={borderColor} backgroundColor={backgroundColor} borderRadius={borderRadius} fontSize={fontSize} fontWeight={fontWeight} flex={flex} disabled={disabled} marginBottom={marginBottom} marginRight={marginRight} marginTop={marginTop} pointerEvents={pointerEvents} >{content}</CustomButtonStyle>
    </CustomDivStyle>
  );
}

export default CustomButton;