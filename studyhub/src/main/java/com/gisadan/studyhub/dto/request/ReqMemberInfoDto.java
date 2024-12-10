package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqMemberInfoDto {
    private String memberId;
    private String nickName;
    private String postCode;
    private String address;
    private String detailAddress;
    private String email;
    private String phone;
    private String password;
}
