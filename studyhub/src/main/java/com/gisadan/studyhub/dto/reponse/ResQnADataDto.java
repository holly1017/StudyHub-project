package com.gisadan.studyhub.dto.reponse;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ResQnADataDto {
    private int questionCount;
    private List<ResQnABoardListDto> questions;

    public static ResQnADataDto of(int questionCount, List<ResQnABoardListDto> resQnABoardListDto) {
        return ResQnADataDto.builder().questionCount(questionCount).questions(resQnABoardListDto).build();
    }
}
