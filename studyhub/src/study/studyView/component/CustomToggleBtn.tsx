import { ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomToggleBtnStyleProps {
}

const CustomToggleBtn = styled(ToggleButton)<CustomToggleBtnStyleProps>(({ }) => ({
    width: 59, 
    height: 36, 
    fontWeight: 900, 
    fontSize: 15, 
    color: '#FFF', 
    backgroundColor: '#000', 
    borderRadius: 15
}));

export default CustomToggleBtn;