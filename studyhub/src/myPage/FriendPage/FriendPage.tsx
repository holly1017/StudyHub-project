import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import Nav from "../common/Nav";
import Header from "../common/Header";
import MyFriendList from "./component/MyFriendList";
import SearchFriendList from "./component/SearchFriendList";
import FriendTab from "./component/FriendSmallTab";
import ParagraphStyle from "../../Common/Component/etc/ParagraphStyle";
import NavDrawer from "../common/NavDrawer";
import FriendManageTab from "./component/FriendWideTab";
import { useUser } from "../../Common/UserContext";
import { getData } from "../../Api";
import FriendWideTab from "./component/FriendWideTab";
import FriendSmallTab from "./component/FriendSmallTab";
import { useNavigate } from "react-router-dom";

interface member {
  memberNo: number;
  nickName: string;
  profile: string;
  hasSentRequest: boolean;
}

const FriendPage = () => {
  
  const { user } = useUser();
  const memberNo = user?.memberNo;

  const [myFriends, setMyFriends] = React.useState([]);
  const [waitingFriends, setWaitingFriends] = React.useState([]);

  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [searchFriends, setSearchFriends] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsNarrowScreen(window.innerWidth < 950);
      setHideNav(window.innerWidth < 1020);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const myFriendsReq = async() => {
    try {
      const response = await getData(`/member/mypage/friend/myfriend?memberNo=${memberNo}`);

      console.log("내 친구 목록 : " + response);
      setMyFriends(response);
    } catch(error) {
      console.log(error);
    }
  }

  const waitingFriendsReq = async() => {
    try {
      const response = await getData(`/member/mypage/friend/waiting?memberNo=${memberNo}`);

      console.log("내 요청 목록 : " + response)
      setWaitingFriends(response);
    } catch(error) {
      console.log(error);
    }
  }

  const acceptFriend = async (friendNo: number) => {
    try{
        const response = await getData(`/member/mypage/friend/request-accept?memberNo=${memberNo}&friendNo=${friendNo}`)

        console.log(response);
        const acceptedFriend = waitingFriends.find((friend: member) => friend.memberNo === friendNo);
        if (acceptedFriend) {
          setMyFriends((prev) => [...prev, acceptedFriend]);
        }
        setWaitingFriends((prev) => prev.filter((friend: member) => friend.memberNo !== friendNo));
    } catch(error) {
        console.log(error);
    }
  }

  const rejectFriend = async (friendNo: number) => {
      try{
          const response = await getData(`/member/mypage/friend/request-reject?memberNo=${memberNo}&friendNo=${friendNo}`)

          console.log(response);
          setWaitingFriends((prev) => prev.filter((friend: member) => friend.memberNo !== friendNo));
      } catch(error) {
          console.log(error);
      }
  }

  const deleteFriends = async (friendNo: number) => {
    try {
      const response = await getData(`/member/mypage/friend/delete?memberNo=${memberNo}&friendNo=${friendNo}`);
      console.log(response);
      await myFriendsReq();
      // navigate(0);
    } catch(error) {
      console.log(error);
    }
  }

  const reqSearchData = async (search: string) => {
    try {
        const response = await getData(`/member/mypage/friend/search?nickNameKeyword=${search}&memberNo=${memberNo}`);
        console.log(response); 
        setSearchFriends(response);
    } catch (error) {
        console.error('검색 데이터 요청 실패:', error);
    }
};

  

  return (
    <CustomDivStyle margin={"auto"} maxWidth={1000} minWidth={700} minHeight={759} display="flex">
      {!hideNav && <Nav selected={"친구관리"}/>}

      <CustomDivStyle width={"75%"} overflow={"auto"} minWidth={720} marginTop={50}>
        {hideNav && <NavDrawer selected={"친구관리"}></NavDrawer>}
        <Header></Header>

        <CustomDivStyle
          width={"100%"}
          marginTop={20}
          display="flex"
          justifyContent={"space-evenly"}
          alignItems={"flex-start"}
          minWidth={720}
        >
          
          {memberNo ? (
            <>
              {!isNarrowScreen && 
                <FriendWideTab 
                  memberNo={memberNo}
                  myFriendsReq={myFriendsReq}
                  waitingFriendsReq={waitingFriendsReq}
                  acceptFriend={acceptFriend}
                  rejectFriend={rejectFriend}
                  deleteFriends={deleteFriends}
                  myFriends={myFriends}
                  waitingFriends={waitingFriends}
                  reqSearchData={reqSearchData}
                  searchFriends={searchFriends} />}
              {isNarrowScreen && (
                <CustomDivStyle marginBottom={30}>
                  <FriendSmallTab 
                    memberNo={memberNo}
                    myFriendsReq={myFriendsReq}
                    waitingFriendsReq={waitingFriendsReq}
                    acceptFriend={acceptFriend}
                    rejectFriend={rejectFriend}
                    deleteFriends={deleteFriends}
                    myFriends={myFriends}
                    waitingFriends={waitingFriends}
                    reqSearchData={reqSearchData}
                    searchFriends={searchFriends}/>
                </CustomDivStyle>
              )}
            </>
          ) : null}
        </CustomDivStyle>
      </CustomDivStyle>
    </CustomDivStyle>
  );
};

export default FriendPage;
