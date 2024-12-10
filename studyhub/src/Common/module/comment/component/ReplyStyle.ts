import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

interface ReplyProps {
    width: number | string,
}

const ReplyStyle = styled(TextField)<ReplyProps>(({width}) => ({
    width
}));

export default ReplyStyle;