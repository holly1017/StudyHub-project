package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.ResReplyDataDto;
import com.gisadan.studyhub.dto.reponse.ResTradeBoardByIdDto;
import com.gisadan.studyhub.dto.reponse.ResTradeBoardDto;
import com.gisadan.studyhub.dto.reponse.ResTradeBoardListDto;
import com.gisadan.studyhub.dto.request.ReqCommentDto;
import com.gisadan.studyhub.dto.request.ReqTradeBoardDto;
import com.gisadan.studyhub.service.ReplyService;
import com.gisadan.studyhub.service.TradeService;
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
@RequiredArgsConstructor
@RequestMapping("/trade")
public class TradeController {

    private final TradeService tradeService;
    private final ReplyService replyService;

    @Operation(summary = "거래 게시판 작성 요청", description = "거래 게시판 작성을 위한 REST API", tags = {"Trade"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ReqTradeBoardDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })

    @PostMapping("/write")
    public ResponseEntity<ResTradeBoardDto> insertTradeBoard(@RequestPart("trade") ReqTradeBoardDto reqTradeBoardDto, @RequestPart( value = "file", required = false )MultipartFile[] files) throws IOException {

        files = (files == null) ? new MultipartFile[0] : files;

        ResTradeBoardDto resTradeBoardDto = tradeService.insertTradeBoard(reqTradeBoardDto, files) ? new ResTradeBoardDto("성공입니다.") : new ResTradeBoardDto("실패입니다.");

        for(MultipartFile file : files) {
            System.out.println(file.getOriginalFilename());
        }
        return new ResponseEntity<>(resTradeBoardDto, HttpStatus.OK);
    }

    @Operation(summary = "거래 게시판 리스트 요청", description = "거래 게시판 리스트 조회를 위한 REST API", tags = {"Trade"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResTradeBoardListDto.class))),
            @ApiResponse(responseCode = "400", description  = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list")
    public ResponseEntity<List<ResTradeBoardListDto>> selectTradeBoardList(Pageable boardPage) {
        List<ResTradeBoardListDto> response = tradeService.selectTradeBoardList(boardPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "거래 게시물 상세조회 요청", description = "거래 게시물 상세조회를 위한 REST API", tags = {"Trade"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResTradeBoardByIdDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/view")
    public ResponseEntity<ResTradeBoardByIdDto> selectTradeBoardById(@RequestParam Long id) {
        ResTradeBoardByIdDto response = tradeService.selectTradeBoardById(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "거래 게시판 댓글 작성", description = "거래 게시판에 댓글을 작성기능을 위한 REST API", tags = {"Trade"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("reply/write")
    public ResponseEntity<Boolean> insertReply(@RequestParam Long id, @RequestBody ReqCommentDto reqCommentDto, @RequestParam Long parentId) {
        return new ResponseEntity<>(tradeService.insertReplyByTradeNo(id, reqCommentDto.getContent(), parentId, reqCommentDto.getMemberNo()), HttpStatus.OK);
    }

    @Operation(summary = "거래 게시판 댓글 조회", description = "거래 게시판에 댓글을 조회 기능을 위한 REST API", tags = {"Trade"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResReplyDataDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("reply/list")
    public ResponseEntity<ResReplyDataDto> selectReplyList(@RequestParam Long id, Pageable pageable) {
        return new ResponseEntity<>(tradeService.selectTradeBoardCommentList(id, pageable), HttpStatus.OK);
    }

    @Operation(summary = "거래 게시판 댓글 번호에 맞는 댓글 내용 조회", description = "거래 게시판에 댓글 번호에 맞는 댓글을 조회 하기 위한 REST API", tags = {"Trade"})
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

    @Operation(summary = "거래 게시판 댓글 삭제", description = "거래 게시판 댓글 삭제를 위한 REST API", tags = {"Trade"})
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

    @Operation(summary = "거래 게시판 댓글 수정", description = "거래 게시판에 댓글을 수정하기 위한 REST API", tags = {"Trade"})
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

    @Operation(summary = "판매 상태 변경", description = "판매 상태 변경을 위한 REST API", tags = {"Trade"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("list/view/sold")
    public ResponseEntity<Boolean> updateSellStatus(@RequestBody Map<String, Long> payload) {
        Long boardNo = payload.get("boardId");
        return new ResponseEntity<>(tradeService.updateSellStatus(boardNo), HttpStatus.OK);
    }

}
