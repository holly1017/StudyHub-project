import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import Nav from "../common/Nav";
import Header from "../common/Header";
import InfoList from "./component/InfoList";
import NavDrawer from "../common/NavDrawer";
import { useUser } from "../../Common/UserContext";
import { getData, postData } from "../../Api";
import { useLocation, useNavigate } from "react-router-dom";

interface User {
    profile: string;
    memberId: string;
    nickName: string;
    address: string;
    popularity: number;
    email: string;
    phone: string;
    hashTag: string;
}

interface InfoPageProps {
}

const InfoPage = () => {
    const [hideNav, setHideNav] = useState(false);
    const [infoUser, setInfoUser] =  useState<User>({profile: '', memberId: '', nickName: '', address: '', popularity: 0, email: '', phone: '', hashTag:''});
    const { user, setUser, logout } = useUser();
    const navigate = useNavigate();

    const memberId = user?.memberId;

    useEffect(() => {
        const checkScreenWidth = () => {
            setHideNav(window.innerWidth < 1020);
        };

        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);

        return () => window.removeEventListener("resize", checkScreenWidth);
    }, []);

    useEffect(()=>{
        reqInfo();
        // getUser();
    }, []);

    const reqInfo = async () => {
        try {
            const response = await getInfo();
            if (response) {
                // 응답이 정상적으로 들어오면 infoUser를 업데이트
                setInfoUser(response);
                await getUser();

            } else {
                // 응답이 없다면 적절한 처리를 추가할 수 있습니다.
                console.log("No response data found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getUser = async () => {
        try {
            const response = await getData("/member/get-current-member");
            console.log(response);
            setUser(response);
        } catch(error) {
            console.log(error);
        }
    }

    const getInfo = async () => {
        const payload = {
            memberId: memberId
        }
        try {
            const response = await postData("/member/mypage/info", payload);
            
            return response;
        } catch(error) {
            console.log(error);
    }
}


    return (
        <CustomDivStyle margin={"auto"} maxWidth={1000} minWidth={700} display="flex">
        
                {!hideNav && <Nav selected={"내정보"} />}

                <CustomDivStyle width={"75%"} minWidth={720} marginTop={50}>
                    {hideNav && <NavDrawer selected="내정보"></NavDrawer>}
                    <Header></Header>

                    <InfoList infoUser={infoUser}></InfoList>
                    
                </CustomDivStyle>
            
        </CustomDivStyle>
    )
}

export default InfoPage;