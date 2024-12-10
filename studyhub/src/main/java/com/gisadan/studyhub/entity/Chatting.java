package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Chatting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chattingNo;
    private String content;
    private String sender;
    private Date time;

    @ManyToOne
    @JoinColumn(name = "studyNo")
    private Study study;
}
