package com.gisadan.studyhub.dto.request;

import com.gisadan.studyhub.entity.PointLog;
import com.gisadan.studyhub.entity.etc.UseDetail;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqMemberPointDto {
    private Long memberNo;
    private int point;
    private UseDetail useDetail;
}
