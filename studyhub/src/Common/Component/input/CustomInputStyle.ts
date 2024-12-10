import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

interface StyleProps {
    width: number | string;
    height: number | string;
    flex?: string;
  }

const CustomInputStyle = styled(FormControl)<StyleProps>(({ width, height, flex }) => ({
    width,
    height,
    flex
}));

export default CustomInputStyle;