package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.Study;
import com.gisadan.studyhub.entity.StudyJoinReq;
import com.gisadan.studyhub.repository.StudyJoinReqRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyJoinReqService {
    private final StudyJoinReqRepository studyJoinReqRepository;
    private final StudyJoinMemberService studyJoinMemberService;

    /**
     * 스터디 그룹에 참여하기 위한 참여 요청
     * @param member 참여하고자 하는 회원
     * @param study 참여하고자 하는 스터디 그룹
     * @return 성공 여부
     */
    public Boolean insertStudyJoinReq(Member member, Study study) {
        StudyJoinReq studyJoinReqEntity = StudyJoinReq.builder().member(member).study(study).build();
        if(studyJoinReqRepository.save(studyJoinReqEntity) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 스터디 그룹에 참여 요청 여부를 확인하는 메소드
     * @param member 참여 요청을한 회원
     * @param study 참여 요청한 스터디 그룹
     * @return 참여 요청 여부
     */
    public Boolean isExistStudyJoinReq(Member member, Study study) {
        return studyJoinReqRepository.existsByMemberAndStudy(member, study);
    }

    /**
     * 스터디 그룹에 참여 요청한 회원 수락을 위한 메서드
     * @param member 수락을 위한 그룹 참여에 요청한 회원
     * @param study 회원이 참여 요청한 스터디 그룹
     * @return 결과 여부
     */
    @Transactional
    public Boolean acceptStudyJoinReq(Member member, Study study) {
        if(study.getCurHeadCount() >= study.getMaxHeadCount()) return false;

        StudyJoinReq studyJoinReqEntity = studyJoinReqRepository.findByMemberAndStudy(member, study);
        if(studyJoinMemberService.insertStudyJoinMember(studyJoinReqEntity.getMember(), studyJoinReqEntity.getStudy())) {
            studyJoinReqRepository.deleteByMemberAndStudy(member, study);
            study.incrementHeadCount();
            return true;
        } else {
            return false;
        }
    }

    /**
     * 스터디 그룹에 참여 요청한 회원 거절을 위한 메서드
     * @param member 거절을 위한 그룹 참여에 요청한 회원
     * @param study 회원이 참여 요청한 스터디 그룹
     * @return 결과 여부
     */
    public Boolean refuseStudyJoinReq(Member member, Study study) {
        studyJoinReqRepository.deleteByMemberAndStudy(member, study);
        return true;
    }
}
