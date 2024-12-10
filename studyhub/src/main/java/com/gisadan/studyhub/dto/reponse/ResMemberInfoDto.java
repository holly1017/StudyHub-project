package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ResMemberInfoDto {
    private String memberId;
    private String nickName;
    private String profile;
    private int popularity;
    private String address;
    private String email;
    private String phone;

    public static ResMemberInfoDto of(Member member) {
        return ResMemberInfoDto.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .profile(member.getProfile())
                .popularity(member.getPopularity())
                .address(member.getAddress())
                .email(member.getEmail())
                .phone(member.getPhone())
                .build();
    }
}
