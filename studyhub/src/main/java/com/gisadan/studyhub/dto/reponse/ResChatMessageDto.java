package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Chatting;
import com.gisadan.studyhub.etc.ChatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResChatMessageDto {
    private String message;
    private String user;
    private Boolean isMe;
    private ChatType chatType;
    private Long memberNo;
    private String profile;

    public static ResChatMessageDto of(Chatting chatting) {
        return ResChatMessageDto.builder().message(chatting.getContent()).user(chatting.getSender()).isMe(false).build();
    }
}
