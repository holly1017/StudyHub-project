package com.gisadan.studyhub.entity;

import com.gisadan.studyhub.entity.etc.ProductStatus;
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
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tradeNo;
    private String thumbNail;
    private int price;
    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus;
    private Status sellStatus;

    @Builder
    public Trade (int price, ProductStatus productStatus, Status sellStatus, String thumbNail) {
        this.price = price;
        this.productStatus = productStatus;
        this.sellStatus = sellStatus;
        this.thumbNail = thumbNail;
    }

    @OneToOne(mappedBy = "trade", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private TradeBoard tradeBoardList;

    public void addTradeBoardList(TradeBoard tradeBoard) {
        tradeBoard.setTrade(this);
        this.tradeBoardList = tradeBoard;
    }
}
