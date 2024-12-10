import React, { useEffect, useRef, useState } from 'react';
import UnderLineTitle from '../../Common/Component/etc/UnderLineTitle';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import ReplyListComponent from '../../Common/module/comment/ReplyListComponent';
import MainTitle from './component/MainTitle';
import Content from './component/Content';
import ControlBtn from './component/ControlBtn';
import Review from './component/Review';
import { getData, postData } from '../../Api';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../Common/UserContext';
import { dA } from '@fullcalendar/core/internal-common';

interface StudyViewProps {

}

interface StudyVieweInfo {
    hashTags: string[];
    groupName: string;
    titleName: string;
    content: string;
    currentHeadCnt: number;
    maxHeadCnt: number;
    imgPath: string;
    joinReq: joinReq[];
    memberNo: number;
}

interface Friend {
    memberNo: number;
    member: string;
    studyGroupAuth: string;
    profile: string;
}

interface joinReq {
    id: number;
    member: string;
    memberNo: number;
    profile: string;
}

interface Reply {
    id: number;
    user: string;
    content: string;
    parentId: number | null;
    dept: number;
    status: string;
    memberNo: number;
    profile: string;
}

interface Reviews {
    starPoint: number;
    content: string
}

const StudyView: React.FC<StudyViewProps> = ({ }) => {
    const [isOwner, setIsOwner] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isJoin, setIsJoin] = useState(false);
    const [studyViewInfo, setSutdyViewInfo] = useState<StudyVieweInfo>({ hashTags: [], groupName: '', titleName: '', content: '', currentHeadCnt: 0, maxHeadCnt: 0, imgPath: "", joinReq: [], memberNo: 0 });
    const [replyArr, setReplyArr] = useState<Reply[]>([]);
    const [reviewArr, setReviewArr] = useState<Reviews[]>([]);
    const [studyGroupList, setStudyGroupList] = useState<Friend[]>([]);
    const [comment, setComment] = useState<string>('');
    const [replyContent, setReplyContent] = useState<string>('');
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const firstInit = useRef<boolean>(false);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const reqData = async () => {
        try {
            const response = await getData(`/study/list/view?id=${id}`);
            console.log('POST 응답:', response);

            setSutdyViewInfo({
                hashTags: response.hashTag == null ? [] : response.hashTag.split(','),
                groupName: response.groupName,
                titleName: response.title,
                content: response.content,
                currentHeadCnt: response.currentHeadCnt,
                maxHeadCnt: response.maxHeadCnt,
                imgPath: response.imgPath,
                joinReq: response.studyGroupReq,
                memberNo: response.memberNo
            });
            if (response.studyGroup && Array.isArray(response.studyGroup)) {
                const matchedItem = response.studyGroup.find((item: Friend) => item.memberNo === user?.memberNo);

                if (matchedItem && matchedItem.studyGroupAuth === "MANAGER") {
                    setIsOwner(true);
                }
                setIsJoin(matchedItem ? true : false);
            } else {
                console.error('studyGroup 데이터가 없습니다.');
            }

            setReplyArr(response.reply);
            setReviewArr(response.review);
            setStudyGroupList(response.studyGroup);
            setMaxPage(response.replyCount);

            const matchedItem = response.studyGroup.find((item: Friend) => item.memberNo === user?.memberNo);
            setIsJoin(matchedItem);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqCommentData = async () => {
        try {
            const response = await getData(`/study/reply/list?id=${id}&page=${page - 1}&size=10&sort=replyNo,asc`);
            console.log('POST 응답:', response);
            setReplyArr(response.reply);
            setMaxPage(response.replyCount);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqReplyContent = async (replyNo: number) => {
        try {
            const response = await getData(`/study/reply?id=${replyNo}`);
            console.log('POST 응답:', response);
            setReplyContent(response);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const insertReply = async (parentId: number) => {
        try {
            let contentData = parentId == -1 ? comment : replyContent;
            if (contentData == "") return;

            const data = {
                content: contentData,
                memberNo: user?.memberNo
            }

            const response = await postData(`/study/reply/write?id=${id}&parentId=${parentId}`, data);
            console.log('POST 응답:', response);
            if (response) {
                parentId == -1 ? setComment('') : setReplyContent('');
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const deleteReply = async (replyNo: number) => {
        try {
            const response = await getData(`/study/reply/list/delete?id=${replyNo}`);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const modifyReply = async (replyNo: number) => {
        try {
            if (replyContent == "") return;

            const data = {
                content: replyContent
            }

            const response = await postData(`/study/reply/list/update?id=${replyNo}`, data);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const groupJoin = async () => {
        try {
            if (user?.memberNo == undefined) {
                const isCheck = window.confirm('로그인이 필요합니다.');
                if (isCheck) navigate('/signin');
                return;
            }

            const data = {
                memberNo: user?.memberNo,
                studyNo: id
            }

            const response = await postData(`/study/studyJoin/exist`, data);
            console.log('POST 응답:', response);
            if (!response) {
                const responsePostData = await postData(`/study/studyJoin/insert`, data);
                console.log('POST 응답:', responsePostData);
                if (responsePostData) {
                    alert('참여 요청을 하였습니다.');
                } else {
                    alert('참여 요청에 실패하였습니다.');
                }
            } else {
                alert('이미 참여 요청을 하였습니다. 방장이 수락할때까지 대기 해주세요.');
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const acceptMember = async (memberNo: number) => {
        const data = {
            memberNo: memberNo,
            studyNo: id
        }

        try {
            const response = await postData(`/study/studyJoin/accept`, data);
            if (response) {
                console.log('POST 응답:', response);
                reqData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const refuseMember = async (memberNo: number) => {
        const data = {
            memberNo: memberNo,
            studyNo: id
        }

        try {
            const response = await postData(`/study/studyJoin/refuse`, data);
            if (response) {
                console.log('POST 응답:', response);
                reqData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const kickMember = async (memberNo: number) => {
        const data = {
            memberNo: memberNo,
            studyNo: id
        }

        try {
            const response = await postData(`/study/studyJoin/kick`, data);
            if (response) {
                console.log('POST 응답:', response);
                reqData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    useEffect(() => {
        if (firstInit.current == true) {
            reqCommentData();
        }
    }, [page]);

    useEffect(() => {
        reqData();

        if (user) {
            setIsLogin(true);
        }

        firstInit.current = true;
    }, []);

    return (
        <CustomDivStyle width={'100%'} margin={'auto'} maxWidth={1100} minWidth={700} marginTop={70} marginBottom={70}>
            <UnderLineTitle content='스터디 게시판' width={'100%'} />
            <MainTitle isOwner={isOwner} isLogin={isLogin} hashTags={studyViewInfo.hashTags} groupName={studyViewInfo.groupName} titleName={studyViewInfo.titleName} image={studyViewInfo.imgPath} curHeadCnt={studyViewInfo.currentHeadCnt} maxHeadCnt={studyViewInfo.maxHeadCnt} Friends={studyGroupList} joinReq={studyViewInfo.joinReq} acceptMember={acceptMember} refuseMember={refuseMember} kickMember={kickMember} />
            <hr></hr>
            <Content content={studyViewInfo.content} />
            <hr></hr>
            <ControlBtn isOwner={isOwner} isLogin={isLogin} groupName={studyViewInfo.groupName} Friends={studyGroupList} isJoin={isJoin} groupJoin={groupJoin} />
            <hr></hr>

            {
                isLogin &&
                <>
                    <ReplyListComponent
                        comment={replyArr}
                        width={"100%"}
                        replyMethod={(parentId: number) => insertReply(parentId)}
                        commentMethod={() => { insertReply(-1) }}
                        modifyMethod={(replyNo: number) => { modifyReply(replyNo) }}
                        deleteMethod={(replyId: number) => { deleteReply(replyId) }}
                        content={comment} setContent={setComment}
                        replyContent={replyContent}
                        setReplyContent={setReplyContent}
                        page={page}
                        pageOnChange={handleChange}
                        reqReplyContent={(id: number) => { reqReplyContent(id) }}
                        maxPage={maxPage} />
                    <hr></hr>
                </>
            }

            <Review reviewArr={reviewArr} />
        </CustomDivStyle>
    );
}

export default StudyView;
