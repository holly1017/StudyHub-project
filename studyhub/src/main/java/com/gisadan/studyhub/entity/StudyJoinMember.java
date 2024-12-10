package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.StudyGroupAuth;
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
public class StudyJoinMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long joinNo;
    @Enumerated(EnumType.STRING)
    private StudyGroupAuth studyGroupAuth;
    @ManyToOne
    @JoinColumn(name = "memberNo")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "studyNo")
    private Study study;

    public void setStudy(Study study) {
        this.study = study;
    }

    public void changeStudyGroupAuth(StudyGroupAuth studyGroupAuth) {
        this.studyGroupAuth = studyGroupAuth;
    }
}
