package com.gisadan.studyhub.dto.reponse;
import com.gisadan.studyhub.entity.etc.Status;
import lombok.Builder;
import lombok.Getter;
import com.gisadan.studyhub.entity.QnA;
import lombok.Setter;


@Getter
@Builder
@Setter
public class ResQnABoardListDto {
    private Long id;
    private String title;
    private String writer;
    private int replyCnt;
    private int point;
    private Status adoptStatus;
    private Status deleteStatus;
    private Long memberNo;

    public static ResQnABoardListDto of (QnA qnA, int replyCnt) {
        return ResQnABoardListDto.builder()
                .id(qnA.getQuestionNo())
                .title(qnA.getQnaBoardList().getBoard().getTitle())
                .writer(qnA.getQnaBoardList().getBoard().getMember() == null ? "익명" : qnA.getQnaBoardList().getBoard().getMember().getNickName())
                .replyCnt(replyCnt)
                .point(qnA.getPoint())
                .adoptStatus(qnA.getAdoptStatus())
                .deleteStatus(qnA.getQnaBoardList().getBoard().getDeleteStatus())
                .memberNo(qnA.getQnaBoardList().getBoard().getMember() == null ? 0 : qnA.getQnaBoardList().getBoard().getMember().getMemberNo())
                .build();
    }
}
