package com.gisadan.studyhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TradeBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tradeBoardNo;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tradeNo")
    private Trade trade;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "boardNo")
    private Board board;

    public void setTrade(Trade trade) { this.trade = trade; }
}
