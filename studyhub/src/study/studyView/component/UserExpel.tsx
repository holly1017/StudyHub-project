import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { Box, Tabs, Typography } from '@mui/material';
import UserListItem from '../../../Common/module/etc/UserListItem';
import CustomButton from '../../../Common/Component/button/CustomButton';
import { useTheme } from '@mui/material/styles';
import { CustomTab } from '../../studyList/component/CustomTabStyle';
import { postData } from '../../../Api';

interface UserExpelProps {
    isOwner: boolean;
    myFriends: Friend[];
    joinReq: joinReq[];
    acceptMember: (memberNo:number)=>any;
    refuseMember: (memberNo:number)=>any;
    kickMember: (memberNo:number)=>any;
}

interface Friend {
    member: string;
    studyGroupAuth: string;
    memberNo: number;
    profile: string;
}

interface joinReq {
    id: number;
    member: string;
    memberNo: number;
    profile: string;
}

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
            style={{width: '100%'}}
        >
            {value === index && (
                <Box padding={1}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const UserExpel: React.FC<UserExpelProps> = ({ isOwner, myFriends, joinReq, acceptMember, refuseMember, kickMember }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <CustomDivStyle display="flex" alignItems="center" flexDirection='column'>
            <Box width={400} height={480} boxShadow={3} borderRadius={5} display={"flex"} flexDirection='column' alignItems="center">
                {!isOwner ? (
                    <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                        {myFriends.map((item, index) => (
                            <UserListItem key={index} width={380} height={52} content={item.member} image={item.profile}>
                            </UserListItem>
                        ))}
                    </CustomDivStyle>
                ) : (
                    <>
                        <CustomDivStyle position='static'>
                            <Tabs value={value} onChange={handleChange} centered>
                                <CustomTab label="그룹원 구성" />
                                <CustomTab label="그룹 참여 요청" />
                            </Tabs>
                        </CustomDivStyle>

                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                                {myFriends.map((item, index) => (
                                    <UserListItem key={index} width={380} height={52} content={item.member} image={item.profile}>
                                        {isOwner && item.studyGroupAuth !== "MANAGER" && (
                                            <CustomButton
                                                width={59}
                                                height={36}
                                                content={"강퇴"}
                                                fontWeight={500}
                                                fontSize={15}
                                                textColor="#FFF"
                                                backgroundColor="#000"
                                                borderRadius={15}
                                                sendMethod={() => kickMember(item.memberNo)}
                                            />
                                        )}
                                    </UserListItem>
                                ))}
                            </CustomDivStyle>
                        </TabPanel>

                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <CustomDivStyle marginTop={20} marginBottom={20} overflow={"auto"}>
                                {joinReq.map((item, index) => (
                                    <UserListItem key={index} width={380} height={52} content={item.member} image={item.profile}>
                                        {isOwner && (
                                            <>
                                            <CustomButton
                                                width={59}
                                                height={36}
                                                content={"수락"}
                                                fontWeight={500}
                                                fontSize={15}
                                                textColor="#FFF"
                                                backgroundColor="#000"
                                                borderRadius={15}
                                                marginRight={10}
                                                sendMethod={() => acceptMember(item.memberNo)}
                                            />
                                            
                                            <CustomButton
                                                width={59}
                                                height={36}
                                                content={"거절"}
                                                fontWeight={500}
                                                fontSize={15}
                                                textColor="#FFF"
                                                backgroundColor="#000"
                                                borderRadius={15}
                                                sendMethod={() => refuseMember(item.memberNo)}
                                            />
                                            </>
                                        )}
                                    </UserListItem>
                                ))}
                            </CustomDivStyle>
                        </TabPanel>
                    </>
                )}
            </Box>
        </CustomDivStyle>
    );
}

export default UserExpel;
