package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.*;
import com.gisadan.studyhub.dto.request.ReqCommentDto;
import com.gisadan.studyhub.dto.request.ReqQuitReviewDto;
import com.gisadan.studyhub.dto.request.ReqStudyBoardDto;
import com.gisadan.studyhub.dto.request.ReqStudyJoinReqDto;
import com.gisadan.studyhub.service.ReplyService;
import com.gisadan.studyhub.service.StudyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;
    private final ReplyService replyService;

    @Operation(summary = "스터디 게시판 작성 요청", description = "스터디 게시판 그룹 개설 및 작성을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/write")
    public ResponseEntity<ResStudyBoardDto> insertStudyBoard(@RequestPart("study") ReqStudyBoardDto reqStudyBoardDto, @RequestPart( value = "file", required = false)MultipartFile file) throws IOException {
        ResStudyBoardDto resStudyBoardDto = studyService.insertStudyBoard(reqStudyBoardDto, file) ? new ResStudyBoardDto("성공입니다.") :  new ResStudyBoardDto("실패입니다.");
        return new ResponseEntity<>(resStudyBoardDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 리스트 요청", description = "스터디 게시판 리스트를 보기 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list")
    public ResponseEntity<List<ResStudyBoardListDto>> selectStudyBoardList(Pageable boardPage) {
        List<ResStudyBoardListDto> response = studyService.selectStudyBoardList(boardPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 상세보기 페이지", description = "스터디 게시판 상세보기 기능을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardByIdDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/view")
    public ResponseEntity<ResStudyBoardByIdDto> selectStudyBoardById(@RequestParam Long id) {
        ResStudyBoardByIdDto response = studyService.selectStudyBoardById(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 게시물 수정", description = "스터디 게시판 게시물 수정 기능을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/list/update")
    public ResponseEntity<Boolean> updateStudyBoard(@RequestParam Long id, @RequestPart("study") ReqStudyBoardDto reqStudyBoardDto, @RequestPart( value = "file", required = false)MultipartFile file) {
        return new ResponseEntity<>( studyService.updateStudyBoard(id,reqStudyBoardDto, file), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 게시물 삭제", description = "스터디 게시판 게시물 삭제 기능을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/delete")
    public ResponseEntity<Boolean> deleteStudyBoard(@RequestParam Long id) {
        return new ResponseEntity<>( studyService.deleteStudyBoard(id), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 댓글 작성", description = "스터디 게시판에 댓글을 작성하는 기능을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("reply/write")
    public ResponseEntity<Boolean> insertReply(@RequestParam Long id, @RequestBody ReqCommentDto reqCommentDto, @RequestParam Long parentId) {
        return new ResponseEntity<>(studyService.insertReplyByStudyNo(id, reqCommentDto.getContent(), parentId, reqCommentDto.getMemberNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 댓글 조회", description = "스터디 게시판에 댓글을 조회 기능을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResReplyDataDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("reply/list")
    public ResponseEntity<ResReplyDataDto> selectReplyList(@RequestParam Long id, Pageable pageable) {
        return new ResponseEntity<>(studyService.selectStudyBoardCommentList(id, pageable), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 댓글 삭제", description = "스터디 게시판에 댓글을 삭제하기 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("reply/list/delete")
    public ResponseEntity<Boolean> deleteReply(@RequestParam Long id) {
        return new ResponseEntity<>(replyService.deleteReply(id), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 댓글 수정", description = "스터디 게시판에 댓글을 수정하기 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("reply/list/update")
    public ResponseEntity<Boolean> updateReply(@RequestParam Long id, @RequestBody Map<String, String> content) {
        String contentData = content.get("content");
        return new ResponseEntity<>(replyService.updateReply(id, contentData), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 댓글 번호에 맞는 댓글 내용 조회", description = "스터디 게시판에 댓글 번호에 맞는 댓글을 조회 하기 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("reply")
    public ResponseEntity<String> selectReplyById(@RequestParam Long id) {
        return new ResponseEntity<>(replyService.selectReplyContentById(id), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 탈퇴 리뷰 작성", description = "스터디 게시판 탈퇴 리뷰 작성을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("review/write")
    public ResponseEntity<Boolean> insertQuitReview(@RequestParam Long id, @RequestBody ReqQuitReviewDto reqQuitReviewDto ) {
        return new ResponseEntity<>(studyService.insertQuitReview(id, reqQuitReviewDto), HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시판 검색", description = "스터디 게시판 검색을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("list/search")
    public ResponseEntity<List<ResStudyBoardListDto>> selectStudyBoardListBySearch(@RequestParam String search, Pageable pageable) {
        return new ResponseEntity<>(studyService.selectStudyBoardListBySearch(search, pageable), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 참여", description = "스터디 그룹 참여를 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("studyJoin/insert")
    public ResponseEntity<Boolean> insertStudyJoinReq(@RequestBody ReqStudyJoinReqDto reqStudyJoinReqDto) {
        return new ResponseEntity<>(studyService.insertStudyJoinReq(reqStudyJoinReqDto.getMemberNo(), reqStudyJoinReqDto.getStudyNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 참여 여부", description = "스터디 그룹 참여 여부를 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("studyJoin/exist")
    public ResponseEntity<Boolean> isExistStudyJoinReq(@RequestBody ReqStudyJoinReqDto reqStudyJoinReqDto) {
        return new ResponseEntity<>(studyService.isExistStudyJoinReq(reqStudyJoinReqDto.getMemberNo(), reqStudyJoinReqDto.getStudyNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 참여 요청한 회원 수락", description = "스터디 그룹 참여 요청한 회원 수락을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("studyJoin/accept")
    public ResponseEntity<Boolean> acceptStudyJoinReq(@RequestBody ReqStudyJoinReqDto reqStudyJoinReqDto) {
        return new ResponseEntity<>(studyService.acceptStudyJoinReq(reqStudyJoinReqDto.getMemberNo(), reqStudyJoinReqDto.getStudyNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 참여 요청한 회원 거절", description = "스터디 그룹 참여 요청한 회원 거절을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("studyJoin/refuse")
    public ResponseEntity<Boolean> refuseStudyJoinReq(@RequestBody ReqStudyJoinReqDto reqStudyJoinReqDto) {
        return new ResponseEntity<>(studyService.refuseStudyJoinReq(reqStudyJoinReqDto.getMemberNo(), reqStudyJoinReqDto.getStudyNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 회원 강퇴", description = "스터디 그룹 회원 강퇴 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("studyJoin/kick")
    public ResponseEntity<Boolean> kickStudyJoinReq(@RequestBody ReqStudyJoinReqDto reqStudyJoinReqDto) {
        return new ResponseEntity<>(studyService.kickStudyJoinReq(reqStudyJoinReqDto.getMemberNo(), reqStudyJoinReqDto.getStudyNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 방장 위임", description = "스터디 그룹 방장 위임을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("studyJoin/delegate")
    public ResponseEntity<Boolean> delegateStudyJoinReq(@RequestBody ReqStudyJoinDelegateDto reqStudyJoinDelegateDto) {
        return new ResponseEntity<>(studyService.delegateStudyJoinReq(reqStudyJoinDelegateDto.getMemberNo() ,reqStudyJoinDelegateDto.getDelegateMemberNo(), reqStudyJoinDelegateDto.getStudyNo()), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 참여자 리스트 조회", description = "스터디 그룹 참여자 리스트 조회를 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyGroupListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("studyJoin/list")
    public ResponseEntity<List<ResStudyGroupListDto>> selectStudyGroupList(@RequestParam Long studyNo) {
        return new ResponseEntity<>(studyService.selectStudyGroupList(studyNo), HttpStatus.OK);
    }

    @Operation(summary = "스터디 그룹 참여요청 리스트 조회", description = "스터디 그룹 참여요청 리스트 조회를 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyGroupReqDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("studyJoinReq/list")
    public ResponseEntity<List<ResStudyGroupReqDto>> selectStudyGroupReqList(@RequestParam Long studyNo) {
        return new ResponseEntity<>(studyService.selectStudyGroupReqList(studyNo), HttpStatus.OK);
    }

    @Operation(summary = "홈 화면 스터디 그룹 추천 조회", description = "홈 화면 스터디 그룹 추천 조회를 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("recommend")
    public ResponseEntity<List<ResStudyBoardListDto>> selectRecommend(@RequestParam String hashTag) {
        return new ResponseEntity<>(studyService.selectStudyGroupByHashTag(hashTag), HttpStatus.OK);
    }

    @Operation(summary = "홈 화면 스터디 그룹 비회원 추천 조회", description = "홈 화면 스터디 그룹 비회원 추천 조회를 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("recommend/unlogin")
    public ResponseEntity<List<ResStudyBoardListDto>> selectRecommend() {
        return new ResponseEntity<>(studyService.selectStudyGroupTop4(), HttpStatus.OK);
    }
}
