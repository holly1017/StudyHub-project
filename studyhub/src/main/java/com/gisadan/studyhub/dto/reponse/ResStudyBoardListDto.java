package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Study;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ResStudyBoardListDto {
    private Long id;
    private List<String> imgPath;
    private String title;
    private int currentHeadCnt;
    private int maxHeadCnt;
    public static ResStudyBoardListDto of (Study study) {
        return ResStudyBoardListDto.builder()
                .id(study.getStudyNo())
                .imgPath(study.getStudyBoard().getBoard().getImageList().stream().map(image -> image.getImgPath()).toList())
                .title(study.getStudyBoard().getBoard().getTitle())
                .currentHeadCnt(study.getCurHeadCount())
                .maxHeadCnt(study.getMaxHeadCount())
                .build();
    }
}
