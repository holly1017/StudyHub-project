package com.gisadan.studyhub.dto.reponse;

import com.gisadan.studyhub.entity.Reply;
import com.gisadan.studyhub.entity.Trade;
import com.gisadan.studyhub.entity.etc.ProductStatus;
import com.gisadan.studyhub.entity.etc.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResTradeBoardByIdDto {
    private Long id;
    private String writer;
    private String productName;
    private int price;
    private Date regDate;
    private String content;
    private List<String> imgPath;
    private ProductStatus productStatus;
    private List<Long> imgNo;
    private Status sellStatus;
    private Long writerId;
    private List<ResReplyDto> reply;
    private Long replyCount;
    private String profile;

    public static ResTradeBoardByIdDto of (Trade trade, List<Reply> replyList, Long replyCount) {
        return ResTradeBoardByIdDto.builder()
                .id(trade.getTradeNo())
                .writer(trade.getTradeBoardList().getBoard().getMember() == null ? "" : trade.getTradeBoardList().getBoard().getMember().getNickName())
                .productName(trade.getTradeBoardList().getBoard().getTitle())
                .productStatus(trade.getProductStatus())
                .price(trade.getPrice())
                .regDate(trade.getTradeBoardList().getBoard().getRegDate())
                .imgPath(trade.getTradeBoardList().getBoard().getImageList().stream().map(image -> image.getImgPath()).toList())
                .imgNo(trade.getTradeBoardList().getBoard().getImageList().stream().map(image -> image.getImgNo()).toList())
                .content(trade.getTradeBoardList().getBoard().getContent())
                .sellStatus(trade.getSellStatus())
                .writerId(trade.getTradeBoardList().getBoard().getMember() == null ? 0 : trade.getTradeBoardList().getBoard().getMember().getMemberNo())
                .replyCount(replyCount)
                .reply(replyList.stream().map(ResReplyDto::of).toList())
                .profile(trade.getTradeBoardList().getBoard().getMember() == null ? "" : trade.getTradeBoardList().getBoard().getMember().getProfile())
                .build();
    }
}
