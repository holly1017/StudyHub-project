package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.QnA;
import com.gisadan.studyhub.entity.etc.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QnARepository extends JpaRepository<QnA, Long> {

    @Query("SELECT q " +
            "FROM QnA q " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "LEFT JOIN FETCH b.studyBoard sb " +
            "LEFT JOIN FETCH b.scheduleBoard " +
            "LEFT JOIN FETCH q.answerLikeMemberList al " +
            "LEFT JOIN FETCH al.member " +
            "WHERE q.questionNo = :QuestionNo")
    QnA findByQuestionNo(Long QuestionNo);

    @EntityGraph(attributePaths = {"qnaBoardList", "qnaBoardList.board"})
    @Query("SELECT q " +
            "FROM QnA q " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "LEFT JOIN FETCH b.studyBoard sb " +
            "LEFT JOIN FETCH b.scheduleBoard sdb " +
            "WHERE q.parentQnA IS NULL " +
            "AND b.deleteStatus = 'NO'")
    Page<QnA> findByParentQnAIsNull(Pageable pageable);

    @Query("SELECT q " +
            "FROM QnA q " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sb " +
            "LEFT JOIN FETCH b.studyBoard stb " +
            "WHERE q.parentQnA IS NULL " +
            "AND b.deleteStatus = 'NO' " +
            "ORDER BY (SELECT COUNT(ql) FROM QnA ql WHERE ql.parentQnA = q) DESC")
    List<QnA> findTop5ByParentQnAIsNull(Pageable pageable);

    @Query("SELECT q " +
            "FROM QnA q " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sb " +
            "LEFT JOIN FETCH b.studyBoard stb " +
            "WHERE b.title LIKE %:content% " +
            "AND q.parentQnA IS NULL " +
            "AND b.deleteStatus = :status")
    Page<QnA> findByQnABoardListBoardContentContainingAndStatus(
            @Param("content") String content,
            @Param("status") Status status,
            Pageable pageable);

    QnA findParentNoByQuestionNo(Long questionNo);

    @Query("SELECT q " +
            "FROM QnA q " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sb " +
            "LEFT JOIN FETCH b.studyBoard stb " +
            "LEFT JOIN FETCH q.answerLikeMemberList al " +
            "LEFT JOIN FETCH al.member " +
            "WHERE q.parentQnA = :parentNo")
    List<QnA> findByParentNo(QnA parentNo);


}
