package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long scheduleNo;
    private Date startDate;
    private Date endDate;
    private String startTime;
    private String endTime;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "studyNo")
    private Study study;
    @OneToOne(mappedBy = "schedule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ScheduleBoard scheduleBoard;

    public void addStudyBoardList(ScheduleBoard scheduleBoard) {
        scheduleBoard.setSchedule(this);
        this.scheduleBoard = scheduleBoard;
    }
}
