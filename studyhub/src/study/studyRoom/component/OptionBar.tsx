import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import ImageBtn from './ImageBtn';
import { Box, Drawer } from '@mui/material';
import InfoSection from './InfoSection';

interface OptionBarProps {
    infoSectionHide: boolean;
    chattingSectionHide: boolean;
    userName: User[];
    reqUserName: string[];
    clickEvent: ()=> any;
    startDisplayStream: ()=>any;
    isStream: boolean;
    turnOffStream: ()=>any;
}

interface User {
    user: string,
    memberNo: number,
    profile: string
}

const OptionBar: React.FC<OptionBarProps> = ({ infoSectionHide, chattingSectionHide, userName, reqUserName, clickEvent, startDisplayStream, isStream, turnOffStream }) => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box width={320} role="presentation" onClick={toggleDrawer(false)}>
            <InfoSection userName={userName} reqUserName={reqUserName} />
        </Box>
    );

    return (
        <CustomDivStyle display='flex' justifyContent='space-around' padding={20} border='1px solid black' borderRadius={10} >
            <ImageBtn image={`${process.env.PUBLIC_URL}/Mic.png`} />
            <ImageBtn image={`${process.env.PUBLIC_URL}/Monitor.png`} />
            <ImageBtn image={`${process.env.PUBLIC_URL}/signal.png`} clickEvent={() => { if(!isStream) startDisplayStream();}} />
            {!chattingSectionHide && <ImageBtn clickEvent={clickEvent} image={`${process.env.PUBLIC_URL}/message-circle.png`} />}
            {!infoSectionHide && <ImageBtn clickEvent={toggleDrawer(true)} image={`${process.env.PUBLIC_URL}/original_group-icon.png`} />}
            <ImageBtn image={`${process.env.PUBLIC_URL}/Exit_Black.png`} clickEvent={() => { if(isStream) turnOffStream(); }}/>

            <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </CustomDivStyle>
    );
}

export default OptionBar;