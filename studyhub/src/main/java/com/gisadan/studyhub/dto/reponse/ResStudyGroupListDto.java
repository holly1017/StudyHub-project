package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.StudyJoinMember;
import com.gisadan.studyhub.entity.etc.StudyGroupAuth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResStudyGroupListDto {
    private Long id;
    private Long memberNo;
    private String member;
    private StudyGroupAuth studyGroupAuth;
    private String profile;

    public static ResStudyGroupListDto of(StudyJoinMember studyJoinMember) {
        return ResStudyGroupListDto.builder()
                .id(studyJoinMember.getJoinNo())
                .memberNo(studyJoinMember.getMember() != null ? studyJoinMember.getMember().getMemberNo() : 0)
                .member(studyJoinMember.getMember() != null ? studyJoinMember.getMember().getNickName() : "")
                .studyGroupAuth(studyJoinMember.getStudyGroupAuth())
                .profile(studyJoinMember.getMember() != null ? studyJoinMember.getMember().getProfile() : "")
                .build();
    }
}
