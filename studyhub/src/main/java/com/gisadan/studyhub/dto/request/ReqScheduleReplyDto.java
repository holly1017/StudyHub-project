package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ReqScheduleReplyDto {
    private Long studyId;
    private Long calendarId;
    private Long parentId;
    private String content;
    private Long memberNo;
}
