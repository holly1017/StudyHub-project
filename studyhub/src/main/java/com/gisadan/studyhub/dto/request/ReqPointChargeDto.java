package com.gisadan.studyhub.dto.request;

import com.gisadan.studyhub.entity.etc.UseDetail;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqPointChargeDto {
    private String impUid;
    private Long memberNo;
    private UseDetail useDetail;
}
