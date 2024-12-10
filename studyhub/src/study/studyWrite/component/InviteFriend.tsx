import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { Box } from '@mui/material';
import UserListItem from '../../../Common/module/etc/UserListItem';
import CustomButton from '../../../Common/Component/button/CustomButton';

interface InviteFriendProps {
    myFriends: string[];
}

const InviteFriend: React.FC<InviteFriendProps> = ({myFriends}) => {
    return (
        <CustomDivStyle display="flex" alignItems="center" flexDirection='column'>
            <Box width={312} height={480} boxShadow={3} borderRadius={5} display={"flex"} flexDirection='column' alignItems="center">
                <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                    {myFriends.map((friend, index) => (
                        <UserListItem width={269} height={52} content={friend}>
                            <CustomButton width={59} height={36} content={"초대"} fontWeight={500} fontSize={15} textColor="#FFF" backgroundColor="#000" borderColor="" borderRadius={15} borderStyle="" borderWidth={0}></CustomButton>
                        </UserListItem>
                    ))}
                </CustomDivStyle>
            </Box>
        </CustomDivStyle>
    );
}

export default InviteFriend;