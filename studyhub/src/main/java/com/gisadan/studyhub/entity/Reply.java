package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long replyNo;
    @Enumerated(EnumType.STRING)
    private Status status;

    public void deleteReply() {
        this.status = Status.YES;
    }

    public void modifyContent(String content) {
        this.content = content;
    }

    private String content;
    private int dept;
    @ManyToOne
    @JoinColumn(name = "parentsNo")
    private Reply reply;
    @OneToMany(mappedBy = "reply")
    List<Reply> replyList = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "boardNo")
    private Board board;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberNo")
    private Member member;
}
