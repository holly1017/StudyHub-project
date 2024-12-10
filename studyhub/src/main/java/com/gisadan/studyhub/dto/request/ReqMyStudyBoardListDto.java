package com.gisadan.studyhub.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
public class ReqMyStudyBoardListDto {
    private Pageable pageable;
    private long memberNo;
}
