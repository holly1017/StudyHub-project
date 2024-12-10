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
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imgNo;
    private String imgPath;
    private String imgName;
    @ManyToOne
    @JoinColumn(name = "boardNo")
    private Board board;

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }
    public void setBoard(Board board) {
        this.board = board;
    }
}
