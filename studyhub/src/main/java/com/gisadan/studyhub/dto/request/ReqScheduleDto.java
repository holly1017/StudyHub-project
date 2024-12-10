package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqScheduleDto {
    private String title;
    private String content;
    private String stDate;
    private String edDate;
    private String stTime;
    private String edTime;
}
