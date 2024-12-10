package com.gisadan.studyhub.dto.reponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqStudyJoinDelegateDto {
    private Long memberNo;
    private Long delegateMemberNo;
    private Long studyNo;
}
