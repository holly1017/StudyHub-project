package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.reponse.*;
import com.gisadan.studyhub.dto.request.ReqQuitReviewDto;
import com.gisadan.studyhub.dto.request.ReqStudyBoardDto;
import com.gisadan.studyhub.entity.*;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.entity.etc.StudyGroupAuth;
import com.gisadan.studyhub.etc.ImageLogic;
import com.gisadan.studyhub.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final QuitReviewService quitReviewService;
    private final ReplyService replyService;
    private final MemberService memberService;
    private final StudyJoinReqService studyJoinReqService;
    private final StudyJoinMemberService studyJoinMemberService;
    private final BoardService boardService;

    /**
     * 해시태그위 값을 ','기준으로 한개이 문자열로 만든후에 Study/StudyBoard/Board/Image 테이블에 insert 쿼리문을 수행하기 위한 메소드
     * @param reqStudyBoardDto reqStudyBoardDto Type (제목, 내용, 그룹명, 해시태그, 최대인원수)
     * @return 성공/실패
     */
    public boolean insertStudyBoard(ReqStudyBoardDto reqStudyBoardDto, MultipartFile file) {
        String fileName = "";
        if(file != null && !file.isEmpty()) {
            fileName = ImageLogic.saveFile(file);
        }

        String strHashTag = String.join(",", reqStudyBoardDto.getHashTag());

        Study studyEntity = Study.builder().hashTag(strHashTag).groupName(reqStudyBoardDto.getGroupName()).maxHeadCount(reqStudyBoardDto.getMaxHeadCount()).build();
        Member memberEntity = memberService.selectMemberNo(reqStudyBoardDto.getMemberNo());
        Board boardEntity = Board.builder().content(reqStudyBoardDto.getContent()).title(reqStudyBoardDto.getTitle()).member(memberEntity).build();
        boardEntity.addimageList(Image.builder().imgName(file != null ? file.getOriginalFilename() : "").imgPath(fileName.isEmpty() ? "" : "http://localhost:8080/uploads/" + fileName).build());
        StudyBoard studyBoardEntity = StudyBoard.builder().board(boardEntity).build();
        studyEntity.addStudyBoardList(studyBoardEntity);
        studyEntity.addStudyJoinMemberList(StudyJoinMember.builder().member(memberEntity).studyGroupAuth(StudyGroupAuth.MANAGER).build());

        if(studyRepository.save(studyEntity) != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Study/StudyBoard/Board/Image테이블의 데이터를 Pagenation형식으로 조회하는 구문
     * @param boardPage Pageable객체로 size/page/sort 정보가 필요하다.
     * @return 화면에 보여줘야할 데이터를 List DTO객체 형태로 변환
     */
    public List<ResStudyBoardListDto> selectStudyBoardList(Pageable boardPage) {
        return studyRepository.findAllByBoardDeleteStatusAndStudyNo(Status.NO,boardPage).stream().map(ResStudyBoardListDto::of).toList();
    }

    /**
     * 스터디 게시판 번호를 파라미터로 받아 해당 번호에 맞는 데이터를 조회하는 메서드
     * @param id 조회할 스터디 게시판 번호
     * @return ResStudyBoardByIdDto 상세조회 페이지 화면에 표시해야할 모든 데이터
     */
    public ResStudyBoardByIdDto selectStudyBoardById(Long id) {
        Study studyEntity = studyRepository.findByStudyNo(id);
        List<Reply> replyList = replyService.selectReplyByStudy(studyEntity.getStudyBoard().getBoard(), PageRequest.of(0, 10, Sort.by(Sort.Order.asc("replyNo"))));
        Long replyCount = replyService.selectReplyCount(studyEntity.getStudyBoard().getBoard());

        return ResStudyBoardByIdDto.of(studyEntity
                                        ,replyList
                                        ,replyCount);
    }

    /**
     * 스터디 게시판에 맞는 댓글 작성
     * @param id 스터디 게시판 번호
     * @param content 댓글 내용
     * @return 작성 여부
     */
    public Boolean insertReplyByStudyNo(Long id, String content, Long parentId, Long memberNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        Study studyEntity = studyRepository.findByStudyNo(id);

        Reply replyEntity = null;

        if(parentId > -1) {
            replyEntity = replyService.selectReplyById(parentId);
        }

        return replyService.insertReplyByStudy(studyEntity, content, replyEntity, memberEntity);
    }

    /**
     *  스터디 게시판에 게시물을 수정하기 위한 메소드
     * @param id 수정할 스터디 게시판의 게시물 번호
     * @param reqStudyBoardDto 게시판의 수정할 내용들
     * @return 수정 여부
     */
    @Transactional
    public Boolean updateStudyBoard(Long id, ReqStudyBoardDto reqStudyBoardDto, MultipartFile file) {
        String fileName = "";
        if(file != null && !file.isEmpty()) {
            fileName = ImageLogic.saveFile(file);
        }

        String strHashTag = String.join(",", reqStudyBoardDto.getHashTag());

        Study study = studyRepository.findByStudyNo(id);

        study.setHashTag(reqStudyBoardDto.getHashTag());
        study.setGroupName(reqStudyBoardDto.getGroupName());
        study.setMaxHeadCount(reqStudyBoardDto.getMaxHeadCount());
        study.getStudyBoard().getBoard().setTitle(reqStudyBoardDto.getTitle());
        study.getStudyBoard().getBoard().setContent(reqStudyBoardDto.getContent());

        String imgName = file != null ? file.getOriginalFilename() : "";
        study.getStudyBoard().getBoard().getImageList().stream().map(image -> {image.setImgName(imgName); return image;}).toList();
        String imgPath = fileName.isEmpty() ? "" : "http://localhost:8080/uploads/" + fileName;
        study.getStudyBoard().getBoard().getImageList().stream().map(image -> {image.setImgPath(imgPath); return image;}).toList();

        return true;
    }

    /**
     * 스터디 게시판 삭제를 위한 메서드
     * @param id 삭제할 스터디 게시판 아이디
     * @return 삭제유무
     */
    @Transactional
    public Boolean deleteStudyBoard(Long id) {
        Study study = studyRepository.findByStudyNo(id);
        study.getStudyBoard().getBoard().setDeleteStatus();
        return true;
    }

    /**
     * 댓글 목록 조회를 위한 메소드
     * @param id 조회할 스터디 게시판의 아이디
     * @param pageable 페이지네이션 옵션
     * @return 댓글 목록
     */
    public ResReplyDataDto selectStudyBoardCommentList(Long id, Pageable pageable) {
        Board boardEntity = boardService.findBoardByStudyNo(id);
        Long replyCount = replyService.selectReplyCount(boardEntity);
        List<Reply> replyList = replyService.selectReplyByStudy(boardEntity, pageable);
        return ResReplyDataDto.of(replyCount, replyList.stream().map(ResReplyDto::of).toList());
    }

    /**
     * 탈퇴리뷰 삽입을 위한 메소드
     * @param id 탈퇴리뷰 삽입하기 위한 스터디 아이디 번호
     * @param reqQuitReviewDto 별점과 내용이 담겨있는 DTO
     * @return 삽입 여부
     */
    public Boolean insertQuitReview(Long id, ReqQuitReviewDto reqQuitReviewDto) {
        Study studyEntity = studyRepository.findById(id).orElseThrow(() -> new NullPointerException("Null Point 발생!!"));
        return quitReviewService.insertQuitReview(studyEntity, reqQuitReviewDto);
    }

    /**
     * 스터디 게시판 검색 기능을 위한 메소드
     * @param search 검색할 키워드
     * @param pageable 페이지 네이션을 위한 조건
     * @return 화면에 출력할 DTO객체
     */
    public List<ResStudyBoardListDto> selectStudyBoardListBySearch(String search, Pageable pageable) {
        return studyRepository.findByStudyBoardListBoardContentContainingAndStatus(search, Status.NO, pageable).stream().map(ResStudyBoardListDto::of).toList();
    }

    /**
     * 스터디 게시판 번호로 스터디 객체 조회
     * @param id 스터디 게시판 번호
     * @return 스터디 객체
     */
    public Study selectStudybyId(Long id) {
        return studyRepository.findByStudyNo(id);
    }

    /**
     * 스터디 그룹에 참여하기 위한 참여 요청
     * @param memberNo 스터디 그룹에 참여하고자 하는 회원번호
     * @param studyNo 스터디 그룹에 참여하고자 하는 스터디 번호
     * @return 성공여부
     */
    public Boolean insertStudyJoinReq(Long memberNo, Long studyNo) {
        return studyJoinReqService.insertStudyJoinReq(memberService.selectMemberNo(memberNo), selectStudybyId(studyNo));
    }

    /**
     * 스터디 그룹에 참여 요청 여부를 확인하기 위한 메소드
     * @param memberNo 스터디 그룹에 참여 요청한 회원 번호
     * @param studyNo 스터디 그룹에 참여 요청한 스터디 번호
     * @return 참여 여부
     */
    public Boolean isExistStudyJoinReq(Long memberNo, Long studyNo) {
        return studyJoinReqService.isExistStudyJoinReq(memberService.selectMemberNo(memberNo), selectStudybyId(studyNo));
    }

    /**
     * 스터디 그룹에 참여 요청한 회원 수락을 위한 메서드
     * @param memberNo 수락을 위한 그룹 참여에 요청한 회원의 번호
     * @param studyNo 회원이 참여 요청한 스터디 그룹의 번호
     * @return 결과 여부
     */
    public Boolean acceptStudyJoinReq(Long memberNo, Long studyNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        Study studyEntity = selectStudybyId(studyNo);
        return studyJoinReqService.acceptStudyJoinReq(memberEntity, studyEntity);
    }

    /**
     * 스터디 그룹에 참여 요청한 회원 거절을 위한 메서드
     * @param memberNo 거절을 위한 그룹 참여에 요청한 회원의 번호
     * @param studyNo 회원이 참여 요청한 스터디 그룹의 번호
     * @return 결과 여부
     */
    @Transactional
    public Boolean refuseStudyJoinReq(Long memberNo, Long studyNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        Study studyEntity = selectStudybyId(studyNo);
        return studyJoinReqService.refuseStudyJoinReq(memberEntity, studyEntity);
    }

    /**
     * 스터디 그룹 회원 강퇴를 위한 메서드
     * @param memberNo 강퇴할 회원의 번호
     * @param studyNo 강퇴할 회원이 가입되어있는 스터디 그룹의 번호
     * @return 성고 여부
     */
    @Transactional
    public Boolean kickStudyJoinReq(Long memberNo, Long studyNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        Study studyEntity = selectStudybyId(studyNo);

        studyJoinMemberService.deleteStudyJoinMember(memberEntity, studyEntity);
        studyEntity.decrementHeadCount();
        return true;
    }

    /**
     * 스터디 그룹 방장 위임을 위한 메서드
     * @param memberNo 방장의 회원 번호
     * @param delegateMemberNo 방장을 위임할 회원 번호
     * @param studyNo 스터디 그룹 번호
     * @return 성고 여부
     */
    @Transactional
    public Boolean delegateStudyJoinReq(Long memberNo, Long delegateMemberNo, Long studyNo) {
        Study studyEntity = selectStudybyId(studyNo);
        Member memberManager = memberService.selectMemberNo(memberNo);
        Member memberDelegate = memberService.selectMemberNo(delegateMemberNo);

        studyJoinMemberService.updateGroupAuthByMemberAndStudy(memberManager, studyEntity, StudyGroupAuth.NORMAL);
        studyJoinMemberService.updateGroupAuthByMemberAndStudy(memberDelegate, studyEntity, StudyGroupAuth.MANAGER);
        return true;
    }

    /**
     * 스터디 그룹 참여자 리스트 조회를 위한 메소드
     * @param studyNo 스터디 그룹 참여자 조회를 하고자하는 스터디 그룹의 번호
     * @return 스터디 그룹 참여자 목록
     */
    public List<ResStudyGroupListDto> selectStudyGroupList(Long studyNo) {
        return studyRepository.findByStudyGroupList(studyNo).getStudyJoinMemberList().stream().map(ResStudyGroupListDto::of).toList();
    }

    /**
     * 스터디 그룹 참여자 요청 리스트 조회를 위한 메소드
     * @param studyNo 스터디 그룹 참여자 요청 조회를 하고자하는 스터디 그룹의 번호
     * @return 스터디 그룹 요청 목록
     */
    public List<ResStudyGroupReqDto> selectStudyGroupReqList(Long studyNo) {
        return studyRepository.findByStudyGroupReqList(studyNo).getStudyJoinReqList().stream().map(ResStudyGroupReqDto::of).toList();
    }

    /**
     * 사용자의 해시태그와 일치하는 스터디 조회 후 탈퇴리뷰, 최신 순으로 조회
     * @param hashTag
     * @return 스터디 리스트 정보
     */
    public List<ResStudyBoardListDto> selectStudyGroupByHashTag(String hashTag) {
        String[] userHashTagArr = hashTag.split(",");

        List<Study> studyEntityList = new ArrayList<>();

        for (String userHashTag : userHashTagArr) {
            List<Study> groupHashTagArr = studyRepository.findAllByHashTags(userHashTag, Status.NO);

            for (Study study : groupHashTagArr) {
                if (!studyEntityList.contains(study)) { // 중복 확인
                    studyEntityList.add(study);
                }

                if (studyEntityList.size() >= 4) break;
            }

            if (studyEntityList.size() >= 4) break;
        }

        int missingCount = 4 - studyEntityList.size();

        if (studyEntityList.size() >= 0 && missingCount > 0) {

            Pageable pageable = PageRequest.of(0, missingCount);

            List<Long> emptyData = new ArrayList<>();

            emptyData.add(0L);

            List<Study> additionalStudies = studyRepository.findAdditionalStudies(
                    Status.NO, studyEntityList.size() == 0 ? emptyData : studyEntityList.stream().map(Study::getStudyNo).toList(), pageable);
            studyEntityList.addAll(additionalStudies);
        }

        return studyEntityList.stream().map(ResStudyBoardListDto::of).toList();
    }

    /**
     * 비로그인시 추천 스터디 그룹 조회, 탈퇴리뷰순 -> 최신순
     * @return 스터디 리스트 정보
     */
    public List<ResStudyBoardListDto> selectStudyGroupTop4() {

            List<Study> studyEntityList = new ArrayList<>();

            Pageable pageable = PageRequest.of(0, 4);

            List<Study> additionalStudies = studyRepository.findAdditionalStudies(
                    Status.NO, pageable);
            studyEntityList.addAll(additionalStudies);

        return studyEntityList.stream().map(ResStudyBoardListDto::of).toList();
    }
}
