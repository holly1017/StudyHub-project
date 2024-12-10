package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.QnA;
import com.gisadan.studyhub.entity.etc.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResQnABoardByIdDto {
    private Long id;
    private String title;
    private String hashTagArr;
    private String content;
    private String writer;
    private int point;
    private Date uploadDate;
    private int view;
    private Long memberNo;
    private List<ResQnAAnswerDto> answer;
    private Long likeNo;
    private String profile;

    public static ResQnABoardByIdDto of(QnA qnA, List<QnA> answerList) {
        return ResQnABoardByIdDto.builder()
                .id(qnA.getQuestionNo())
                .hashTagArr(qnA.getHashTag())
                .title(qnA.getQnaBoardList().getBoard().getTitle())
                .writer(qnA.getQnaBoardList().getBoard().getMember() == null ? "루피" : qnA.getQnaBoardList().getBoard().getMember().getNickName())
                .point(qnA.getPoint())
                .uploadDate(qnA.getQnaBoardList().getBoard().getRegDate())
                .content(qnA.getQnaBoardList().getBoard().getContent())
                .view(qnA.getQnaBoardList().getBoard().getViewCount())
                .memberNo(qnA.getQnaBoardList().getBoard().getMember() == null ? 0 : qnA.getQnaBoardList().getBoard().getMember().getMemberNo())
                .likeNo(qnA.getAnswerLikeMemberList() != null && !qnA.getAnswerLikeMemberList().isEmpty()
                        ? qnA.getAnswerLikeMemberList().get(0).getLikeNo()
                        : 0)
                .profile(qnA.getQnaBoardList().getBoard().getMember() == null ? "" : qnA.getQnaBoardList().getBoard().getMember().getProfile())
                .answer(answerList.stream()
                        .filter(answer -> answer.getParentQnA().getQuestionNo() != null)  // parentId가 존재하는 답변만 필터링
                        .map(ResQnAAnswerDto::from)  // DTO로 변환
                        .collect(Collectors.toList()))
                .build();


    }
}
