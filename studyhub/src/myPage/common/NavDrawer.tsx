import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Nav from './Nav';
import MenuIcon from '@mui/icons-material/Menu';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';

interface NavDrawerProps {
  selected: string;
}

const NavDrawer: React.FC<NavDrawerProps> = ({selected}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box role="presentation" onClick={toggleDrawer(false)}>
      <Nav selected={selected}></Nav>
    </Box>
  );

  return (
    <div>
        <CustomDivStyle paddingTop={20}>
            <MenuIcon onClick={toggleDrawer(true)} fontSize='large'></MenuIcon>
        </CustomDivStyle>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default NavDrawer;
