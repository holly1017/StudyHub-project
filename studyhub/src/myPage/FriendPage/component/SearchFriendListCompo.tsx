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
    friendRequest: (friends:number)=>void;
    deleteFriends:(friends: number)=>void;
}

const SearchFriendListCompo: React.FC<FriendListCompoProps> = ({btnContent, friendList, friendRequest, memberNo, deleteFriends}) => {
    return (
        <>
        {friendList.map((friend, index) => (
                <UserListItem width={310} height={52} content={friend.nickName} image={friend.profile}>
                    <CustomButton
                        sendMethod={friend.hasSentRequest 
                            ? () => deleteFriends(friend.memberNo)  // 삭제 버튼 클릭 시
                            : () => friendRequest(friend.memberNo) // 추가 버튼 클릭 시
                        }
                        width={59}
                        height={36}
                        content={friend.hasSentRequest ? '삭제' : btnContent} // 버튼 텍스트 설정
                        fontWeight={500}
                        fontSize={15}
                        textColor="#FFF"
                        backgroundColor="#000"
                        borderRadius={15}
                        borderWidth={0}
                    />
                </UserListItem>
        ))}
        </>
    )
}

export default SearchFriendListCompo;