package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Reply;
import com.gisadan.studyhub.entity.etc.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResReplyDto {
    private Long id;
    private String user;
    private String content;
    private Long parentId;
    private int dept;
    private Status status;
    private Long memberNo;
    private String profile;

    public static ResReplyDto of(Reply reply) {
        return ResReplyDto.builder()
                .id(reply.getReplyNo())
                .user(reply.getMember() != null ? reply.getMember().getNickName() : null)
                .content(reply.getContent())
                .parentId(reply.getReply() == null ? -1 : reply.getReply().getReplyNo())
                .dept(reply.getDept())
                .status(reply.getStatus())
                .memberNo(reply.getMember() != null ? reply.getMember().getMemberNo() : 0)
                .profile(reply.getMember() != null ? reply.getMember().getProfile() : "")
                .build();
    }
}
