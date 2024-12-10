package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.etc.Status;
import lombok.Builder;
import lombok.Getter;
import com.gisadan.studyhub.entity.Trade;

import java.util.List;

@Getter
@Builder
public class ResTradeBoardListDto {
    private Long id;
    private String thumbNail;
    private String content;
    private String subContent;
    private int price;
    private Status sellStatus;

    public static ResTradeBoardListDto of (Trade trade) {
        return ResTradeBoardListDto.builder()
                .id(trade.getTradeNo())
                .content(trade.getTradeBoardList().getBoard().getTitle())
                .subContent(trade.getTradeBoardList().getBoard().getMember() == null ? "" : trade.getTradeBoardList().getBoard().getMember().getNickName())
                .price(trade.getPrice())
                .thumbNail(trade.getThumbNail())
                .sellStatus(trade.getSellStatus())
                .build();
    }
}
