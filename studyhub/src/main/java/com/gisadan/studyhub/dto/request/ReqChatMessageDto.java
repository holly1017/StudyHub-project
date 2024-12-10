package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqChatMessageDto {
    private String message;
    private String user;
    private Long memberNo;
    private String profile;
}
