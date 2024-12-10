import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyFriendList from './MyFriendList';
import SearchFriendList from './SearchFriendList';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { CustomTab } from './FriendSmallTabStyle';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import RequestFriendList from './RequestFriendList';
import { getData } from '../../../Api';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box padding={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface member {
  memberNo: number;
  nickName: string;
  profile: string;
  hasSentRequest: boolean;
}

interface FriendWideTabProps {
  memberNo: number;
  myFriendsReq: ()=>void;
  waitingFriendsReq: ()=>void;
  acceptFriend: (friendNo:number)=>void;
  rejectFriend: (friendNo:number)=>void;
  deleteFriends: (friendNo:number)=>void;
  reqSearchData: (search: string)=>void;
  myFriends: member[];
  waitingFriends: member[];
  searchFriends: member[];
}

const FriendWideTab:React.FC<FriendWideTabProps> = ({memberNo, searchFriends, myFriendsReq, waitingFriendsReq, acceptFriend, rejectFriend, deleteFriends, reqSearchData, myFriends, waitingFriends}) => {
  

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    myFriendsReq();
    waitingFriendsReq();
  }, []);

  

  return (
    <div>
      <CustomDivStyle>
        <Tabs value={value} onChange={handleChange} centered>
            <CustomTab label="친구 관리" />
            <CustomTab label="친구 검색" />
        </Tabs>
      </CustomDivStyle>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <CustomDivStyle display='flex' gap={5}>
            <CustomDivStyle display="flex" flexDirection="column" alignItems="center">
                <ParagraphStyle>친구 목록</ParagraphStyle>
                <MyFriendList memberNo={memberNo} myFriends={myFriends} deleteFriends={deleteFriends}></MyFriendList>
            </CustomDivStyle>
            <CustomDivStyle display="flex" flexDirection="column" alignItems="center">
                <ParagraphStyle>친구 요청</ParagraphStyle>
                <RequestFriendList myFriends={waitingFriends} acceptFriend={acceptFriend} rejectFriend={rejectFriend}></RequestFriendList>
            </CustomDivStyle>
        </CustomDivStyle>
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <SearchFriendList memberNo={memberNo} deleteFriends={deleteFriends} reqSearchData={reqSearchData} searchFriends={searchFriends}></SearchFriendList>
      </TabPanel>
    </div>
  );
}

export default FriendWideTab;
