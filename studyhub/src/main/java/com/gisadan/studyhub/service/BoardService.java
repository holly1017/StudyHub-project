package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.Board;
import com.gisadan.studyhub.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    /**
     * 스터디 그룹 번호로 게시물 객체를 조회하기 위한 메소드
     * @param studyNo 스터디 그룹 번호
     * @return 게시물 객체
     */
    public Board findBoardByStudyNo(Long studyNo) {
        return boardRepository.findBoardByStudyNo(studyNo);
    }

    /**
     * 스케쥴 번호로 게시물 객체를 조회하기 위한 메소드
     * @param calendarNo 스케쥴 번호
     * @return 게시물 객체
     */
    public Board findBoardByCalendarNo(Long calendarNo) { return boardRepository.findBoardByCalendarNo(calendarNo);}

    /**
     * 거래 번호로 게시물 객체를 조회하기 위한 메소드
     * @param tradeNo
     * @return 게시물 객체
     */
    public Board findBoardByTradeNo(Long tradeNo) {
        return boardRepository.findBoardByTradeNo(tradeNo);
    }

    /**
     * 질문 번호로 게시물 객체를 조회하기 위한 메소드
     * @param questionNo
     * @return 게시물 객체
     */
    public Board findBoardByQuestionNo(Long questionNo) {
        return boardRepository.findBoardByQuestionNo(questionNo);
    }
}
