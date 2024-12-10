package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.etc.MemberGrade;
import com.gisadan.studyhub.entity.etc.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResMemberDto {
    private Long memberNo;
    private String memberId;
    private String nickName;
    private String profile;
    private int point;
    private String hashTag;

    public static ResMemberDto of(Member member) {
        return ResMemberDto.builder()
                .memberNo(member.getMemberNo())
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .profile(member.getProfile())
                .point(member.getPoint())
                .hashTag(member.getHashTag())
                .build();
    }
}
