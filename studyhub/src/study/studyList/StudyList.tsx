import React, { useEffect, useRef, useState } from 'react';
import MoreViewButton from '../../Common/module/etc/MoreViewButton';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import Head from './component/Head';
import Content from './component/Content';
import './StudyListStyle.css';
import { getData } from '../../Api';

interface Study {
    id: number;
    title: string;
    currentHeadCnt: number;
    maxHeadCnt: number;
    imgPath: string[];
}

interface StudyListProps {
}

const StudyList: React.FC<StudyListProps> = ({ }) => {
    const [studyArr, setStudyArr] = useState<Study[]>([]);
    const [page, setPage] = useState(1);
    const [colCount, setColCount] = useState(5);
    const [size, setSize] = useState(colCount * 3);
    const [boardItemCnt, setBoardItemCnt] = useState(0);
    const [search, setSearch] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const firstInit = useRef<boolean>(false);

    const reqSearchData = async (search: string, page: number) => {
        try {
            const response = await getData(`/study/list/search?search=${search}&page=${0}&sort=studyNo,desc&size=${size*page}`);
            setStudyArr(response);
            setBoardItemCnt(response.length);
        } catch (error) {
            console.error('검색 데이터 요청 실패:', error);
        }
    };

     const reqData = async (page: number) => {
        try {
            const response = await getData(`/study/list?page=${0}&sort=studyNo,desc&size=${size*page}`);
            setStudyArr(response)
            setBoardItemCnt(response.length);
        } catch (error) {
            console.error('전체 데이터 요청 실패:', error);
        }
    };
    
    useEffect(() => {
        if(firstInit.current == false) return;
        setPage(1);
        
        if (search) {
            reqSearchData(search, page);
        } else {
            reqData(page);
        }
    }, [search]);

    useEffect(() => {
        if(firstInit.current == false) return;

        if (search) {
            reqSearchData(search, page);
        } else {
            reqData(page);
        }
    }, [page, size]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        getItemCnt();
        reqData(page);
        firstInit.current = true;
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getItemCnt();
    }, [windowWidth]);

    const getItemCnt = (): void => {
        if (window.innerWidth <= 824) {
            setColCount(3);
            setSize(3 * 3);
        } else if (window.innerWidth <= 1033) {
            setColCount(4);
            setSize(4 * 3);
        } else {
            setColCount(5);
            setSize(5 * 3);
        }
    };

    return (
        <CustomDivStyle width={'100%'} margin={'auto'} maxWidth={1017} minWidth={768} marginTop={50} marginBottom={50} flex={'auto'}>
            <Head onClick={() => { setPage(1); reqSearchData(search, 1); }} search={search} setSearch={setSearch} />
            <Content studyArr={studyArr} page={page} itemCnt={colCount} boardItemCnt={boardItemCnt} searchTitle={search} />
            <br></br>
            <br></br>
            <br></br>
            <CustomDivStyle display='flex' justifyContent='center'>
                <MoreViewButton sendMethod={() => {
                    setPage(page + 1); // 페이지 번호 증가
                }} />
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default StudyList;
