package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.ResChatMessageDto;
import com.gisadan.studyhub.dto.request.ReqChatMessageDto;
import com.gisadan.studyhub.etc.ChatType;
import com.gisadan.studyhub.service.ChattingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChattingController {
    private final ChattingService chattingService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Operation(summary = "채팅 보내기 기능", description = "채팅을 보내기 위한 publish", tags = {"Chatting"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResChatMessageDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @MessageMapping("/chat/send/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ResChatMessageDto send(ReqChatMessageDto chat, @DestinationVariable Long chatRoomId){
        chattingService.insertChatting(chatRoomId, chat);

        return ResChatMessageDto.builder().message(chat.getMessage()).user(chat.getUser()).chatType(ChatType.SEND).profile(chat.getProfile()).isMe(false).build();
    }

    @Operation(summary = "채팅 입장 알림 통보후 채팅방 입장인원에 기록 기능", description = "채팅 입장 알림을 위한 publish", tags = {"Chatting"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResChatMessageDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @MessageMapping("/chat/enter/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ResChatMessageDto enterChat(@DestinationVariable Long chatRoomId, ReqChatMessageDto chat) {
        return ResChatMessageDto.builder().user(chat.getUser()).chatType(ChatType.ENTER).isMe(false).profile(chat.getProfile()).memberNo(chat.getMemberNo()).build();
    }

    @Operation(summary = "이후 채팅 입장한 사람들에게 본인의 입장 여부를 알리기위해 재알림 통보후 채팅방 입장인원에 기록 기능", description = "이후 채팅 입장한 사람들에게 본인의 입장 여부를 알리기 위한 publish", tags = {"Chatting"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResChatMessageDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @MessageMapping("/chat/arcenter/{chatRoomId}")
    @SendTo("/topic/chat/{chatRoomId}")
    public ResChatMessageDto arcEnterChat(@DestinationVariable Long chatRoomId, ReqChatMessageDto chat) {
        return ResChatMessageDto.builder().user(chat.getUser()).chatType(ChatType.ARCENTER).isMe(false).profile(chat.getProfile()).memberNo(chat.getMemberNo()).build();
    }

    @Operation(summary = "채팅 퇴장 알림 기능", description = "채팅 퇴장 알림 기능 위한 publish", tags = {"Chatting"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = void.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/chatting/leave")
    public void leaveChat(@RequestParam Long id, @RequestBody ReqChatMessageDto chat) {
        simpMessagingTemplate.convertAndSend("/topic/chat/" + id, ResChatMessageDto.builder().user(chat.getUser()).chatType(ChatType.LEAVE).isMe(false).build());
    }

    @Operation(summary = "채팅 내역을 불러오기 기능", description = "채팅을 내역을 불러오기 위한 REST API", tags = {"Chatting"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResChatMessageDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/chatting/list")
    public ResponseEntity<List<ResChatMessageDto>> selectChattingList(@RequestParam Long id){
        return new ResponseEntity<>(chattingService.selectChattingList(id), HttpStatus.OK);
    }
}
