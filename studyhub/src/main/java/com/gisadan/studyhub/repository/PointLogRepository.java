package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.PointLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PointLogRepository extends JpaRepository<PointLog,Long> {

    @Query("SELECT p FROM PointLog p JOIN FETCH p.usePointLog upl " +
            "WHERE p.member.memberNo = :memberNo " +
            "ORDER BY p.historyNo DESC")
    Page<PointLog> findAllByMemberNo(Long memberNo, Pageable pageable);
}
