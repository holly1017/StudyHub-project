package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StudyBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studyBoardNo;
    @OneToOne
    @JoinColumn(name = "studyNo")
    private Study study;
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "boardNo")
    private Board board;

    public void setStudy(Study study) {
        this.study = study;
    }
}
