package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.*;
import com.gisadan.studyhub.dto.request.*;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.entity.etc.UseDetail;
import com.gisadan.studyhub.service.MemberService;
import com.gisadan.studyhub.service.PaymentService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final PaymentService paymentService;

    @Operation(summary = "회원 추가 요청", description = "회원가입을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/signup/insert")
    public ResponseEntity<Boolean> insertMember(@RequestBody ReqMemberDto reqMemberDto) {
        Boolean result = memberService.insertMember(reqMemberDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "아이디 중복 확인 요청", description = "아이디 중복 확인 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/signup/id-check")
    public ResponseEntity<Boolean> idCheck(@RequestParam String id) {
        boolean exists = memberService.existsByMemberId(id);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @Operation(summary = "닉네임 중복 확인 요청", description = "닉네임 중복 확인 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/signup/nickname-check")
    public ResponseEntity<Boolean> nickNameCheck(@RequestParam String nickName) {
        boolean exists = memberService.existsByNickName(nickName);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @Operation(summary = "이메일 인증 번호 전송 요청", description = "이메일 인증 번호 전송을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/signup/auth-email")
    public ResponseEntity<Boolean> authEmail(@RequestParam String email) {
        boolean result = memberService.authEmail(email);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "이메일 인증 번호 확인 요청", description = "이메일 인증 번호 확인을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/signup/check-auth-email")
    public ResponseEntity<Boolean> checkAuthEmail(@RequestParam String email, String authEmail) {
        boolean result = memberService.checkAuthEmail(email, authEmail);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "전화번호 인증 번호 전송 요청", description = "전화번호 인증 번호 전송을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/signup/auth-phone")
    public ResponseEntity<Boolean> authPhone(@RequestParam String phone) {
        boolean result = memberService.authPhone(phone);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "전화번호 인증 번호 확인 요청", description = "전화번호 인증 번호 확인을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/signup/check-auth-phone")
    public ResponseEntity<Boolean> checkAuthPhone(@RequestParam String phone, String authPhone) {
        boolean result = memberService.checkAuthPhone(phone, authPhone);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "계정 리스트 요청", description = "이메일을 통한 계정을 찾기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/idfind/list")
    public ResponseEntity<List<ResMemberIdFindDto>> accountList(@RequestParam String email) {
        List<ResMemberIdFindDto> result = memberService.accountList(email, Status.YES);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "로그인 회원 정보 수정 요청", description = "로그인 회원 정보 수정 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/pwfind/update")
    public ResponseEntity<Boolean> passwordUpdate(@RequestBody ReqMemberPwChgDTO reqMemberPwChgDTO){
        Boolean result = memberService.passwordUpdate(reqMemberPwChgDTO.getId(), reqMemberPwChgDTO.getNewPw());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "로그인 회원 정보 요청", description = "로그인 회원 정보 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/get-current-member")
    public ResponseEntity<ResMemberDto> getCurrentMember(Authentication authentication){
        System.out.println(authentication.getName());
        ResMemberDto response = memberService.selectMember(authentication.getName()); // memberId
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원 탈퇴 요청", description = "회원 상태 업데이트 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/mypage/delete")
    public ResponseEntity<Boolean> deleteMember(@RequestBody ReqMemberDelDto reqMemberDelDto) {
        Boolean result  = memberService.deleteMember(reqMemberDelDto.getId(), reqMemberDelDto.getPw());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원 정보 요청", description = "회원 정보 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/mypage/info")
    public ResponseEntity<ResMemberInfoDto> memberInfo(@RequestBody Map<String, String> payload) {
        String memberId = payload.get("memberId");
        ResMemberInfoDto member = memberService.memberInfo(memberId);
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @Operation(summary = "회원 정보 수정 요청", description = "회원 정보 수정 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/mypage/info-update")
    public ResponseEntity<Boolean> memberInfo(@RequestPart("member") ReqMemberInfoDto reqMemberInfoDto, @RequestPart( value = "file", required = false)MultipartFile file) throws IOException {
        Boolean result  = memberService.memberInfoUpdate(reqMemberInfoDto, file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원이 작성한 질문 리스트 요청", description = "회원이 작성한 질문 리스트 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/qna-myqna")
    public ResponseEntity<ResQnADataDto> selectMemberQnABoardList(@RequestParam Long memberNo, Pageable pageable) {
        ResQnADataDto response = memberService.selectMemberQnABoardList(memberNo, pageable);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원이 작성한 답변 리스트 요청", description = "회원이 작성한 답변 리스트 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/qna-myans")
    public ResponseEntity<ResQnADataDto> selectMemberAnsBoardList(@RequestParam Long memberNo, Pageable pageable) {
        ResQnADataDto response = memberService.selectMemberAnsBoardList(memberNo, pageable);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원이 좋아요한 글 리스트 요청", description = "회원이 좋아요한 글 리스트 요청을 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResMemberDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/qna-like")
    public ResponseEntity<ResQnADataDto> selectMemberLikeBoardList(@RequestParam Long memberNo, Pageable pageable) {
        ResQnADataDto response = memberService.selectMemberLikeBoardList(memberNo, pageable);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원이 속한 스터디그룹 리스트 요청", description = "회원이 속한 스터디그룹 리스트를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/group")
    public ResponseEntity<List<ResStudyBoardListDto>> selectStudyBoardListByMemberNo(@RequestParam Long memberNo, Pageable pageable) {
        List<ResStudyBoardListDto> response = memberService.selectStudyBoardListByMemberNo(memberNo, pageable);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @Operation(summary = "회원 닉네임 키워드 검색 결과 리스트 요청", description = "회원 닉네임 키워드 검색 결과 리스트를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/search")
    public ResponseEntity<List<ResSearchMemberDto>> searchMemberList(@RequestParam String nickNameKeyword, Long memberNo) {
        System.out.println(nickNameKeyword);
        List<ResSearchMemberDto> response = memberService.searchMemberList(nickNameKeyword, memberNo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원 친구 추가 요청", description = "회원 친구 추가를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/search-request")
    public ResponseEntity<Boolean> sendFriendRequest(@RequestParam Long memberNo, Long friendNo) {
        Boolean result = memberService.sendFriendRequest(memberNo, friendNo);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "친구 요청 거절", description = "친구 요청 거절을 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/request-reject")
    public ResponseEntity<Boolean> rejectFriendRequest(@RequestParam Long memberNo, Long friendNo) {
        Boolean result = memberService.rejectFriendRequest(memberNo, friendNo);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원의 친구 리스트 요청", description = "회원의 친구 리스트를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/myfriend")
    public ResponseEntity<List<ResSearchMemberDto>> selectFriendList(@RequestParam Long memberNo) {
        List<ResSearchMemberDto> response = memberService.selectFriendList(memberNo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원의 친구요청 리스트 요청", description = "회원의 친구요청 리스트를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/waiting")
    public ResponseEntity<List<ResSearchMemberDto>> selectWaitingFriendList(@RequestParam Long memberNo) {
        List<ResSearchMemberDto> response = memberService.selectWaitingFriendList(memberNo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "친구 요청 수락", description = "친구 요청 수락을 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/request-accept")
    public ResponseEntity<Boolean> acceptFriendReqeuest(@RequestParam Long memberNo, Long friendNo) {
        Boolean result = memberService.acceptFriendReqeuest(memberNo, friendNo);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "친구 삭제 요청", description = "친구 삭제를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/friend/delete")
    public ResponseEntity<Boolean> deleteFriend(@RequestParam Long memberNo, Long friendNo) {
        System.out.println(memberNo + ", "+  friendNo);
        Boolean result = memberService.deleteFriend(memberNo, friendNo);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @Operation(summary = "회원의 프로필, 인기도, 포인트 요청", description = "회원의 프로필, 인기도, 포인트를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/profile")
    public ResponseEntity<ResImgPathAndPopCntDto> selectImgPathAndPopCntAndPoint(@RequestBody ReqMemberNoDto reqMemberNoDto) {
        ResImgPathAndPopCntDto result = memberService.selectImgPathAndPopCntAndPoint(reqMemberNoDto.getMemberNo());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원의 인기도 증가", description = "회원의 인기도 증가 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/pop/increment")
    public ResponseEntity<Boolean> incrementPopularity(@RequestBody ReqMemberNoDto reqMemberNoDto) {
        Boolean result = memberService.incrementPopularity(reqMemberNoDto.getMemberNo());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원의 인기도 감소", description = "회원의 인기도 감소 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/pop/decrement")
    public ResponseEntity<Boolean> decrementPopularity(@RequestBody ReqMemberNoDto reqMemberNoDto) {
        Boolean result = memberService.decrementPopularity(reqMemberNoDto.getMemberNo());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원의 포인트 증가", description = "회원의 포인트 증가 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/point/increment")
    public ResponseEntity<Boolean> incrementPoint(@RequestBody ReqMemberPointDto reqMemberPointDtoDto) {
        Boolean result = memberService.incrementPoint(reqMemberPointDtoDto.getMemberNo(), reqMemberPointDtoDto.getPoint(), reqMemberPointDtoDto.getUseDetail());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원의 포인트 감소", description = "회원의 포인트 감소 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/point/decrement")
    public ResponseEntity<Boolean> decrementPoint(@RequestBody ReqMemberPointDto reqMemberPointDtoDto) {
        Boolean result = memberService.decrementPoint(reqMemberPointDtoDto.getMemberNo(), reqMemberPointDtoDto.getPoint(), reqMemberPointDtoDto.getUseDetail());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원의 포인트 충전", description = "회원의 포인트 충전을 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/mypage/point/charge")
    public IamportResponse<Payment> pointChargePayment(@RequestBody ReqPointChargeDto reqPointChargeDto) throws IamportResponseException, IOException {
        String imp_uid = reqPointChargeDto.getImpUid();
        Long memberNo = reqPointChargeDto.getMemberNo();
        UseDetail useDetail = reqPointChargeDto.getUseDetail();

        System.out.println("결제 번호:" + imp_uid + ", 회원 번호:" + memberNo + ", 포인트 내역: " + useDetail);

        IamportResponse<Payment> response = paymentService.paymentByImpUid(imp_uid);

        if (response != null && "paid".equals(response.getResponse().getStatus())) {
            // 결제 성공
            int point = response.getResponse().getAmount().intValue();
            memberService.incrementPoint(memberNo, point, useDetail);

            return response;
        } else {
            // 결제 실패 처리
            return response;
        }
    }

    @Operation(summary = "회원의 포인트 로그 리스트", description = "회원의 포인트 로그 리스트를 요청하기 위한 REST API", tags = {"Member"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResStudyBoardListDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mypage/point/log")
    public ResponseEntity<ResPointLogDataDto> selectPointLoglist(@RequestParam Long memberNo, Pageable pageable) {
        ResPointLogDataDto response = memberService.selectPointLoglist(memberNo, pageable);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
