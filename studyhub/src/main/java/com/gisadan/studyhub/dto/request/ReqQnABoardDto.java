package com.gisadan.studyhub.dto.request;


import com.gisadan.studyhub.entity.QnA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqQnABoardDto {

    private Long id;

    private String title;
    private String content;
    private String[] hashTag;
    private int point;
    private Long memberNo;

    private Long parentId;

}
