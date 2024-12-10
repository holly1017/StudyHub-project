package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.reponse.ResCalendarDto;
import com.gisadan.studyhub.dto.reponse.ResCalendarListDto;
import com.gisadan.studyhub.dto.reponse.ResReplyDataDto;
import com.gisadan.studyhub.dto.reponse.ResReplyDto;
import com.gisadan.studyhub.dto.request.ReqScheduleDto;
import com.gisadan.studyhub.entity.*;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.repository.ScheduleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final StudyService studyService;
    private final ReplyService replyService;
    private final MemberService memberService;

    /**
     * 스케쥴 보드에 데이터 삽입을 위한 메소드
     * @param reqScheduleDto reqScheduleDto 스케쥴 보드에 필요한 데이터 DTO 객체
     * @param id 스터디 게시판 번호
     * @return 성공여부
     */
    public Boolean insertScheduleBoard(ReqScheduleDto reqScheduleDto, Long id, Long memberNo) throws ParseException {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        Study studyEntity = studyService.selectStudybyId(id);
        Board boardEntity = Board.builder().content(reqScheduleDto.getContent()).title(reqScheduleDto.getTitle()).member(memberEntity).build();
        ScheduleBoard scheduleBoardEntity = ScheduleBoard.builder().board(boardEntity).build();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilStartDate = dateFormat.parse(reqScheduleDto.getStDate());
        java.util.Date utilEndDate = dateFormat.parse(reqScheduleDto.getEdDate());
        Schedule scheduleEntity = Schedule.builder().study(studyEntity).startDate(new java.sql.Date(utilStartDate.getTime())).endDate(new java.sql.Date(utilEndDate.getTime())).startTime(reqScheduleDto.getStTime()).endTime(reqScheduleDto.getEdTime()).build();
        scheduleEntity.addStudyBoardList(scheduleBoardEntity);

        if(scheduleRepository.save(scheduleEntity) != null) {
            return  true;
        } else {
            return false;
        }
    }

    /**
     * 스터디 게시판에 맞는 스케쥴 리스트를 조회하기 위한 메소드
     * @param id 스터디 게시판 아이디
     * @return 화면에 출력할 리스트 타입의 DTO객체
     */
    public List<ResCalendarListDto> selectScheduleBoardList(Long id) {
        Study studyEntity = studyService.selectStudybyId(id);
        return scheduleRepository.findAllByBoardStatusAndStudyNo(studyEntity, Status.NO).stream().map(ResCalendarListDto::of).toList();
    }

    /**
     * 스터디 게시판과 스케쥴 게시물에 맞는 상세 내용 조회를 위한 메소드
     * @param studyId 조회에 필요한 스터디 게시판 번호
     * @param calendarId 조회에 필요한 스케쥴 게시판 번호
     * @return 화면에 출력할 DTO객체
     */
    public ResCalendarDto selectScheduleBoardById(Long studyId, Long calendarId) {
        Study studyEntity = studyService.selectStudybyId(studyId);
        List<Schedule> scheduleList = scheduleRepository.findAllByStudy(studyEntity);
        Schedule scheduleData = scheduleList.stream().filter(schedule -> schedule.getScheduleNo().equals(calendarId)).findFirst().orElse(null);
        List<Reply> replyList = replyService.selectReplyBySchedule(scheduleData, PageRequest.of(0, 10, Sort.by(Sort.Order.asc("replyNo"))));
        Long replyCount = replyService.selectReplyCount(scheduleData.getScheduleBoard().getBoard());
        return ResCalendarDto.of(scheduleData, replyCount ,replyList);
    }

    /**
     * 스케쥴 게시물 삭제를 위한 메소드
     * @param studyId 삭제할 스케쥴 게시물을 가르키는 스터디 게시물의 번호
     * @param calendarId 스케쥴 게시물의 번호
     * @return 삭제유무
     */
    @Transactional
    public Boolean selectScheduleBoardDeleteById(Long studyId, Long calendarId) {
        Study studyEntity = studyService.selectStudybyId(studyId);
        Schedule scheduleData = scheduleRepository.findAllByStudy(studyEntity).stream().filter(schedule -> schedule.getScheduleNo().equals(calendarId)).findFirst().orElse(null);
        scheduleData.getScheduleBoard().getBoard().setDeleteStatus();
        return true;
    }

    /**
     * 스케쥴 게시물에 댓글을 작성하기 위한 메소드
     * @param studyId 어떤 스터디 게시물의 스케쥴인지 알기 위한 스터디 게시물의 번호
     * @param calendarId 스케쥴 게시물 번호
     * @param parentId 대댓글시 부모 댓글의 번호
     * @param replyContent 댓글 내용
     * @return 댓글 작성 유무
     */
    public Boolean insertScheduleBoardReplyById(Long studyId, Long calendarId, Long parentId, String replyContent, Long memberNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        Study studyEntity = studyService.selectStudybyId(studyId);
        Schedule scheduleEntity = scheduleRepository.findAllByBoardStatusAndStudyNo(studyEntity, Status.NO).stream().filter(schedule -> schedule.getScheduleNo().equals(calendarId)).findFirst().orElse(null);

        Reply replyEntity = null;

        if(parentId > -1) {
            replyEntity = replyService.selectReplyById(parentId);
        }

        return replyService.insertReplyBySchedule(scheduleEntity, replyContent, replyEntity, memberEntity);
    }

    /**
     * 댓글 목록 조회를 위한 메소드
     * @param studyId 스케쥴 게시물과 연결된 스터디 게시물의 번호
     * @param calendarId 스케쥴 게시물의 번호
     * @param pageable 페이지네이션 옵션
     * @return 화면에 출력할 DTO객체
     */
    public ResReplyDataDto selectStudyBoardCommentList(Long studyId, Long calendarId ,Pageable pageable) {
        Study studyEntity = studyService.selectStudybyId(studyId);
        Schedule scheduleEntity = scheduleRepository.findAllByBoardStatusAndStudyNo(studyEntity, Status.NO).stream().filter(schedule -> schedule.getScheduleNo().equals(calendarId)).findFirst().orElse(null);
        Long replyCount = replyService.selectReplyCount(scheduleEntity.getScheduleBoard().getBoard());
        return ResReplyDataDto.of(replyCount, replyService.selectReplyBySchedule(scheduleEntity, pageable).stream().map(ResReplyDto::of).toList());
    }
}
