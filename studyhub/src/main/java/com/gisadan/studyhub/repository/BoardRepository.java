package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board,Long> {
    @Query("SELECT b from Board b JOIN FETCH b.studyBoard sb JOIN FETCH sb.study s JOIN FETCH b.member m WHERE s.studyNo = :studyNo")
    Board findBoardByStudyNo(@Param(value = "studyNo") Long studyNo);

    @Query("SELECT b FROM Board b JOIN FETCH b.scheduleBoard sb JOIN FETCH sb.schedule s WHERE s.scheduleNo = :calendarNo")
    Board findBoardByCalendarNo(@Param(value = "calendarNo") Long calendarNo);

    @Query("SELECT b FROM Board b JOIN FETCH b.tradeBoardList tb JOIN FETCH tb.trade t WHERE t.tradeNo = :tradeNo")
    Board findBoardByTradeNo(@Param(value = "tradeNo") Long tradeNo);

    @Query("SELECT b FROM Board b JOIN FETCH b.qnaBoardList qb JOIN FETCH qb.qna q WHERE qb.qnaBoardNo = :questionNo")
    Board findBoardByQuestionNo(@Param(value = "questionNo") Long questionNo);
}
