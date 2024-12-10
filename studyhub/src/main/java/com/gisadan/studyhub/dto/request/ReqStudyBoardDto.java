package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqStudyBoardDto {
    private String title;
    private String content;
    private String groupName;
    private String[] hashTag;
    private int maxHeadCount;
    private Long memberNo;
}
