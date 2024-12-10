import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


interface StyleProps {
}

const CustomLinkStyle = styled(Link)<StyleProps>(({}) => ({
   textDecoration: 'none'
}));

export default CustomLinkStyle;