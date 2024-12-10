package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.QuitReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResReviewDto {
    private Long id;
    private int starPoint;
    private String content;

    public static ResReviewDto of(QuitReview quitReview) {
        return ResReviewDto.builder()
                .id(quitReview.getReviewNo())
                .starPoint(quitReview.getStarPoint())
                .content(quitReview.getContent())
                .build();
    }
}
