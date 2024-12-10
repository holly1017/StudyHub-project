package com.gisadan.studyhub.dto.request;

import com.gisadan.studyhub.entity.etc.ProductStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqTradeBoardDto {
    private String title;
    private String content;
    private ProductStatus productStatus;
    private int price;
    private String thumbNail;
    private Long memberNo;
}
