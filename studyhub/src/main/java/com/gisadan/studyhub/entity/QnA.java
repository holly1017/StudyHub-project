package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.Status;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QnA {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long questionNo;
    private String hashTag;
    private int point;

    @Enumerated(EnumType.STRING)
    private Status adoptStatus;
    @OneToMany(mappedBy = "qna")
    List<AnswerLikeMember> answerLikeMemberList = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentNo")
    private QnA parentQnA;
    @OneToMany(mappedBy = "parentQnA", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<QnA> qnaList = new ArrayList<>();
    @OneToOne(mappedBy = "qna", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private QnABoard qnaBoardList;

    @Builder
    public QnA (String hashTag, int point, Status adoptStatus, Long questionNo, QnA parentQnA) {
        this.hashTag = hashTag;
        this.point = point;
        this.adoptStatus = adoptStatus;
        this.questionNo = questionNo;
        this.parentQnA = parentQnA;
    }

    public void addQnABoardList(QnABoard qnABoard) {
        qnABoard.setQnA(this);
        this.qnaBoardList = qnABoard;
    }


}
