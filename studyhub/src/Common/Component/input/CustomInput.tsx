import React from 'react';
import CustomInputStyle from './CustomInputStyle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { KeyboardEvent, ChangeEvent } from 'react';
import CustomDivStyle from '../etc/CustomDivStyle';

interface CustomInputProps {
  placeholderText: string;
  width: number | string;
  height: number | string;
  value?: string | null;
  type?: string;
  isMultiLine?: boolean;
  minRows?: number;
  maxRows?: number;
  flex?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>)=> any;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>)=> any;
}

const CustomInput: React.FC<CustomInputProps> = ({placeholderText, width, height, value, type, isMultiLine=false, minRows=0, maxRows=0, flex, onChange, onKeyDown, onKeyPress}) => {
  
  return (
    <CustomDivStyle flex={flex}>
      <CustomInputStyle width={width} height={height} flex={flex}>
        <OutlinedInput placeholder={placeholderText} value={value} type={type} onChange={onChange} onKeyDown={onKeyDown} onKeyPress={onKeyPress} multiline={isMultiLine} minRows={minRows} maxRows={maxRows} />
      </CustomInputStyle>
    </CustomDivStyle>
  );
}

export default CustomInput;