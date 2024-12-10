import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomFormControl from './SelectItemsStyle';

interface SelectItemsProps {
  width: number | string;
  height: number | string;
  options: string[] | number[];
  optionData: string | number;
  setOptionData: (value: string)=>any;
}

const SelectItems: React.FC<SelectItemsProps> = ({ width, height, options, optionData, setOptionData }) => {
  // const [option, setOption] = React.useState<string | number>(options[index]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setOptionData(event.target.value as string);
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

export default SelectItems;
