package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.MemberGrade;
import com.gisadan.studyhub.entity.etc.Status;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberNo;
    private String memberId;
    private String password;
    private String nickName;
    private String address;
    private String phone;
    private int point;
    private int popularity;
    private String email;
    private String profile;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private MemberGrade grade;
    private String hashTag;

    @OneToMany(mappedBy = "member")
    private List<Alarm> alarmList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<AnswerLikeMember> answerLikeMemberList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Friend> friendList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<PointLog> pointLogList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Reply> replyList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<StudyJoinMember> studyJoinMemberList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<StudyJoinReq> studyJoinReqList = new ArrayList<>();
}