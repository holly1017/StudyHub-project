package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.PointLog;
import com.gisadan.studyhub.entity.UsePointLog;
import com.gisadan.studyhub.entity.etc.UseDetail;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Builder
public class ResPointLogDto {
    // 날짜 사용내역 사용포인트 잔여포인트
    private Date useDate;
    private UseDetail useDetail;
    private int usePoint;
    private int remainPoint;

    public static ResPointLogDto of(PointLog pointLog) {
        return ResPointLogDto.builder()
                .useDate(pointLog.getUseDate())
                .useDetail(pointLog.getUsePointLog().getUseDetail())
                .usePoint(pointLog.getUsePoint())
                .remainPoint(pointLog.getRemainPoint())
                .build();
    }
}
