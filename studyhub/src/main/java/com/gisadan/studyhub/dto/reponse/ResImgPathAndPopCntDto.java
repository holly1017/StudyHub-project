package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ResImgPathAndPopCntDto {
    private String imgPath;
    private int popCnt;
    private int point;

    public static ResImgPathAndPopCntDto of(String imgPath, int popCnt, int point) {
        return ResImgPathAndPopCntDto.builder()
                .imgPath(imgPath)
                .popCnt(popCnt)
                .point(point)
                .build();
    }
}
