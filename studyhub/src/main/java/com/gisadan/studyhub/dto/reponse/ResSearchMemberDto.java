package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Member;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class ResSearchMemberDto {
    private Long memberNo;
    private String nickName;
    private String profile;
    private boolean hasSentRequest;

    public static ResSearchMemberDto of(Member member) {
        return ResSearchMemberDto.builder()
                .memberNo(member.getMemberNo())
                .nickName(member.getNickName())
                .profile(member.getProfile())
                .hasSentRequest(false)
                .build();
    }
}
