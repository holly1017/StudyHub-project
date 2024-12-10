import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

interface CustomAvatarProps {
    width?: number | string;
    height?: number | string;
    cursor?: string;
}

const CustomAvatarStyle = styled(Avatar)<CustomAvatarProps>(({ width, height, cursor }) => ({
  width,
  height,
  cursor
}));

export default CustomAvatarStyle;