package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Trade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TradeRepository extends JpaRepository<Trade,Long> {
    @Query("SELECT t " +
            "FROM Trade t " +
            "JOIN FETCH t.tradeBoardList tb " +
            "JOIN FETCH tb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sb " +
            "LEFT JOIN FETCH b.studyBoard sdb")
    Page<Trade> findAll(Pageable pageable);

    @Query("SELECT t " +
            "FROM Trade t " +
            "JOIN FETCH t.tradeBoardList tb " +
            "JOIN FETCH tb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sb " +
            "LEFT JOIN FETCH b.studyBoard sdb " +
            "JOIN FETCH b.member " +
            "WHERE t.tradeNo = :tradeNo")
    Trade findByTradeNo(Long tradeNo);
}
