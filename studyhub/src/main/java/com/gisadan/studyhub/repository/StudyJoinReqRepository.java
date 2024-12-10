package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.StudyJoinReq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyJoinReqRepository extends JpaRepository<StudyJoinReq,Long> {
    boolean existsByMemberAndStudy(Member member, Study study);

    StudyJoinReq findByMemberAndStudy(Member member, Study study);

    void deleteByMemberAndStudy(Member member, Study study);
}
