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
public class QnABoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long qnaBoardNo;
    @OneToOne
    @JoinColumn(name = "questionNo")
    private QnA qna;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "boardNo")
    private Board board;

    public void setQnA(QnA qna) { this.qna = qna;}

}
