package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerLikeMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long likeNo;
    @ManyToOne
    @JoinColumn(name = "memberNo")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "questionNo")
    private QnA qna;
}
