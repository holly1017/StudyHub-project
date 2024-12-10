import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { Box } from "@mui/material";
import RequestFriendListCompo from "./RequestFriendListCompo";

interface member {
  memberNo: number;
  nickName: string;
  profile: string;
  hasSentRequest: boolean;
}

interface MyFriendListProps {
    myFriends: member[];
    acceptFriend: (friendNo: number) => void;
    rejectFriend: (friendNo: number) => void;
} 

const RequestFriendList: React.FC<MyFriendListProps> = ({myFriends, acceptFriend, rejectFriend}) => {
    return (
        <CustomDivStyle>
            <Box width={330} height={480} boxShadow={3} borderRadius={5} display={"flex"} flexDirection='column' alignItems="center"> 
                <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                    <RequestFriendListCompo friendList={myFriends} acceptFriend={acceptFriend} rejectFriend={rejectFriend}></RequestFriendListCompo>
                </CustomDivStyle>
            </Box>
        </CustomDivStyle>
    )
}

export default RequestFriendList;