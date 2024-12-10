package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.StudyJoinReq;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResStudyGroupReqDto {
    private Long id;
    private String member;
    private Long memberNo;
    private String profile;

    public static ResStudyGroupReqDto of(StudyJoinReq studyJoinReq) {
        return ResStudyGroupReqDto.builder()
                .id(studyJoinReq.getJoinReqNo())
                .member(studyJoinReq.getMember() != null ? studyJoinReq.getMember().getNickName() : "")
                .memberNo(studyJoinReq.getMember() != null ? studyJoinReq.getMember().getMemberNo() : 0)
                .profile(studyJoinReq.getMember() != null ? studyJoinReq.getMember().getProfile() : "")
                .build();
    }
}
