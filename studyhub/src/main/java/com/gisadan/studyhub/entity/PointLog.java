package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Getter
@Setter
public class PointLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long historyNo;
    private Date useDate;
    private int usePoint;
    private int remainPoint;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberNo")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "detailNo")
    private UsePointLog usePointLog;
}
