package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResCalendarListDto {
    private Long id;
    private String title;
    private Date start;
    private Date end;

    public  static ResCalendarListDto of(Schedule schedule) {
        return ResCalendarListDto.builder()
                .id(schedule.getScheduleNo())
                .title(schedule.getScheduleBoard().getBoard().getTitle())
                .start(schedule.getStartDate())
                .end(schedule.getEndDate())
                .build();
    }
}
