package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long scheduleBoardNo;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleNo")
    private Schedule schedule;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "boardNo")
    private Board board;

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }
}
