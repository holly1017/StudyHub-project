package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Schedule;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.etc.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    @Query("SELECT s FROM Schedule  s " +
            "JOIN FETCH s.scheduleBoard sb " +
            "JOIN FETCH sb.board b " +
            "LEFT JOIN FETCH b.member m " +
            "LEFT JOIN FETCH b.studyBoard stb " +
            "LEFT JOIN FETCH stb.study " +
            "WHERE s.study = :study"
    )
    List<Schedule> findAllByStudy(Study study);

    @Query("SELECT s FROM Schedule s " +
            "LEFT JOIN FETCH s.scheduleBoard sb " +
            "JOIN FETCH sb.board b " +
            "JOIN FETCH b.member m " +
            "LEFT JOIN FETCH b.studyBoard stb " +
            "LEFT JOIN FETCH stb.study st " +
            "WHERE b.deleteStatus = :status " +
            "AND s.study = :study")
    List<Schedule> findAllByBoardStatusAndStudyNo(Study study, Status status);
}
