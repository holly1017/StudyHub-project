import React, { useEffect, useState } from 'react';
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import Nav from "../common/Nav";
import Header from "../common/Header";
import MoreViewButton from "../../Common/module/etc/MoreViewButton";
// import Content from '../../study/studyList/component/Content';
import Content from './component/Content';
import NavDrawer from '../common/NavDrawer';
import { useUser } from '../../Common/UserContext';
import { getData } from '../../Api';

interface Study {
    id: number;
    title: string;
    currentHeadCnt: number;
    maxHeadCnt: number;
    imgPath: string[];
}

const GroupPage = () => {
    const [hideNav, setHideNav] = useState(false);
    const [studyArr, setStudyArr] = useState<Study[]>([]);

    const [page, setPage] = useState(1);
    const [colCount, setColCount] = useState(3);
    const [size, setSize] = useState(colCount * 3);
    const [boardItemCnt, setBoardItemCnt] = useState(0);

    const { user } = useUser();
    const memberNo = user?.memberNo;

    useEffect(() => {
        getGroupList();
    }, [page]);

    const getGroupList = async () => {
        try {
            const response = await getData(`/member/mypage/group?memberNo=${memberNo}&sort=studyNo,desc&size=${size*page}`)

            console.log(response);

            setStudyArr(response);
            setBoardItemCnt(response.length);


        } catch(error) {
            console.log("GET Error : ", error);
        }
    }

    useEffect(() => {
        const checkScreenWidth = () => {
            setHideNav(window.innerWidth < 1020);
        };

        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);

        return () => window.removeEventListener("resize", checkScreenWidth);
    }, []);

    return (
        <CustomDivStyle margin={"auto"} maxWidth={1000} minWidth={700} minHeight={759} display="flex">

                {!hideNav && <Nav selected={"그룹관리"} />} 

                <CustomDivStyle width={"75%"} minWidth={720} marginTop={50}>
                    {hideNav && <NavDrawer selected="그룹관리"></NavDrawer>}
                    <Header></Header>
                    <CustomDivStyle display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <CustomDivStyle>
                            <Content studyArr={studyArr} page={page} itemCnt={colCount} boardItemCnt={boardItemCnt}/>
                        </CustomDivStyle>
                        <CustomDivStyle marginTop={30} marginBottom={50}>
                            <MoreViewButton sendMethod={() => { setPage(page + 1); }} />
                        </CustomDivStyle>
                    </CustomDivStyle>
                    
                </CustomDivStyle>
            
        </CustomDivStyle>
    )
}

export default GroupPage;