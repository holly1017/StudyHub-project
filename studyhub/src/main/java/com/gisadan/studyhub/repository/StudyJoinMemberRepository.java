package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.StudyJoinMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyJoinMemberRepository extends JpaRepository<StudyJoinMember,Long> {
    void deleteByMemberAndStudy(Member member, Study study);

    StudyJoinMember findByMemberAndStudy(Member member, Study study);
}
