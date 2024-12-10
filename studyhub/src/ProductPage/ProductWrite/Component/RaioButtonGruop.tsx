import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

interface RadioButtonGroup {
  productStatus: string;
  setProductStatus: (data: string) => void
}

const RadioButtonGruop:React.FC<RadioButtonGroup>  = ({productStatus, setProductStatus}) => {

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductStatus(event.target.value)
    }

    return(
        <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleStatusChange}
        >
          <FormControlLabel value="LOW" control={<Radio />} label="하" />
          <FormControlLabel value="MIDDLE" control={<Radio />} label="중" />
          <FormControlLabel value="TOP" control={<Radio />} label="상" />
          <FormControlLabel value="BEST" control={<Radio />} label="최상" />
        </RadioGroup>
      </FormControl>
    )
}

export default RadioButtonGruop;