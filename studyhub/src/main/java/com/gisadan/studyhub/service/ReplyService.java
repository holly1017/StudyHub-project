package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.*;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.repository.ReplyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final MemberService memberService;

    /**
     * 댓글 작성 (대댓글이 아닙니다)을 위한 메소드입니다.
     * @param study 댓글 작성할 스터디 게시물
     * @param content 댓글 내용
     * @return 작성 완료 여부
     */
    public Boolean insertReplyByStudy(Study study, String content, Reply reply, Member member) {;
        if(replyRepository.save(
                Reply.builder()
                        .content(content)
                        .reply(reply)
                        .board(study.getStudyBoard().getBoard())
                        .member(member)
                        .status(Status.NO)
                        .dept(reply == null ? 0 : reply.getDept() + 1)
                        .build()) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 스터디 게시물에 맞는 댓글목록을 페이지네이션 조건에 맞게 조회
     * @param board 댓글목록을 조회할 게시물
     * @param pageable 페이지네이션 조건
     * @return 댓글 목록
     */
    public List<Reply> selectReplyByStudy(Board board, Pageable pageable) {
        return replyRepository.findByBoardReply(board.getBoardNo(), pageable.getPageNumber()* pageable.getPageSize(), (pageable.getPageNumber()+1) * pageable.getPageSize() ).stream().toList();
    }

    /**
     * 댓글 한개 항목을 조회하는 메서드
     * @param id 조회할 댓글 번호
     * @return 댓글 내용
     */
    public Reply selectReplyById(Long id) {
        return replyRepository.findById(id).orElseThrow(() -> new NullPointerException("Reply is Null!!"));
    }

    /**
     * 댓글 삭제를 위한 메서드
     * @param id 삭제할 댓글 번호
     * @return 삭제유무
     */
    @Transactional
    public Boolean deleteReply(Long id) {
        Reply reply =  replyRepository.findById(id).orElseThrow(() -> new NullPointerException("Reply is Null!!"));
        reply.deleteReply();
        return true;
    }

    /**
     * 댓글 수정을 위한 메서드
     * @param id 수정할 댓글 번호
     * @param content 수정할 댓글 내용
     * @return 수정 여부
     */
    @Transactional
    public Boolean updateReply(Long id, String content) {
        Reply reply =  replyRepository.findById(id).orElseThrow(() -> new NullPointerException("Reply is Null!!"));
        reply.modifyContent(content);
        return true;
    }

    /**
     * 댓글 내용을 조회 하기 위한 쿼리문 메소드
     * @param id 조회하고자할 댓글 번호
     * @return 댓글 내용
     */
    public String selectReplyContentById(Long id) {
        return replyRepository.findById(id).orElseThrow(() -> new NullPointerException("Reply is Null!!")).getContent();
    }

    /**
     * 댓글의 갯수를 조회하기 위한 메서드
     * @param board 댓글의 갯수를 조회할 게시물
     * @return 댓글의 갯수
     */
    public Long selectReplyCount(Board board) {
        return (long) Math.ceil(replyRepository.countReplyByBoard(board) / 10.0);
    }

    /**
     * 스케쥴 게시물에 맞는 댓글목록을 페이지네이션 조건에 맞게 조회
     * @param schedule 댓글목록을 조회할 스케쥴 게시물
     * @param pageable 페이지네이션 조건
     * @return 댓글 목록
     */
    public List<Reply> selectReplyBySchedule(Schedule schedule, Pageable pageable) {
        return replyRepository.findByBoardReply(schedule.getScheduleBoard().getBoard().getBoardNo(), pageable.getPageNumber()* pageable.getPageSize(), (pageable.getPageNumber()+1) * pageable.getPageSize() ).stream().toList();
    }

    /**
     * 댓글 작성 (대댓글이 아닙니다)을 위한 메소드입니다.
     * @param schedule 댓글 작성할 스케쥴 게시물
     * @param content 댓글 내용
     * @return 작성 완료 여부
     */
    public Boolean insertReplyBySchedule(Schedule schedule, String content, Reply reply, Member member) {
        if(replyRepository.save(
                Reply.builder()
                        .content(content)
                        .reply(reply)
                        .board(schedule.getScheduleBoard().getBoard())
                        .member(member)
                        .status(Status.NO)
                        .dept(reply == null ? 0 : reply.getDept() + 1)
                        .build()) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 댓글 작성 (대댓글이 아닙니다)을 위한 메소드입니다.
     * @param trade 댓글 작성할 스케쥴 게시물
     * @param content 댓글 내용
     * @return 작성 완료 여부
     */
    public Boolean insertReplyByTrade(Trade trade, String content, Reply reply, Member member) {
        if(replyRepository.save(
                Reply.builder()
                        .content(content)
                        .reply(reply)
                        .board(trade.getTradeBoardList().getBoard())
                        .member(null)
                        .status(Status.NO)
                        .dept(reply == null ? 0 : reply.getDept() + 1)
                        .member(member)
                        .build()) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 거래 게시물에 맞는 댓글목록을 페이지네이션 조건에 맞게 조회
     * @param board 댓글목록을 조회할 거래 게시물
     * @param pageable 페이지네이션 조건
     * @return 댓글 목록
     */
    public List<Reply> selectReplyByTrade(Board board, Pageable pageable) {
        return replyRepository.findByBoardReply(board.getBoardNo(), pageable.getPageNumber()* pageable.getPageSize(), (pageable.getPageNumber()+1) * pageable.getPageSize() ).stream().toList();
    }

    /**
     * 댓글 작성 (대댓글이 아닙니다)을 위한 메소드입니다.
     * @param qnA 댓글 작성할 스케쥴 게시물
     * @param content 댓글 내용
     * @return 작성 완료 여부
     */
    public Boolean insertReplyByQnA(QnA qnA, String content, Reply reply, Member member) {
        if(replyRepository.save(
                Reply.builder()
                        .content(content)
                        .reply(reply)
                        .board(qnA.getQnaBoardList().getBoard())
                        .member(null)
                        .status(Status.NO)
                        .dept(reply == null ? 0 : reply.getDept() + 1)
                        .member(member)
                        .build()) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 질문 게시물에 맞는 댓글목록을 페이지네이션 조건에 맞게 조회
     * @param board 댓글목록을 조회할 스터디 게시물
     * @param pageable 페이지네이션 조건
     * @return 댓글 목록
     */
    public List<Reply> selectReplyByQnA(Board board, Pageable pageable) {
        return replyRepository.findByBoardReply(board.getBoardNo(), pageable.getPageNumber()* pageable.getPageSize(), (pageable.getPageNumber()+1) * pageable.getPageSize() ).stream().toList();
    }
}
