package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.*;
import com.gisadan.studyhub.dto.request.ReqCommentDto;
import com.gisadan.studyhub.dto.request.ReqQnABoardDto;
import com.gisadan.studyhub.dto.request.ReqQnABoardNoDto;
import com.gisadan.studyhub.dto.request.ReqQnABoardNoMemberNoDto;
import com.gisadan.studyhub.service.ReplyService;
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
import com.gisadan.studyhub.service.QnAService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QnAController {

    private final QnAService qnAService;
    private final ReplyService replyService;

    @Operation(summary = "질문 게시글 / 답변 게시글 작성 요청", description = "질문 게시글 / 답변 게시글 작성을 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResQnABoardDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/write")
    public ResponseEntity<ResQnABoardDto> insertQnABoard(@RequestBody ReqQnABoardDto reqQnABoardDto) {
        ResQnABoardDto resQnABoardDto = qnAService.insertQnABoard(reqQnABoardDto) ? new ResQnABoardDto("성공입니다.") : new ResQnABoardDto("실패입니다.");
        return new ResponseEntity<>(resQnABoardDto, HttpStatus.OK);
    }

    @Operation(summary = "질문 게시판 리스트 요청", description = "질문 게시판 리스트 조회를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResQnABoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list")
    public ResponseEntity<ResQnADataDto> selectQnABoardList(Pageable boardPage) {
        ResQnADataDto response = qnAService.selectQnABoardList(boardPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "질문 게시글 상세정보 요청", description = "질문 게시글 상세정보 조회를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResQnABoardByIdDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/view")
    public ResponseEntity<ResQnABoardByIdDto> selectQnABoardById(@RequestParam Long id) {
        ResQnABoardByIdDto response = qnAService.selectQnABoardById(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "질문 답변 수정 요청", description = "질문 답변 수정을 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/list/update")
    public ResponseEntity<Boolean> updateQnA(@RequestParam Long id, @RequestBody ReqQnABoardDto reqQnABoardDto) {
        return new ResponseEntity<>(qnAService.updateQnA(id, reqQnABoardDto), HttpStatus.OK);
    }

    @Operation(summary = "질문 답변 삭제 요청", description = "질문 답변 삭제를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("list/delete")
    public ResponseEntity<Boolean> deleteQnA(@RequestParam Long id) {
        return new ResponseEntity<>(qnAService.deleteQnA(id), HttpStatus.OK);
    }

    @Operation(summary = "질문 게시판 댓글 작성", description = "질문 게시판에 댓글을 작성기능을 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("reply/write")
    public ResponseEntity<Boolean> insertReply(@RequestParam Long id, @RequestBody ReqCommentDto reqCommentDto, @RequestParam Long parentId) {
        return new ResponseEntity<>(qnAService.insertReplyByQnANo(id, reqCommentDto.getContent(), parentId, reqCommentDto.getMemberNo()), HttpStatus.OK);
    }

    @Operation(summary = "질문 게시판 댓글 번호에 맞는 댓글 내용 조회", description = "질문 게시판에 댓글 번호에 맞는 댓글을 조회 하기 위한 REST API", tags = {"QnA"})
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

    @Operation(summary = "질문 게시판 댓글 조회", description = "질문 게시판에 댓글을 조회 기능을 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResReplyDataDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("reply/list")
    public ResponseEntity<ResReplyDataDto> selectReplyList(@RequestParam Long id, Pageable pageable) {
        return new ResponseEntity<>(qnAService.selectQnABoardCommentList(id, pageable), HttpStatus.OK);
    }

    @Operation(summary = "질문 게시판 댓글 삭제", description = "질문 게시판 댓글 삭제를 위한 REST API", tags = {"QnA"})
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

    @Operation(summary = "질문 게시판 댓글 수정", description = "질문 게시판에 댓글을 수정하기 위한 REST API", tags = {"QnA"})
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

    @Operation(summary = "홈 베스트 질문 리스트 조회", description = "홈 베스트 질문 리스트 조회를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResBestQnADto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/bestQuestion")
    public ResponseEntity<List<ResBestQnADto>> selectBestQnABoardList() {
        return new ResponseEntity<>(qnAService.selectBestQnABoardList(), HttpStatus.OK);
    }

    @Operation(summary = "검색된 질문 리스트 조회", description = "검색된 질문 리스트 조회를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResQnADataDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/search")
    public ResponseEntity<ResQnADataDto> selectQnABoardListSearch(@RequestParam String search, Pageable pageable) {
        ResQnADataDto response = qnAService.selectQnABoardListSearch(search, pageable);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "답변 채택 요청", description = "답변 채택 요청을 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/adopted")
    public ResponseEntity<Boolean> insertAdopted(@RequestBody ReqQnABoardNoDto reqQnABoardNoDto) {
        return new ResponseEntity<>(qnAService.insertAdopted(reqQnABoardNoDto), HttpStatus.OK);
    }

    @Operation(summary = "조회수 증가 요청", description = "조회수 증가를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/list/view/viewCount")
    public ResponseEntity<Boolean> incrementPoint(@RequestBody ReqQnABoardNoMemberNoDto reqQnABoardNoMemberNoDto) {
        return new ResponseEntity<>(qnAService.incrementViewCount(reqQnABoardNoMemberNoDto), HttpStatus.OK);
    }

    @Operation(summary = "좋아요 추가 요청", description = "좋아요 증가를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/list/view/like")
    public ResponseEntity<Boolean> incrementLike(@RequestBody ReqQnABoardNoMemberNoDto reqQnABoardNoMemberNoDto) {
        return new ResponseEntity<>(qnAService.incrementLike(reqQnABoardNoMemberNoDto), HttpStatus.OK);
    }

    @Operation(summary = "좋아요 삭제 요청", description = "좋아요 감소를 위한 REST API", tags = {"QnA"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/list/view/unlike")
    public ResponseEntity<Boolean> decrementLike(@RequestBody ReqQnABoardNoMemberNoDto reqQnABoardNoMemberNoDto) {

        return new ResponseEntity<>(qnAService.decrementLike(reqQnABoardNoMemberNoDto), HttpStatus.OK);
    }
}
