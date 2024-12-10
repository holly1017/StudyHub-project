import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import Nav from "../common/Nav";
import Header from "../common/Header";
import CurrPoint from "./component/CurrPoint";
import NavDrawer from "../common/NavDrawer";
import PointLogTable from "./component/PointLogTable";
import { getData, postData } from "../../Api";
import { useUser } from "../../Common/UserContext";
import PaginationButtons from "../../Common/Component/button/PaginationButtons";


interface PointLog {
    useDate: string,
    useDetail: string,
    usePoint: number,
    remainPoint: number    
}

const PointPage = () => {
    const [pointLogList, setPointLogList] = useState<PointLog[]>([]);
    const [hideNav, setHideNav] = useState(false);
    
    const [currPoint, setCurrPoint] = useState(0);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    
    const {user} = useUser();

    useEffect(() => {
        const checkScreenWidth = () => {
            setHideNav(window.innerWidth < 1020);
        };

        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);

        return () => window.removeEventListener("resize", checkScreenWidth);
    }, []);

    const columns = ["날짜", "사용 내역", "사용 포인트", "잔여 포인트"];

    const reqPointInfo = async () => {
        await reqCurrPoint();
        await reqPointLogList();

    };

    const reqCurrPoint = async () => {
        const data = { memberNo: user?.memberNo };
        try {
            const response = await postData("member/profile", data);
            setCurrPoint(response.point);
        } catch (error) {
            console.log(error);
        }
    };

    const reqPointLogList = async () => {
        try {
            const response = await getData(`member/mypage/point/log?memberNo=${user?.memberNo}&page=${page-1}&size=5&sort=historyNo,desc`);

            console.log(response.pointLogCount)
            setMaxPage(response.pointLogCount)
            setPointLogList(response.pointLogs);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        reqPointInfo();
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
        <CustomDivStyle margin={"auto"} maxWidth={1000} minWidth={700} minHeight={759} display="flex">
            {!hideNav && <Nav selected={"포인트"} />}

            <CustomDivStyle width={"75%"} minWidth={720} marginTop={50}>
                {hideNav && <NavDrawer selected="포인트" />}
                <Header></Header>

                <CurrPoint currPoint={currPoint} reqPointInfo={reqPointInfo}></CurrPoint>

                <PointLogTable
                    columns={columns}
                    pointLogList={pointLogList}
                />

                <CustomDivStyle marginTop={20}>
                    <PaginationButtons
                        size="medium"
                        page={page}
                        onChange={handlePageChange}
                        maxPage={maxPage} 
                    />
                </CustomDivStyle>
            </CustomDivStyle>

        </CustomDivStyle>
    );
};

export default PointPage;
