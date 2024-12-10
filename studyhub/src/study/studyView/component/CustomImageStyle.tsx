import { styled } from '@mui/material/styles';

interface CustomImageStyleProps {
}

const CustomImageStyle = styled("img")<CustomImageStyleProps>(({ }) => ({
    width: '100%',
    height: 'auto',
    display: 'block'
}));

export default CustomImageStyle;