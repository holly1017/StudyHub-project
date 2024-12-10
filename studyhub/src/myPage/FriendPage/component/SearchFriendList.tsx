import React, {useState, useEffect} from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { Box } from "@mui/material";
import SearchInput from "../../../Common/Component/input/SearchInput";
import { getData } from "../../../Api";
import SearchFriendListCompo from "./SearchFriendListCompo";

interface member {
    memberNo: number;
    nickName: string;
    profile: string;
    hasSentRequest: boolean;
}
interface SearchFriendListProps {
    memberNo: number;
    deleteFriends:(friendNo: number)=>void;
    reqSearchData:(search: string)=>void;
    searchFriends: member[];
} 

const SearchFriendList: React.FC<SearchFriendListProps> = ({memberNo,searchFriends, deleteFriends, reqSearchData}) => {

    const [requestedFriends, setRequestedFriends] = useState<number[]>([]);



    const [search, setSearch] = useState('');

    const friendRequest = async (friendNo: number) => {
        try {

            await getData(`/member/mypage/friend/search-request?memberNo=${memberNo}&friendNo=${friendNo}`);
            setRequestedFriends(prevState => [...prevState, friendNo]);
            reqSearchData(search);
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (search.trim() !== '') {
            reqSearchData(search);
        }
    }, [search])

    return (
        <CustomDivStyle>
            <Box width={330} height={480} boxShadow={3} borderRadius={5} display={"flex"} flexDirection='column' alignItems="center"> 
                <CustomDivStyle marginTop={20}>
                    <SearchInput width={276} height={35} placeholder="친구 이름으로 검색" setSearch={setSearch} search={search}></SearchInput>
                </CustomDivStyle>
                <CustomDivStyle overflow={"auto"} marginTop={20} marginBottom={20}>
                    <SearchFriendListCompo memberNo={memberNo} btnContent="추가" 
                        friendList={searchFriends} 
                        friendRequest={friendRequest} 
                        deleteFriends={deleteFriends} />
                </CustomDivStyle>
            </Box> 
        </CustomDivStyle>
    )
}

export default SearchFriendList;