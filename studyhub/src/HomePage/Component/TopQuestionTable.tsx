import React from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import { EmptyTd, QuestionTable, QuestionTitleA, QusetionTitleTD, ReplyCount } from "./TopQuestionTableStyle";
import { useUser } from "../../Common/UserContext";
import { useNavigate } from "react-router-dom";

interface Question {
    id: number;
    questionTitle: string,
    replyCnt: number,
}

interface TopQuestionTableProps {
    questionList: Question[]
}

const UpgradeTopQuest: React.FC<TopQuestionTableProps> = ({ questionList }) => {

    const {user} = useUser();
    const navigate = useNavigate();

    const loginCheck = (id : number) => {
        if (user) {
          navigate(`question/${id}`);
        } else {
          const isOk = window.confirm('로그인 후 이용가능합니다. 로그인을 하시겠습니까?');
          if (isOk) navigate('/signin');
        }
      }

    return (
        <CustomDivStyle height={410} backgroundColor="white" marginTop={50} width={"100%"} display="flex" justifyContent="center" minWidth={768} maxWidth={"100%"}>
            <CustomDivStyle display="flex" width="100%" justifyContent="space-between" alignItems="center" gap={50} maxWidth={1017}>
                <CustomDivStyle flex={1}>
                    <QuestionTable>
                        <tbody>
                            {questionList.map((quest, index) => (
                                <tr key={index}>
                                    <EmptyTd></EmptyTd>
                                    <QusetionTitleTD>
                                        <QuestionTitleA onClick={() => loginCheck(quest.id)}>Q.{quest.questionTitle}</QuestionTitleA>
                                    </QusetionTitleTD>
                                    <ReplyCount>
                                        A.{quest.replyCnt}
                                    </ReplyCount>
                                    <EmptyTd></EmptyTd>
                                </tr>
                            ))}
                        </tbody>
                    </QuestionTable>
                </CustomDivStyle>

                <CustomDivStyle display="flex" flexDirection="column" flex={1} justifyContent="space-evenly" height={250} alignItems="flex-start">
                    <CustomDivStyle fontSize={35} fontWeight={700}>
                        금주의 베스트 답변을 통해 <br />
                        당신의 궁금증을 해소해보세요!
                    </CustomDivStyle>
                    <CustomDivStyle>
                        어려운 문제에 포인트를 걸어 다른 사용자분들의 도움을 받아보세요. <br />
                        질문 해결을 통해 포인트를 얻을 수도 있습니다!
                    </CustomDivStyle>
                </CustomDivStyle>
            </CustomDivStyle>

        </CustomDivStyle>
    )
}

export default UpgradeTopQuest;