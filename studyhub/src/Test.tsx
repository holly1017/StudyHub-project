import React from 'react';
import StudyList from './study/studyList/StudyList';
import StudyWrtie from './study/studyWrite/StudyWrite';
import StudyModify from './study/studyModify/StudyModify';
import StudyView from './study/studyView/StudyView';
import GroupPage from './myPage/GroupPage/GroupPage';
import InfoPage from './myPage/infoPage/InfoPage';
import StudyRoom from './study/studyRoom/StudyRoom';
import StudyCalendar from './study/studyCalendar/StudyCalendar';

const handleModify = () => {
  console.log("수정 버튼 클릭됨");
}
const handleDelete = () => {
  console.log("삭제 버튼 클릭됨");

}

const Test: React.FC = () => {

  const studyArr = [
    { title: '테스트띠1', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠2', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠3', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠4', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠5', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠6', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠7', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠8', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠9', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠10', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠11', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠12', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠13', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠14', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠15', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠16', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠17', curHeadCnt: 1, maxHeadCnt: 10 },
    { title: '테스트띠18', curHeadCnt: 1, maxHeadCnt: 10 }
  ]
  const User = {
    "image": "다운로드.jpg",
    "id": "holly1017",
    "nickName": "감자",
    "postCode": "342351",
    "address": "강남",
    "detailAddress": "어딘가",
    "popularity": 1000
  }

  const hashTagArr = [
    { tag: 'Java' },
    { tag: 'Oracle' },
    { tag: 'React' },
    { tag: 'Javascript' },
  ]

  const commentArr = [
    {
      id: 1,
      user: "최재영",
      content: "댓글입니다!",
      parentId: 1,
      reply: [
        {
          id: 2,
          user: "최재영2",
          content: "대댓글입니다!",
          parentId: 1,
          reply: null
        }
      ]
    },

    {
      id: 1,
      user: "최재영",
      content: "댓글입니다!",
      parentId: 2,
      reply: [
        {
          id: 2,
          user: "최재영2",
          content: "대댓글입니다!",
          parentId: 1,
          reply: null
        }
      ]
    }
  ];

  const answerArr = [
    {
      id: 1,
      user: '김길동',
      title: '답변입니다.',
      content: 
      '답변 내용입니다. 안녕하세요',
      like: true,
      adopted : true,
      reply: commentArr
    },

    {
      id: 2,
      user: '최길동',
      title: '두번째 답변.',
      content: 
      '답변 내용입니다. 안녕하세요',
      like: false,
      adopted : true,
      reply: commentArr
    },

    {
      id: 3,
      user: '신길등',
      title: '세번째 답변.',
      content: 
      '답변 내용입니다. 안녕하세요',
      like: true,
      adopted : false,
      reply: commentArr
    }
  ];

  const product = [{
    content: '상품명1',
    subcontent: '판매자1',
    price: '1000',
    img: ""
  },

  {
    content: '상품명2',
    subcontent: '판매자2',
    price: '2000',
    img: ""
  },

  {
    content: '상품명3',
    subcontent: '판매자3',
    price: '3000',
    img: ""
  },

  {
    content: '상품명4',
    subcontent: '판매자4',
    price: '4000',
    img: ""
  },

  {
    content: '상품명5',
    subcontent: '판매자5',
    price: '5000',
    img: ""
  },

  {
    content: '상품명6',
    subcontent: '판매자6',
    price: '6000',
    img: ""
  },

  {
    content: '상품명7',
    subcontent: '판매자7',
    price: '7000',
    img: ""
  },

  {
    content: '상품명8',
    subcontent: '판매자8',
    price: '8000',
    img: ""
  },]



  const studyList = [{
    title: '상품명1',
    currHead: 1,
    maxHead: 5,
    img: ""
  },

  {
    title: '상품명2',
    currHead: 2,
    maxHead: 5,
    img: ""
  },

  {
    title: '상품명3',
    currHead: 3,
    maxHead: 5,
    img: ""
  },]

  const qusetionList = [{
    questionTitle: '질문',
    replyCount: 3
  },
  {
    questionTitle: '질문',
    replyCount: 3
  },
  {
    questionTitle: '질문',
    replyCount: 3
  },
  {
    questionTitle: '질문',
    replyCount: 3
  },
  {
    questionTitle: '질문',
    replyCount: 3
  },

]

  return (
    <div>
      <StudyList />
      <StudyWrtie />
       <StudyModify />
       <StudyView />
       <StudyRoom />
      <StudyCalendar />
      
      <GroupPage></GroupPage> 
      <InfoPage></InfoPage>
    </div>
  );
}

export default Test;