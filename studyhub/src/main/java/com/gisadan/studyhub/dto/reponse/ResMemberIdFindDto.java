package com.gisadan.studyhub.dto.reponse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResMemberIdFindDto {
    private String nickName;
    private String memberId;

    public static ResMemberIdFindDto of(String nickName, String memberId) {
        return ResMemberIdFindDto.builder().memberId(memberId).nickName(nickName).build();
    }
}
