package com.gisadan.studyhub.dto.reponse;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ResReplyDataDto {
    private Long replyCount;
    private List<ResReplyDto> reply;

    public static ResReplyDataDto of(Long replyCount, List<ResReplyDto> resReplyDtoList) {
        return ResReplyDataDto.builder().replyCount(replyCount).reply(resReplyDtoList).build();
    }
}
