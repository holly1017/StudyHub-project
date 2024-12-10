package com.gisadan.studyhub.repository;

import com.gisadan.studyhub.entity.AnswerLikeMember;
import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.QnA;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerLikeMemberRepository extends JpaRepository<AnswerLikeMember,Long> {

    AnswerLikeMember findByMemberAndQna(Member member, QnA qna);
}
