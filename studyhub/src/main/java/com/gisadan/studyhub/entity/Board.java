package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardNo;
    private String title;
    @Lob
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDate;
    private int viewCount;
    @Enumerated(EnumType.STRING)
    private Status deleteStatus;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDeleteStatus() {
        this.deleteStatus = Status.YES;
    }

    @Builder
    public Board(String title, String content, Member member) {
        this.title = title;
        this.content = content;
        this.deleteStatus = Status.NO;
        this.regDate = new Date();
        this.member = member;
    }

    @ManyToOne
    @JoinColumn(name = "memberNo")
    private Member member;
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private Set<Image> imageList = new HashSet<>();
    @OneToMany(mappedBy = "board")
    private List<QnABoard> qnaBoardList = new ArrayList<>();
    @OneToMany(mappedBy = "board")
    private List<Reply> replyList = new ArrayList<>();
    @OneToOne(mappedBy = "board", fetch = FetchType.LAZY)
    private ScheduleBoard scheduleBoard;
    @OneToOne(mappedBy = "board", fetch = FetchType.LAZY)
    private StudyBoard studyBoard;
    @OneToMany(mappedBy = "board")
    private List<TradeBoard> tradeBoardList = new ArrayList<>();

    public void addimageList(Image image) {
        image.setBoard(this);
        this.imageList.add(image);
    }

    public void addImageList(List<Image> imageList) {
        for (Image image : imageList) {
            image.setBoard(this);
        }
        this.imageList.addAll(imageList);
    }
}
