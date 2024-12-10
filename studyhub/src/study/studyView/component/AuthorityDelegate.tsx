import React, { useState } from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { Box, ToggleButton } from '@mui/material';
import UserListItem from '../../../Common/module/etc/UserListItem';
import CustomButton from '../../../Common/Component/button/CustomButton';
import { useUser } from '../../../Common/UserContext';
import CustomToggleBtn from './CustomToggleBtn';

interface AuthorityDelegateProps {
    myFriends: Friend[];
    selectedIndex: number | null;
    setSelectedIndex: (value:number | null) => any;
}

interface Friend {
    member: string;
    studyGroupAuth: string;
    memberNo: number;
    profile: string;
}

const AuthorityDelegate: React.FC<AuthorityDelegateProps> = ({ myFriends, selectedIndex, setSelectedIndex }) => {
    const { user } = useUser();

    return (
        <CustomDivStyle display="flex" alignItems="center" flexDirection='column'>
            <Box width={312} height={480} boxShadow={3} borderRadius={5} display={"flex"} flexDirection='column' alignItems="center">
                <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                    {myFriends.map((friend, index) => (
                        <UserListItem key={friend.memberNo} width={269} height={52} content={friend.member} image={friend.profile}>
                            {friend.memberNo !== user?.memberNo && (
                                <CustomToggleBtn
                                    value="check"
                                    selected={selectedIndex === index}
                                    onChange={() =>
                                        setSelectedIndex(index)
                                    }
                                >
                                    위임
                                </CustomToggleBtn>
                            )}
                        </UserListItem>
                    ))}
                </CustomDivStyle>
            </Box>
        </CustomDivStyle>
    );
}

export default AuthorityDelegate;
