package com.gisadan.studyhub.dto.reponse;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ResPointLogDataDto {
    private int pointLogCount;
    private List<ResPointLogDto> pointLogs;

    public static ResPointLogDataDto of(int pointLogCount, List<ResPointLogDto> ResPointLogDtoList) {
        return ResPointLogDataDto.builder()
                .pointLogCount(pointLogCount)
                .pointLogs(ResPointLogDtoList)
                .build();
    }
}
