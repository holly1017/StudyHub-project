import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CustomListItem from './UserListItemStyle';

interface UserListItemProps {
  width: number | string;
  height: number | string;
  image?: string;
  content: string;
  children?: React.ReactNode;
}

const UserListItem: React.FC<UserListItemProps> = ({ width, height, image, content, children }) => {
  return (
    <CustomListItem alignItems="center" width={width} height={height}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={image}/>
      </ListItemAvatar>
      <ListItemText primary={content} />
      {children}
    </CustomListItem>
  );
};

export default UserListItem;
