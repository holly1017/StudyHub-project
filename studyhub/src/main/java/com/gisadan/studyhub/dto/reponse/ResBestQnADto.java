package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.QnA;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.aspectj.weaver.patterns.TypePatternQuestions;

@Getter
@Builder
public class ResBestQnADto {

    private String questionTitle;
    private int replyCnt;
    private Long id;

    public static ResBestQnADto of (QnA qnA, int replyCnt) {
        return ResBestQnADto.builder()
                .id(qnA.getQuestionNo())
                .questionTitle(qnA.getQnaBoardList().getBoard().getTitle())
                .replyCnt(replyCnt).build();
    }
}
