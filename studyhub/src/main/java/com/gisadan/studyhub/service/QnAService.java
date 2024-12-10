package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.reponse.*;
import com.gisadan.studyhub.dto.request.ReqQnABoardDto;
import com.gisadan.studyhub.dto.request.ReqQnABoardNoDto;
import com.gisadan.studyhub.dto.request.ReqQnABoardNoMemberNoDto;
import com.gisadan.studyhub.entity.*;
import com.gisadan.studyhub.repository.AnswerLikeMemberRepository;
import com.gisadan.studyhub.repository.MemberRepository;
import com.gisadan.studyhub.repository.QnARepository;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.repository.ReplyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QnAService {

    private final QnARepository qnARepository;
    private final MemberRepository memberRepository;
    private final ReplyService replyService;
    private final ReplyRepository replyRepository;
    private final MemberService memberService;
    private final AnswerLikeMemberRepository answerLikeMemberRepository;
    private final BoardService boardService;


    /**
     * 질문 게시물 / 답변 게시물 등록을 위한 메소드
     *
     * @param reqQnABoardDto 게시물 등록을 위한 파라미터
     * @return 등록 성공 여부
     */
    public boolean insertQnABoard(ReqQnABoardDto reqQnABoardDto) {

        QnA parentQnA = null;
        if (reqQnABoardDto.getParentId() != null) {
            parentQnA = qnARepository.findById(reqQnABoardDto.getParentId()).orElse(null);
        }

        String strHashTag = (reqQnABoardDto.getHashTag() != null ? String.join(",", reqQnABoardDto.getHashTag()) : "");

        QnA qnAEntity = QnA.builder()
                .questionNo(reqQnABoardDto.getId())
                .hashTag(strHashTag)
                .point(reqQnABoardDto.getPoint())
                .adoptStatus(Status.NO)
                .parentQnA(parentQnA)
                .build();

        Member memberEntity = memberService.selectMemberNo(reqQnABoardDto.getMemberNo());

        QnABoard qnABoardEntity = QnABoard.builder()
                .board(Board.builder()
                        .content(reqQnABoardDto.getContent())
                        .title(reqQnABoardDto.getTitle())
                        .member(memberEntity)
                        .build()).build();


        qnAEntity.addQnABoardList(qnABoardEntity);

        if (qnARepository.save(qnAEntity) != null) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * 질문 게시물 리스트 조회를 위한 메소드
     *
     * @param boardPage 페이지네이션 조건
     * @return 질문 게시물 목록
     */
    public ResQnADataDto selectQnABoardList(Pageable boardPage) {

        List<QnA> qnAList = qnARepository.findByParentQnAIsNull(boardPage).getContent();

        List<ResQnABoardListDto> result = new ArrayList<>();

        for (QnA qnA : qnAList) {
            List<QnA> relatedQnAs = qnARepository.findByParentNo(qnA);

            ResQnABoardListDto dto = ResQnABoardListDto.of(qnA, relatedQnAs.size());

            result.add(dto);
        }

        int count = qnARepository.findByParentQnAIsNull(boardPage).getTotalPages();

        return ResQnADataDto.of(count, result);
    }

    /**
     * 질문 게시물 상세 조회를 위한 메소드
     *
     * @param id 조회하고자 하는 게시물 번호
     * @return 질문 게시물 상세 내용
     */
    public ResQnABoardByIdDto selectQnABoardById(Long id) {
        QnA qnAEntity = qnARepository.findByQuestionNo(id);

        List<QnA> answerList = qnARepository.findByParentNo(qnAEntity);

        return ResQnABoardByIdDto.of(qnAEntity, answerList);
    }

    /**
     * 답변 게시물 수정을 위한 메소드
     *
     * @param id             수정하려는 답변 id
     * @param reqQnABoardDto 수정하려는 내용을 담을 객체
     * @return 수정 성공 여부
     */
    @Transactional
    public Boolean updateQnA(Long id, ReqQnABoardDto reqQnABoardDto) {
        QnA qna = qnARepository.findById(id).orElseThrow(() -> new NullPointerException("해당 답변이 존재하지 않습니다."));

        if (qna.getQnaBoardList() != null) {
            Board board = qna.getQnaBoardList().getBoard();

            board.setTitle(reqQnABoardDto.getTitle());
            board.setContent(reqQnABoardDto.getContent());

        } else {
            return false;
        }
        return true;
    }

    /**
     * 답글 삭제를 위한 메소드
     *
     * @param id 게시글 ID
     * @return 삭제 여부
     */
    public Boolean deleteQnA(Long id) {
        QnA qna = qnARepository.findByQuestionNo(id);
        qna.getQnaBoardList().getBoard().setDeleteStatus();
        qnARepository.save(qna);
        return true;
    }

    /**
     * 질문 게시판에 맞는 댓글 작성
     *
     * @param id      질문 게시판 번호
     * @param content 댓글 내용
     * @return 작성 여부
     */
    public Boolean insertReplyByQnANo(Long id, String content, Long parentId, Long memberNo) {
        Member memberEntity = memberService.selectMemberNo(memberNo);
        QnA qnAEntity = qnARepository.findByQuestionNo(id);

        Reply replyEntity = null;

        if (parentId > -1) {
            replyEntity = replyService.selectReplyById(parentId);
        }

        return replyService.insertReplyByQnA(qnAEntity, content, replyEntity, memberEntity);
    }

    /**
     * 댓글 목록 조회를 위한 메소드
     *
     * @param id       조회할 질문 게시판 아이디
     * @param pageable 페이지네이션 옵션
     * @return 댓글 목록
     */
    public ResReplyDataDto selectQnABoardCommentList(Long id, Pageable pageable) {
        Board boardEntity = boardService.findBoardByQuestionNo(id);
        List<Reply> replyList = replyService.selectReplyByQnA(boardEntity, pageable);
        Long replyCount = replyService.selectReplyCount(boardEntity);
        return ResReplyDataDto.of(replyCount, replyList.stream().map(ResReplyDto::of).toList());
    }


    /**
     * 베스트 질문 조회를 위한 메소드
     *
     * @return 제목, 답변갯수
     */
    public List<ResBestQnADto> selectBestQnABoardList() {

        Pageable pageable = PageRequest.of(0, 5);
        List<QnA> top5QnA = qnARepository.findTop5ByParentQnAIsNull(pageable);

        List<ResBestQnADto> result = new ArrayList<>();

        // QnA 목록에 대한 반복문
        for (QnA qnA : top5QnA) {
            // parent_no에 해당하는 QnA 리스트를 조회
            List<QnA> relatedQnAs = qnARepository.findByParentNo(qnA);

            // 관련 QnA의 길이(즉, 댓글 수)를 세고 DTO로 변환
            ResBestQnADto dto = ResBestQnADto.of(qnA, relatedQnAs.size());

            // 결과 리스트에 추가
            result.add(dto);
        }

        return result;
    }

    /**
     * 질문 리스트 검색을 위한 메소드
     *
     * @param search   검색어
     * @param pageable 페이지 정보
     * @return 페이지수, 검색된 질문 리스트
     */
    public ResQnADataDto selectQnABoardListSearch(String search, Pageable pageable) {
        List<QnA> qnAList = qnARepository.findByQnABoardListBoardContentContainingAndStatus(search, Status.NO, pageable).getContent();

        List<ResQnABoardListDto> result = new ArrayList<>();

        for (QnA qnA : qnAList) {
            List<QnA> relatedQnAs = qnARepository.findByParentNo(qnA);

            ResQnABoardListDto dto = ResQnABoardListDto.of(qnA, relatedQnAs.size());

            result.add(dto);
        }

        int count = qnARepository.findByQnABoardListBoardContentContainingAndStatus(search, Status.NO, pageable).getTotalPages();

        return ResQnADataDto.of(count, result);
    }


    /**
     * 답변 채택 시 해당 답변 ID와 답변의 ParentID의 답변 여부를 YES로 바꾸는 메소드
     *
     * @param reqQnABoardNoDto 답변의 ID
     * @return 답변 채택 상태 변경 여부
     */
    @Transactional
    public Boolean insertAdopted(ReqQnABoardNoDto reqQnABoardNoDto) {
        QnA qnAEntity = qnARepository.findById(reqQnABoardNoDto.getId()).orElseThrow(() -> new RuntimeException("해당 질문이 존재하지 않습니다."));

        QnA parentQnA = qnARepository.findParentNoByQuestionNo(reqQnABoardNoDto.getId());

        QnA parentQnAEntity = qnARepository.findById(parentQnA.getParentQnA().getQuestionNo()).orElse(null);

        parentQnAEntity.setAdoptStatus(Status.YES);
        qnAEntity.setAdoptStatus(Status.YES);

        return true;
    }

    /**
     * 게시물의 조회수를 증가시키는 메소드
     *
     * @param reqQnABoardNoMemberNoDto 게시물의 ID, 멤버의 ID
     * @return 조회수 증가 성공여부
     */
    @Transactional
    public Boolean incrementViewCount(ReqQnABoardNoMemberNoDto reqQnABoardNoMemberNoDto) {
        QnA qnAEntity = qnARepository.findById(reqQnABoardNoMemberNoDto.getBoardNo()).orElse(null);

        Long boardOwnerMemberNo = qnAEntity.getQnaBoardList().getBoard().getMember().getMemberNo() == null ? 0 : qnAEntity.getQnaBoardList().getBoard().getMember().getMemberNo();

        Long currMemberNo = reqQnABoardNoMemberNoDto.getMemberNo();

        if (!boardOwnerMemberNo.equals(currMemberNo)) {
            if (qnAEntity.getQnaBoardList() != null) {
                Board board = qnAEntity.getQnaBoardList().getBoard();

                board.setViewCount(board.getViewCount() + 1);
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    /**
     * 좋아요 추가를 위한 메소드
     * @param reqQnABoardNoMemberNoDto memberId, boardId
     * @return 좋아요 추가 성공 여부
     */
    public Boolean incrementLike (ReqQnABoardNoMemberNoDto reqQnABoardNoMemberNoDto) {
        QnA qnAEntity = qnARepository.findById(reqQnABoardNoMemberNoDto.getBoardNo()).orElse(null);

        Member memberEntity = memberRepository.findById(reqQnABoardNoMemberNoDto.getMemberNo()).orElse(null);

        AnswerLikeMember answerLikeMember = AnswerLikeMember.builder()
                .member(memberEntity)
                .qna(qnAEntity)
                .build();

        answerLikeMemberRepository.save(answerLikeMember);

        return true;
    }

    /**
     * 좋아요 삭제를 위한 메소드
     * @param reqQnABoardNoMemberNoDto memberId, boardId
     * @return 좋아요 삭제 여부
     */
    public Boolean decrementLike (ReqQnABoardNoMemberNoDto reqQnABoardNoMemberNoDto) {
        QnA qnAEntity = qnARepository.findById(reqQnABoardNoMemberNoDto.getBoardNo()).orElse(null);

        Member memberEntity = memberRepository.findById(reqQnABoardNoMemberNoDto.getMemberNo()).orElse(null);

        AnswerLikeMember answerLikeMember = answerLikeMemberRepository.findByMemberAndQna(memberEntity, qnAEntity);

        answerLikeMemberRepository.delete(answerLikeMember);
        System.out.println("삭제된 likeNo: " + answerLikeMember.getLikeNo());
        return true;

    }

}
