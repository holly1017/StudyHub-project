import * as React from 'react';
import Box from '@mui/material/Box';
import StyledInput from './UnderlineTextBoxStyle';

const ariaLabel = { 'aria-label': 'description' };

interface UnderlineTextBoxProps {
  width : number | string;
  value? : string;
  changeValue: (data:string)=>any;
}

const UnderlineTextBox : React.FC<UnderlineTextBoxProps> = ({ width, value, changeValue }) =>{
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value);
  };

  return (
    <Box>
      <StyledInput placeholder="제목을 입력해주세요" 
             inputProps={ariaLabel}
             width={width}
             value={value}
             onChange={handleChange}
             /> 
    </Box>
  );
}

export default UnderlineTextBox;
