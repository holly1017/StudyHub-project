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
public class StudyJoinReq {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long joinReqNo;
    @ManyToOne
    @JoinColumn(name = "memberNo")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "studyNo")
    private Study study;
}
