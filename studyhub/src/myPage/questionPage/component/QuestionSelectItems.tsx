import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomFormControl from '../../../Common/Component/etc/SelectItemsStyle';

interface QuestionSelectItemsProps {
  width: number | string;
  height: number | string;
  options: string[] | number[];
  optionData: string | number;
  handleOptionChange: (value: string) => any;
}

const QuestionSelectItems: React.FC<QuestionSelectItemsProps> = ({ width, height, options, optionData, handleOptionChange }) => {
  // const [option, setOption] = React.useState<string | number>(options[index]);

  
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    handleOptionChange?.(String(event.target.value)); // Convert to string
  };

  return (
    <div>
      <CustomFormControl width={width} height={height}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionData}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </CustomFormControl>
    </div>
  );
}

export default QuestionSelectItems;
