package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.QnA;
import com.gisadan.studyhub.entity.etc.Status;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResQnAAnswerDto {
    private Long id;
    private String title;
    private String content;
    private Status adooptStatus;
    private Long parentId;
    private String writer;
    private Status deleteStatus;
    private Long memberNo;
    private String profile;

    public static ResQnAAnswerDto from(QnA qna) {
        return ResQnAAnswerDto.builder()
                .id(qna.getQuestionNo())
                .writer(qna.getQnaBoardList().getBoard().getMember() == null ? "작성자" : qna.getQnaBoardList().getBoard().getMember().getNickName())
                .title(qna.getQnaBoardList().getBoard().getTitle())
                .content(qna.getQnaBoardList().getBoard().getContent())
                .adooptStatus(qna.getAdoptStatus())
                .deleteStatus(qna.getQnaBoardList().getBoard().getDeleteStatus())
                .parentId(qna.getParentQnA().getQuestionNo())
                .profile(qna.getQnaBoardList().getBoard().getMember() == null ? "" : qna.getQnaBoardList().getBoard().getMember().getProfile())
                .memberNo(qna.getQnaBoardList().getBoard().getMember() == null ? 0 : qna.getQnaBoardList().getBoard().getMember().getMemberNo()).build();
    }
}
