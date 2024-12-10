import React from "react";
import UserListItem from "../../../Common/module/etc/UserListItem";
import CustomButton from "../../../Common/Component/button/CustomButton";
import { getData } from "../../../Api";
import { useUser } from "../../../Common/UserContext";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";

interface member {
  memberNo: number;
  nickName: string;
  profile: string;
  hasSentRequest: boolean;
}

interface FriendListProps {
    friendList: member[];
    acceptFriend: (friendNo: number) => void;
    rejectFriend: (friendNo: number) => void;
}

const RequestFriendListCompo: React.FC<FriendListProps> = ({friendList, acceptFriend, rejectFriend}) => {
    const {user} = useUser();

    
    return (
        <>
        {
            friendList.map((friend, index)=> (
                <UserListItem width={310} height={52} content={friend.nickName} image={friend.profile}>
                    <CustomDivStyle display="flex" >
                        <CustomButton sendMethod={()=>{acceptFriend(friend.memberNo)}} width={59} height={36} content={"수락"} fontWeight={500} fontSize={15} textColor="#FFF" backgroundColor="#000" borderColor="" borderRadius={15} borderStyle="" borderWidth={0} marginRight={5}></CustomButton>
                        <CustomButton sendMethod={()=>{rejectFriend(friend.memberNo)}} width={59} height={36} content={"거절"} fontWeight={500} fontSize={15} textColor="#FFF" backgroundColor="#000" borderColor="" borderRadius={15} borderStyle="" borderWidth={0}></CustomButton>                
                    </CustomDivStyle>
                </UserListItem>
            ))
        }
        </>
    )
}

export default RequestFriendListCompo;