package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.ResCalendarDto;
import com.gisadan.studyhub.dto.reponse.ResCalendarListDto;
import com.gisadan.studyhub.dto.reponse.ResReplyDataDto;
import com.gisadan.studyhub.dto.request.ReqScheduleDto;
import com.gisadan.studyhub.dto.request.ReqScheduleReplyDto;
import com.gisadan.studyhub.service.ReplyService;
import com.gisadan.studyhub.service.ScheduleService;
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

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final ReplyService replyService;

    @Operation(summary = "스케쥴 게시판 작성 요청", description = "스케쥴 게시판 작성을 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/write")
    public ResponseEntity<Boolean> insertScheduleBoard(@RequestBody ReqScheduleDto reqScheduleDto, @RequestParam Long id, @RequestParam Long memberNo) throws ParseException {
        return new ResponseEntity<>(scheduleService.insertScheduleBoard(reqScheduleDto, id, memberNo), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시판 리스트 요청", description = "스케쥴 게시판 리스트 조회 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResCalendarListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list")
    public ResponseEntity<List<ResCalendarListDto>> selectScheduleBoardList(@RequestParam Long id) {
        return new ResponseEntity<>(scheduleService.selectScheduleBoardList(id), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시판 상세보기 요청", description = "스케쥴 게시판 상세보기를 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResCalendarDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/view")
    public ResponseEntity<ResCalendarDto> selectScheduleBoardById(@RequestParam Long studyId, @RequestParam Long calendarId) {
        return new ResponseEntity<>(scheduleService.selectScheduleBoardById(studyId, calendarId), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시판 삭제 요청", description = "스케쥴 게시판 삭제 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/list/delete")
    public ResponseEntity<Boolean> selectScheduleBoardDeleteById(@RequestParam Long studyId, @RequestParam Long calendarId) {
        return new ResponseEntity<>(scheduleService.selectScheduleBoardDeleteById(studyId, calendarId), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시물에 댓글 작성", description = "스케쥴 게시판에 댓글을 작성하기 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/reply/write")
    public ResponseEntity<Boolean> insertScheduleBoardReplyById(@RequestBody ReqScheduleReplyDto reqScheduleReplyDto) {
        return new ResponseEntity<>(scheduleService.insertScheduleBoardReplyById(reqScheduleReplyDto.getStudyId(), reqScheduleReplyDto.getCalendarId(), reqScheduleReplyDto.getParentId(), reqScheduleReplyDto.getContent(), reqScheduleReplyDto.getMemberNo()), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시판 댓글 조회", description = "스케쥴 게시판에 댓글을 조회 기능을 위한 REST API", tags = {"Study"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResReplyDataDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("reply/list")
    public ResponseEntity<ResReplyDataDto> selectReplyList(@RequestParam Long id, @RequestParam Long calendarId, Pageable pageable) {
        return new ResponseEntity<>(scheduleService.selectStudyBoardCommentList(id, calendarId, pageable), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시판 댓글 삭제", description = "스케쥴 게시판에 댓글을 삭제하기 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/reply/list/delete")
    public ResponseEntity<Boolean> deleteScheduleBoardReplyById(@RequestParam Long id) {
        return new ResponseEntity<>(replyService.deleteReply(id), HttpStatus.OK);
    }

    @Operation(summary = "스케쥴 게시판 댓글 수정", description = "스케쥴 게시판에 댓글을 수정하기 위한 REST API", tags = {"Schedule"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/reply/list/update")
    public ResponseEntity<Boolean> updateScheduleBoardReplyById(@RequestParam Long id,  @RequestBody Map<String, String> content) {
        String contentData = content.get("content");
        return new ResponseEntity<>(replyService.updateReply(id, contentData), HttpStatus.OK);
    }
}
