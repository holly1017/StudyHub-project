package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Reply;
import com.gisadan.studyhub.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResCalendarDto {
    private Long id;
    private String writer;
    private String title;
    private String content;
    private Date start;
    private Date end;
    private String stTime;
    private String edTime;
    private Long replyCount;
    private Long calendarMemberNo;
    private List<ResReplyDto> reply;

    public  static ResCalendarDto of(Schedule schedule, Long replyCount, List<Reply> replyList) {
        return ResCalendarDto.builder()
                .id(schedule.getScheduleNo())
                .writer(schedule.getScheduleBoard().getBoard().getMember() != null ? schedule.getScheduleBoard().getBoard().getMember().getNickName() : "")
                .title(schedule.getScheduleBoard().getBoard().getTitle())
                .content(schedule.getScheduleBoard().getBoard().getContent())
                .start(schedule.getStartDate())
                .end(schedule.getEndDate())
                .stTime(schedule.getStartTime())
                .edTime(schedule.getEndTime())
                .replyCount(replyCount)
                .calendarMemberNo(schedule.getScheduleBoard().getBoard().getMember() != null ? schedule.getScheduleBoard().getBoard().getMember().getMemberNo() : 0)
                .reply(replyList.stream().map(ResReplyDto::of).toList())
                .build();
    }
}
