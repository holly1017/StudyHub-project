package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Friend;
import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.QnA;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.etc.FriendStatus;
import com.gisadan.studyhub.entity.etc.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    boolean existsByMemberId(String id);
    boolean existsByNickName(String nickName);
    Member findByMemberId(String id);
    Member findByMemberNo(Long memberNo);
    List<Member> findByEmailAndStatus(String email, Status status);
    Member findByMemberIdAndStatus(String id, Status status);

    @Query("SELECT s FROM Study s " +
            "JOIN FETCH s.studyBoard sb " +
            "JOIN FETCH sb.board b " +
            "JOIN FETCH s.studyJoinMemberList sjm " +
            "JOIN FETCH b.member m " +
            "LEFT JOIN FETCH b.scheduleBoard " +
            "JOIN FETCH b.imageList " +
            "WHERE b.deleteStatus = :deleteStatus " +
            "AND sjm.member.memberNo = :memberNo")
    List<Study> findStudyByBoardDeleteStatusAndMemberNo(Status deleteStatus,
                                                      @Param("memberNo") Long memberNo,
                                                      Pageable pageable);

    @Query("SELECT q FROM QnA q " +
             "JOIN FETCH q.qnaBoardList qb " +
             "JOIN FETCH qb.board b " +
             "JOIN b.member m " +
             "LEFT JOIN FETCH b.scheduleBoard " +
             "LEFT JOIN FETCH b.studyBoard " +
             "WHERE b.deleteStatus = :deleteStatus " +
             "AND b.member.memberNo = :memberNo " +
            "AND q.parentQnA IS NULL ORDER BY b.regDate DESC"
    )
    Page<QnA> findQnAByMemberIdAndStatus(Status deleteStatus, Long memberNo, Pageable boardPage);

    @Query("SELECT q FROM QnA q " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "JOIN b.member m " +
            "LEFT JOIN FETCH b.scheduleBoard sb " +
            "LEFT JOIN FETCH b.studyBoard sbd " +
            "WHERE q.questionNo IN (" +
            "   SELECT q2.parentQnA.questionNo " +
            "   FROM QnA q2 " +
            "   JOIN q2.qnaBoardList qb2 " +
            "   JOIN qb2.board b2 " +
            "   WHERE b2.deleteStatus = :deleteStatus " +
            "   AND b2.member.memberNo = :memberNo " +
            "   AND q2.parentQnA IS NOT NULL)")
    Page<QnA> findQnAByMemberIdAndStatusAndParentsId(Status deleteStatus, Long memberNo, Pageable boardPage);

//    @Query("SELECT m " +
//            "FROM Member m LEFT JOIN m.friendList fl " +
//            "WHERE m.nickName LIKE %:nickNameKeyword% AND m.status = :status")
//    List<Member> findByNickNameContaining(Status status, String nickNameKeyword);
//
    @Query("SELECT m " +
            "FROM Member m LEFT JOIN FETCH m.friendList " +
            "WHERE m.nickName LIKE %:nickNameKeyword% AND m.status = :status")
    List<Member> findByNickNameContaining(Status status, String nickNameKeyword);

    @Query("SELECT f FROM Friend f JOIN FETCH f.member WHERE (f.member.memberNo = :memberNo OR f.friend = :memberNo) AND f.status IN :statuses")
    List<Friend> findFriendsByMemberNoAndStatuses(@Param("memberNo") Long memberNo, @Param("statuses") List<FriendStatus> statuses);

    @Query("SELECT q " +
            "FROM QnA q " +
            "JOIN q.answerLikeMemberList a " +
            "JOIN FETCH q.qnaBoardList qb " +
            "JOIN FETCH qb.board b " +
            "LEFT JOIN FETCH b.scheduleBoard " +
            "LEFT JOIN FETCH b.studyBoard " +
            "WHERE b.deleteStatus = :deleteStatus " +
            "AND q.parentQnA IS NULL " +
            "AND a.member.memberNo = :memberNo")
    Page<QnA> findLikeQnAByMemberIdAndStatus(Status deleteStatus, Long memberNo, Pageable pageable);

}
