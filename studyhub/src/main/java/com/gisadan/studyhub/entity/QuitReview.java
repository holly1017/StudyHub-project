package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuitReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reviewNo;
    private int starPoint;
    private String content;

    @ManyToOne
    @JoinColumn(name = "studyNo")
    private Study study;
}
