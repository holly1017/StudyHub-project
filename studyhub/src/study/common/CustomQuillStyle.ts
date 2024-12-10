import { styled } from '@mui/system';
import ReactQuill from "react-quill";

interface CustomQuillStyleProps {
    height: number | string;
    margin: number | string;
}

const CustomQuillStyle = styled(ReactQuill)<CustomQuillStyleProps>(({ height, margin }) => ({
    height,
    margin
}));

export default CustomQuillStyle;