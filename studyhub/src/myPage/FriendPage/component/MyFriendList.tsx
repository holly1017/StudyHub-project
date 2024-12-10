import React, {useState, useEffect} from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { Box } from "@mui/material";
import { getData } from "../../../Api";
import MyFriendListCompo from "./MyFriendListCompo ";

interface member {
    memberNo: number;
    nickName: string;
    profile: string;
    hasSentRequest: boolean;
}
interface MyFriendListProps {
    myFriends: member[];
    memberNo: number;
    deleteFriends: (friendNo: number)=>void;
} 

const MyFriendList: React.FC<MyFriendListProps> = ({myFriends, memberNo, deleteFriends}) => {
    const [searchFriends, setSearchFriends] = useState([]);

    const [search, setSearch] = useState('');

    const reqSearchData = async () => {
        try {
            const response = await getData(`/member/mypage/friend/search?nickNameKeyword=${search}`);
            setSearchFriends(response);
        } catch (error) {
            console.error('검색 데이터 요청 실패:', error);
        }
    };

    const friendRequest = async (requestMember: number) => {
        try {
            const response = await getData(`/member/mypage/friend/search-request?memberNo=${memberNo}&requestMember=${requestMember}`)
            console.log("친구요청 결과!!!!!!!!!!" + response);
        }
        catch(error) {
            console.log(error);
        }
    }

    // useEffect(()=>{
    //     reqSearchData();
    // }, [search])

    return (
        <CustomDivStyle>
            <Box width={330} height={480} boxShadow={3} borderRadius={5} display={"flex"} flexDirection='column' alignItems="center"> 
                <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                    <MyFriendListCompo memberNo={memberNo} deleteFriends={deleteFriends} btnContent="삭제" friendList={myFriends}></MyFriendListCompo>
                </CustomDivStyle>
            </Box>
        </CustomDivStyle>
    )
}

export default MyFriendList;