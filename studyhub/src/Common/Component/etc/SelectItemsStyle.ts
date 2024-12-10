import { styled } from '@mui/system';
import { FormControl } from '@mui/material';

interface CustomSelectItemsProps {
    width: number | string;
    height: number | string;
}

const CustomFormControl = styled(FormControl)<CustomSelectItemsProps>(({ width, height }) => ({
    width: width,
    height: height,
}));

export default CustomFormControl;