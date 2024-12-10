import { styled } from '@mui/system';
import { ListItem } from '@mui/material';

interface CustomListItemProps {
    width: number | string;
    height: number | string;
}

const CustomListItem = styled(ListItem)<CustomListItemProps>(({ width, height }) => ({
    width: width,
    height: height,
    display: 'flex', // Flexbox 사용
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center' // 수직 가운데 정렬
}));

export default CustomListItem;
