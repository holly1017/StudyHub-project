import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import CustomAvatar from '../../../Component/etc/CustomAvatar';
import { ArrowDownIcon, ArrowUpIcon } from './HeaderContentStyle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../../Api';
import { useCookies } from 'react-cookie';
import { useUser } from '../../../UserContext';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { user, setUser, logout } = useUser();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsArrowDown(!isArrowDown);
    };

    const [isArrowDown, setIsArrowDown] = useState(true);

    const handleArrowClick = () => {
        setIsArrowDown(!isArrowDown);
    }

    const gotoMypage = () => {
        navigate('/mypage/info');
        handleClose();
    }

    const logoutMethod = async () => {
      
        try {
            const response = await postData('/logout', {}); 
            console.log('POST 응답:', response);
            logout();
            navigate("/signin");
            
        } catch (error) {
            console.error('POST 요청 실패:', error);
            throw error;
        }
    }

    return (
        <div>
            <Box>
                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleArrowClick}>
                        <CustomAvatar image={user?.profile} height={40} width={40}></CustomAvatar>
                        {isArrowDown ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    </div>
                </IconButton>
            </Box>

            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ width: '200px' }} onClick={gotoMypage}>
                    <Avatar /> 마이페이지
                </MenuItem>
                <Divider />
                <MenuItem onClick={logoutMethod}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    로그아웃
                </MenuItem>
            </Menu>
        </div>
    );
}
