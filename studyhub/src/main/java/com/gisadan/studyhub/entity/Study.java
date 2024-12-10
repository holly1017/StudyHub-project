package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studyNo;
    @Column(name = "study_hash_tag")
    private String hashTag;
    private String groupName;
    private int curHeadCount;
    private int maxHeadCount;

    public void setHashTag(String[] hashTag) {
        this.hashTag = String.join(",", hashTag);
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void setMaxHeadCount(int maxHeadCount) {
        this.maxHeadCount = maxHeadCount;
    }

    public void incrementHeadCount() {
        if (this.curHeadCount < this.maxHeadCount) this.curHeadCount++;
    }

    public void decrementHeadCount() {
        if (this.curHeadCount > 1)  {
            this.curHeadCount--;
        } else if (this.curHeadCount == 1) {
            this.studyBoard.getBoard().setDeleteStatus();
        } else {
        }
    }

    @Builder
    public Study(String hashTag, String groupName, int maxHeadCount) {
        this.hashTag = hashTag;
        this.groupName = groupName;
        this.maxHeadCount = maxHeadCount;
        this.curHeadCount = 1;
    }

    @OneToMany(mappedBy = "study")
    private List<Chatting> chattingList = new ArrayList<>();
    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY)
    private List<Schedule> scheduleList = new ArrayList<>();
    @OneToOne(mappedBy = "study", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private StudyBoard studyBoard;
    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudyJoinMember> studyJoinMemberList = new ArrayList<>();
    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudyJoinReq> studyJoinReqList = new ArrayList<>();
    @OneToMany(mappedBy = "study")
    private List<QuitReview> quitReviewList = new ArrayList<>();

    public void addStudyBoardList(StudyBoard studyBoard) {
        studyBoard.setStudy(this);
        this.studyBoard = studyBoard;
    }

    public void addStudyJoinMemberList(StudyJoinMember studyJoinMember) {
        studyJoinMember.setStudy(this);
        this.studyJoinMemberList.add(studyJoinMember);
    }
}
