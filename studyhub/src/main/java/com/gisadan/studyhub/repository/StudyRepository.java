package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.etc.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study,Long> {
    @EntityGraph(attributePaths = {"studyBoard", "studyBoardList.board", "studyBoardList.board.imageList"})
    Page<Study> findAll(Pageable pageable);

    @Query("SELECT s FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "JOIN FETCH b.member m " +
            "LEFT JOIN FETCH s.quitReviewList qr " +
            "LEFT JOIN FETCH b.scheduleBoard sdb " +
            "LEFT JOIN FETCH  sdb.schedule sd " +
            "LEFT JOIN FETCH sd.study ss " +
            "WHERE s.studyNo = :studyNo")
    Study findByStudyNo(@Param("studyNo") Long studyNo);

    @Query("SELECT s FROM Study s " +
            "JOIN s.studyBoard sb " +
            "JOIN sb.board b " +
            "WHERE b.deleteStatus = :deleteStatus AND s.studyNo = :studyNo")
    Study findByBoardDeleteStatusAndStudyNo(
            @Param("deleteStatus") Status deleteStatus,
            @Param("studyNo") Long studyNo);

    @Query("SELECT s FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "JOIN FETCH b.member m " +
            "WHERE b.deleteStatus = :deleteStatus")
    Page<Study> findAllByBoardDeleteStatusAndStudyNo(
            @Param("deleteStatus") Status deleteStatus, Pageable pageable);

    @Query("SELECT s " +
            "FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "JOIN FETCH b.member m " +
            "LEFT JOIN FETCH b.scheduleBoard sdb " +
            "WHERE b.title LIKE %:content% " +
            "AND b.deleteStatus = :status")
    Page<Study> findByStudyBoardListBoardContentContainingAndStatus(
            @Param("content") String content,
            @Param("status") Status status,
            Pageable pageable);

    @Query("SELECT s FROM Study s JOIN FETCH s.studyJoinMemberList sjm WHERE s.studyNo = :studyNo")
    Study findByStudyGroupList(@Param("studyNo") Long studyNo);

    @Query("SELECT s FROM Study s JOIN FETCH s.studyJoinReqList sjq WHERE s.studyNo = :studyNo")
    Study findByStudyGroupReqList(@Param("studyNo") Long studyNo);

    @Query("SELECT s " +
            "FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "JOIN FETCH b.member m " +
            "LEFT JOIN FETCH b.scheduleBoard sdb " +
            "WHERE s.hashTag LIKE %:userHashTag% " +
            "AND b.deleteStatus = :status")
    List<Study> findAllByHashTags(
            @Param("userHashTag") String userHashTag,
            @Param("status") Status status);

    @Query("SELECT s " +
            "FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sdb " +
            "LEFT JOIN FETCH s.quitReviewList q " +  // 'quitReviewList'를 LEFT JOIN으로 가져옵니다.
            "WHERE b.deleteStatus = :status " +  // deleteStatus가 NO인 데이터만 조회
            "AND s.studyNo NOT IN :existingStudyNos " +  // 기존 studyNo와 겹치지 않는 데이터만 조회
            "ORDER BY " +
            "   (CASE WHEN q.starPoint IS NOT NULL THEN q.starPoint ELSE 0 END) DESC, " +  // 탈퇴리뷰 별점 기준 내림차순 정렬
            "   s.studyNo DESC")
    List<Study> findAdditionalStudies(
            @Param("status") Status status,
            @Param("existingStudyNos") List<Long> existingStudyNos,
            Pageable pageable);

    @Query("SELECT s " +
            "FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard sdb " +
            "LEFT JOIN FETCH s.quitReviewList q " +  // 'quitReviewList'를 LEFT JOIN으로 가져옵니다.
            "WHERE b.deleteStatus = :status " +  // deleteStatus가 NO인 데이터만 조회
            "ORDER BY " +
            "   (CASE WHEN q.starPoint IS NOT NULL THEN q.starPoint ELSE 0 END) DESC, " +  // 탈퇴리뷰 별점 기준 내림차순 정렬
            "   s.studyNo DESC")
    List<Study> findAdditionalStudies(
            @Param("status") Status status,
            Pageable pageable);
}
