package com.gisadan.studyhub.entity;

import jakarta.persistence.*;

@Entity
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long alarmNo;
    private String content;

    @ManyToOne
    @JoinColumn(name = "memberNo")
    private Member member;
}
