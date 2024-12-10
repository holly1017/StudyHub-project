import { styled } from "@mui/material";
import Input from '@mui/material/Input';

interface StyledUnderlineTextBoxProps {
    width: number | string;
}

const StyledInput = styled(Input)<StyledUnderlineTextBoxProps>(
    ({ width }) => ({
        width: width,
        height: '70px',
        fontSize: 20,
        fontWeight: 900,
        '&::before' : {
            borderBottom : '1px solid #DBDBDB'
        }
    })
);

export default StyledInput;
