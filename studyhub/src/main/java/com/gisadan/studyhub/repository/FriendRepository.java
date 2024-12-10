package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Friend;
import com.gisadan.studyhub.entity.etc.FriendStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend,Long> {
    @Query("SELECT f FROM Friend f WHERE f.friend = :memberNo AND f.status = :status")
    List<Friend> findByMemberNoAndStatus(Long memberNo, FriendStatus status);

    @Query("SELECT f " +
            "FROM Friend f JOIN FETCH f.member " +
            "WHERE (f.friend = :memberNo OR f.member.memberNo = :memberNo) " +
            "AND f.status = :status")
    List<Friend> findByFriendNoOrMemberNoAndStatus(Long memberNo, FriendStatus status);

    @Query("SELECT f FROM Friend f WHERE (f.friend = :memberNo AND f.member.memberNo = :friendNo) OR (f.friend = :friendNo AND f.member.memberNo = :memberNo)")
    Friend findByFriendNoAndMemberNo(Long memberNo, Long friendNo);

//    @Query("SELECT COUNT(f) > 0 " +
//            "FROM Friend f " +
//            "WHERE (f.friend = :memberNo AND f.member.memberNo = :friendNo) " +
//            "OR (f.friend = :friendNo AND f.member.memberNo = :memberNo) " +
//            "AND f.status = :status")
//    boolean existsByMemberNoAndFriendAndStatus(Long memberNo, Long friendNo, FriendStatus status);
}
