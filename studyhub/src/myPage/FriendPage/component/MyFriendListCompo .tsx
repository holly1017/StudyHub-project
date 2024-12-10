import React from "react";
import UserListItem from "../../../Common/module/etc/UserListItem";
import CustomButton from "../../../Common/Component/button/CustomButton";

interface member {
    memberNo: number;
    nickName: string;
    profile: string;
    hasSentRequest: boolean;
}

interface FriendListCompoProps {
    memberNo: number;
    btnContent: string;
    friendList: member[];
    deleteFriends:(friends: number)=>void;
}

const MyFriendListCompo: React.FC<FriendListCompoProps> = ({btnContent, friendList, deleteFriends}) => {
    return (
        <>
        {
            friendList.map((friend, index)=> (
                <UserListItem width={310} height={52} content={friend.nickName} image={friend.profile}>
                    <CustomButton 
                        sendMethod={()=>{deleteFriends(friend.memberNo)}} 
                        width={59} 
                        height={36} 
                        content={btnContent} 
                        fontWeight={500} 
                        fontSize={15} 
                        textColor="#FFF" 
                        backgroundColor="#000" 
                        borderRadius={15} 
                        borderWidth={0} />
                </UserListItem>
            ))
        }
        </>
    )
}

export default MyFriendListCompo;