package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqMemberDto {
    private String id;
    private String pw;
    private String nickName;
    private String postcode;
    private String address;
    private String detailAddress;
    private String[] hashTag;
    private String email;
    private String phone;
}
