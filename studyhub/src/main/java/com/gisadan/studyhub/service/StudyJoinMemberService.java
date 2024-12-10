package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.StudyJoinMember;
import com.gisadan.studyhub.entity.etc.StudyGroupAuth;
import com.gisadan.studyhub.repository.StudyJoinMemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyJoinMemberService {
    private final StudyJoinMemberRepository studyJoinMemberRepository;

    /**
     * 스터디 그룹 참여 테이블에 데이터 삽입을 위한 메서드
     * @param member 참여한 스터디 그룹의 회원
     * @param study 회원이 참여한 스터드 그룹
     * @return 성공여부
     */
    public Boolean insertStudyJoinMember(Member member, Study study) {
        StudyJoinMember studyJoinMemberEntity = StudyJoinMember.builder().member(member).study(study).studyGroupAuth(StudyGroupAuth.NORMAL).build();

        if(studyJoinMemberRepository.save(studyJoinMemberEntity) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 스터디 그룹 참여 테이블에 데이터를 삭제하기 위한 메서드
     * @param member 참여한 스터디 그룹의 회원
     * @param study 회원이 참여한 스터드 그룹
     * @return 성공여부
     */
    public Boolean deleteStudyJoinMember(Member member, Study study) {
        studyJoinMemberRepository.deleteByMemberAndStudy(member, study);
        return true;
    }

    /**
     * 스터디 그룹의 권한을 수정하기 위한 메서드
     * @param member 권한을 수정할 회원 정보
     * @param study 권한을 수정할
     * @param studyGroupAuth 수정할 권한
     * @return 성공 여부
     */
    public Boolean updateGroupAuthByMemberAndStudy(Member member, Study study, StudyGroupAuth studyGroupAuth) {
        StudyJoinMember studyJoinMemberEntity = studyJoinMemberRepository.findByMemberAndStudy(member, study);
        studyJoinMemberEntity.changeStudyGroupAuth(studyGroupAuth);
        return true;
    }
}
