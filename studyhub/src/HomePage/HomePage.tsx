import React, { useEffect, useState } from 'react'
import HomePageContainer from './HomePageStyle';
import HomeImg from './Component/HomeImg';
import RecommendStudyGroup from './Component/RecommendStudyGroup';
import TopQuestionTable from './Component/TopQuestionTable';
import { getData } from '../Api';
import { useUser } from '../Common/UserContext';

interface HomePageProps {
}

interface Question {
  id: number;
  questionTitle: string,
  replyCnt: number,

}

interface Study {
  id: number;
  title: string,
  currentHeadCnt: number,
  maxHeadCnt: number,
  imgPath: string[];
}


const HomePage: React.FC<HomePageProps> = ({ }) => {
  const [studyList, setStudyList] = useState<Study[]>([]);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [userId, setUserId] = useState('');

  const { user } = useUser();
  const hashTag = user?.hashTag;
  console.log(hashTag);

  useEffect(() => {
    // 서버에 요청 .... (studyList, questionList)
    // JWT토큰이 있으면 해당 토크에서 유저정보 조회후 userId상태에 입력
    setUserId('JWT토크에 있는 유저정보');
    reqData();
    if (hashTag) {
      reqRecommendStudy(hashTag);
    } else {
      UnLoingReqRecommendStudy();
    }
  }, [])

  const reqData = async () => {
    try {
      const response = await getData("/question/bestQuestion");
      console.log("질문 리스트 : ", response);
      setQuestionList(response);
    } catch (error) {
      console.error(error);
    }
  }

  const reqRecommendStudy = async (hashTag: string) => {
    try {
      const response = await getData(`/study/recommend?hashTag=${hashTag}`);
      console.log("스터디 추천 : ", response);
      setStudyList(response);
    } catch (error) {
      console.log("오류 : ", error);
    }
  }

  const UnLoingReqRecommendStudy = async () => {
    try {
      const response = await getData('/study/recommend/unlogin');
      console.log("스터디 추천 비로그인 : ", response);
      setStudyList(response);
    } catch (error) {
      console.log("오류 : ", error);
    }
  }

  return (
    <HomePageContainer>

      <HomeImg />
      <RecommendStudyGroup studyList={studyList} id={userId}></RecommendStudyGroup>
      <TopQuestionTable questionList={questionList}></TopQuestionTable>

    </HomePageContainer>
  )
}

export default HomePage;