package com.gisadan.studyhub.service;

import com.gisadan.studyhub.dto.reponse.*;
import com.gisadan.studyhub.dto.request.ReqMemberDto;
import com.gisadan.studyhub.dto.request.ReqMemberInfoDto;
import com.gisadan.studyhub.dto.request.ReqMyQnABoardListDto;
import com.gisadan.studyhub.dto.request.ReqMyStudyBoardListDto;
import com.gisadan.studyhub.entity.*;
import com.gisadan.studyhub.entity.etc.FriendStatus;
import com.gisadan.studyhub.entity.etc.MemberGrade;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.entity.etc.UseDetail;
import com.gisadan.studyhub.etc.EmailService;
import com.gisadan.studyhub.etc.ImageLogic;
import com.gisadan.studyhub.etc.PhoneService;
import com.gisadan.studyhub.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final PhoneService phoneService;
    private final RedisTemplate<String, String> redisTemplate;
    private final QnARepository qnARepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FriendRepository friendRepository;
    private final PointLogRepository pointLogRepository;
    private final UsePointLogRepository usePointLogRepository;
    private final FriendService friendService;


    /**
     * 회원가입을 위한 메소드
     *
     * @param reqMemberDto 회원 데이터 DTO 객체
     * @return 성공 여부
     */
    public boolean insertMember(ReqMemberDto reqMemberDto) {
        String strHashTag = String.join(",", reqMemberDto.getHashTag());
        String fullAddress = reqMemberDto.getPostcode() + "," + reqMemberDto.getAddress() + "," + reqMemberDto.getDetailAddress();
        String bCryptedPassword = bCryptPasswordEncoder.encode(reqMemberDto.getPw());

        Member memberEntity = Member.builder()
                .memberId(reqMemberDto.getId())
                .password(bCryptedPassword)
                .nickName(reqMemberDto.getNickName())
                .point(0)
                .popularity(0)
                .profile("http://localhost:8080/uploads/user/" + reqMemberDto.getId() + ".jpg")
                .status(Status.YES)
                .grade(MemberGrade.USER)
                .address(fullAddress)
                .phone(reqMemberDto.getPhone())
                .email(reqMemberDto.getEmail())
                .hashTag(strHashTag)
                .build();

        if (memberRepository.save(memberEntity) != null) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * 아이디 중복 확인 메소드
     *
     * @param id 중복 조회할 아이디
     * @return 중복 여부
     */
    public boolean existsByMemberId(String id) {
        return !memberRepository.existsByMemberId(id);
    }

    /**
     * 닉네임 중복 확인 메소드
     *
     * @param nickName 중복 조회할 닉네임
     * @return 중복 여부
     */
    public boolean existsByNickName(String nickName) {
        return !memberRepository.existsByNickName(nickName);
    }

    /**
     * 이메일 인증번호 전송 메소드
     *
     * @param email 인증번호를 전송할 이메일
     * @return 성공 여부
     */
    public boolean authEmail(String email) {
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        if (emailService.sendAuthEmail(email, authKey)) {
            // redis에 3분간 인증번호 저장
            ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
            valueOps.set(email, authKey, 3, TimeUnit.MINUTES);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 이메일 인증번호 확인 메소드
     *
     * @param email     인증번호를 보낸 이메일
     * @param authEmail 해당 이메일에 보낸 인증번호
     * @return 일치 여부
     */
    public boolean checkAuthEmail(String email, String authEmail) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
        String value = valueOps.get(email);

        if (value == null) {
            return false;
        }

        return authEmail.equals(value);
    }

    /**
     * 전화번호 인증번호 전송 메소드
     *
     * @param phone 인증번호를 전송할 전화번호
     * @return 성공 여부
     */
    public boolean authPhone(String phone) {
        // 해당 전화번호로 인증 번호 전송
        // 전송 후 redis에 저장하는 로직
        return false;
    }

    /**
     * 전화번호 인증번호 확인 메소드
     *
     * @param phone     인증번호를 보낸 전화번호
     * @param authPhone 해당 전화번호에 보낸 인증번호
     * @return 일치 여부
     */
    public boolean checkAuthPhone(String phone, String authPhone) {
        // redis에 저장된 인증번호가 해당 전화번호의 인증번호와 동일한 지 확인하는 로직
        return false;
    }

    /**
     * 아이디 찾기를 위한 계정 조회 메소드
     *
     * @param email 계정을 조회할 이메일
     * @return 계정 리스트
     */
    public List<ResMemberIdFindDto> accountList(String email, Status status) {
        List<Member> list =  memberRepository.findByEmailAndStatus(email, status);

        return list.stream()
                .map(member -> ResMemberIdFindDto.of(member.getNickName(), member.getMemberId()))
                .collect(Collectors.toList());
    }

    /**
     * 로그인된 사용자의 정보를 가져올 메소드
     *
     * @param id 로그인된 사용자의 아이디
     * @return 사용자 객체
     */
    public ResMemberDto selectMember(String id) {
        Member memberEntity = memberRepository.findByMemberId(id);
        return ResMemberDto.of(memberEntity);
    }

    /**
     * 사용자의 비밀번호를 변경할 메소드
     *
     * @param id    로그인된 사용자의 아이디
     * @param newPw 현재 비밀번호
     * @return 변경 성공 여부
     */
    @Transactional
    public Boolean passwordUpdate(String id, String newPw) {
        Member member = memberRepository.findByMemberId(id);
        if (member == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
        }

        member.setPassword(bCryptPasswordEncoder.encode(newPw));
        return true;
    }

    /**
     * 사용자 탈퇴 처리 메소드
     *
     * @param id 로그인된 사용자의 아이디
     * @param pw 로그인된 사용자의 비밀번호
     * @return 탈퇴 성공 여부
     */
    @Transactional
    public Boolean deleteMember(String id, String pw) {
        Member member = memberRepository.findByMemberIdAndStatus(id, Status.YES);

        if (bCryptPasswordEncoder.matches(pw, member.getPassword())) {
            // 회원 상태를 비활성화로 업데이트
            member.setStatus(Status.NO);
            return true;
        }
        return false;
    }

    /**
     * 마이페이지에 뿌릴 사용자의 정보 조회 메소드
     *
     * @param id 로그인된 사용자의 아이디
     * @return 사용자의 정보가 담긴 dto 객체
     */
    public ResMemberInfoDto memberInfo(String id) {
        Member memberEntity = memberRepository.findByMemberId(id);
        System.out.println(memberEntity);
        return ResMemberInfoDto.of(memberEntity);
    }

    /**
     * 사용자의 정보 수정 메소드
     *
     * @param reqMemberInfoDto 사용자의 수정 정보가 담긴 dto 객체
     * @return 수정 성공 여부
     */
    @Transactional
    public Boolean memberInfoUpdate(ReqMemberInfoDto reqMemberInfoDto, MultipartFile file) {
        Member member = memberRepository.findByMemberId(reqMemberInfoDto.getMemberId());
        System.out.println(member.getMemberId());
        if (member == null) {
            return false;
        }

        String fileName = "";
        if (file != null && !file.isEmpty()) {
            fileName = ImageLogic.saveProfile(file, reqMemberInfoDto.getMemberId());
        }

        String fullAddress = reqMemberInfoDto.getPostCode() + "," + reqMemberInfoDto.getAddress() + "," + reqMemberInfoDto.getDetailAddress();

        if (bCryptPasswordEncoder.matches(reqMemberInfoDto.getPassword(), member.getPassword())) {
            member.setNickName(reqMemberInfoDto.getNickName());
            member.setProfile(fileName.isEmpty() ? "" : "http://localhost:8080/uploads/user/" + fileName);
            member.setAddress(fullAddress);
            member.setPhone(reqMemberInfoDto.getPhone());
            member.setEmail(reqMemberInfoDto.getEmail());

            return true;
        } else {
            return false;
        }
    }

    /**
     * 로그인된 사용자의 정보를 가져올 메소드
     *
     * @param memberNo 로그인된 사용자의 고유 번호
     * @return 사용자 객체
     */
    public Member selectMemberNo(Long memberNo) {
        return memberRepository.findByMemberNo(memberNo);
    }

    /**
     * 로그인 된 사용자의 가입된 스터디룸 리스트 조회 메소드
     * @param memberNo 로그인된 사용자의 고유 번호
     * @param pageable 페이지네이션 객체
     * @return 조회 리스트
     */
    public List<ResStudyBoardListDto> selectStudyBoardListByMemberNo(Long memberNo, Pageable pageable) {
        List<ResStudyBoardListDto> result = memberRepository.findStudyByBoardDeleteStatusAndMemberNo(Status.NO, memberNo, pageable)
                .stream()
                .map(ResStudyBoardListDto::of)
                .toList();

        return result;
    }

    /**
     * 회원이 등록한 질문 게시글 조회 메소드
     * @param memberNo 질문을 남긴 회원의 번호
     * @param pageable 페이지네이션 객체
     * @return 조회 결과
     */
    public ResQnADataDto selectMemberQnABoardList(Long memberNo, Pageable pageable) {
        List<QnA> list = memberRepository.findQnAByMemberIdAndStatus(Status.NO, memberNo, pageable).getContent();

        List<ResQnABoardListDto> result = new ArrayList<>();

        for (QnA qnA : list) {
            List<QnA> relatedQnAs = qnARepository.findByParentNo(qnA);

            ResQnABoardListDto dto = ResQnABoardListDto.of(qnA, relatedQnAs.size());

            result.add(dto);
        }

        int count = memberRepository.findQnAByMemberIdAndStatus(Status.NO, memberNo, pageable).getTotalPages();

        return ResQnADataDto.of(count, result);
    }

    /**
     * 회원이 남긴 답글의 질문 게시글 조회 메소드
     * @param memberNo 답글을 남긴 회원의 번호
     * @param pageable 페이지네이션 객체
     * @return 조회 결과
     */
    public ResQnADataDto selectMemberAnsBoardList(Long memberNo, Pageable pageable) {
        List<QnA> list = memberRepository.findQnAByMemberIdAndStatusAndParentsId(Status.NO, memberNo, pageable).getContent();
        List<ResQnABoardListDto> result = new ArrayList<>();

        for (QnA qnA : list) {
            List<QnA> relatedQnAs = qnARepository.findByParentNo(qnA);

            ResQnABoardListDto dto = ResQnABoardListDto.of(qnA, relatedQnAs.size());

            result.add(dto);
        }
        int count = memberRepository.findQnAByMemberIdAndStatusAndParentsId(Status.NO, memberNo, pageable).getTotalPages();

        return ResQnADataDto.of(count, result);
    }

    /**
     * 회원이 좋아요 누른 게시글 조회 메소드
     * @param memberNo 좋아요를 누른 회원의 번호
     * @param pageable 페이지네이션 객체
     * @return 조회 결과
     */
    public ResQnADataDto selectMemberLikeBoardList(Long memberNo, Pageable pageable) {
        List<QnA> list = memberRepository.findLikeQnAByMemberIdAndStatus(Status.NO, memberNo, pageable).getContent();
        List<ResQnABoardListDto> result = new ArrayList<>();

        for (QnA qnA : list) {
            List<QnA> relatedQnAs = qnARepository.findByParentNo(qnA);

            ResQnABoardListDto dto = ResQnABoardListDto.of(qnA, relatedQnAs.size());

            result.add(dto);
        }
        int count = memberRepository.findLikeQnAByMemberIdAndStatus(Status.NO, memberNo, pageable).getTotalPages();

        return ResQnADataDto.of(count, result);
    }

    /**
     * 사용자 검색 리스트 조회 리스트
     * @param nickNameKeyword 닉네임 키워드
     * @return
     */
//    public List<ResSearchMemberDto> searchMemberList(String nickNameKeyword, Long memberNo) {
//        List<Member> list = memberRepository.findByNickNameContaining(Status.YES, nickNameKeyword);
//    // 'memberNo'가 memberNo거나 'friend'가 memberNo
//        return list.stream()
//                .filter(member -> !member.getMemberNo().equals(memberNo))
//                .map(member -> {
//                    ResSearchMemberDto dto = ResSearchMemberDto.of(member);
//
//                    boolean hasSentRequest = friendService.hasSentRequest(memberNo, member.getMemberNo());
//                    dto.setHasSentRequest(hasSentRequest);
//
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }
    public List<ResSearchMemberDto> searchMemberList(String nickNameKeyword, Long memberNo) {
        List<Member> members = memberRepository.findByNickNameContaining(Status.YES, nickNameKeyword);
        List<Friend> friends = memberRepository.findFriendsByMemberNoAndStatuses(memberNo, List.of(FriendStatus.ACCEPTED, FriendStatus.WAITING));

        return members.stream()
                .filter(member -> !member.getMemberNo().equals(memberNo))
                .map(member -> {
                    ResSearchMemberDto dto = ResSearchMemberDto.of(member);

                    boolean hasSentRequest = friends.stream().anyMatch(friend ->
                            (friend.getMember().getMemberNo().equals(memberNo) && friend.getFriend().equals(member.getMemberNo())) ||
                                    (friend.getFriend().equals(memberNo) && friend.getMember().getMemberNo().equals(member.getMemberNo()))
                    );
                    dto.setHasSentRequest(hasSentRequest);

                    return dto;
                })
                .collect(Collectors.toList());
    }

    /**
     * 친구 요청을 보내는 메소드
     * @param memberNo 요청을 보내는 회원의 번호
     * @param friendNo 요청을 받은 회원의 번호
     * @return 성공 여부
     */
    public Boolean sendFriendRequest(Long memberNo, Long friendNo) {
        Friend friendRequest = Friend.builder()
                .member(selectMemberNo(memberNo))
                .friend(friendNo)
                .status(FriendStatus.WAITING)
                .build();
        if(friendService.sentFriendRequest(friendRequest)) { return true; }

        return false;
    }

    /**
     * 회원과 친구인 회원들의 리스트 조회 메소드
     * @param memberNo 로그인된 회원의 번호
     * @return 친구 회원 리스트
     */
    public List<ResSearchMemberDto> selectFriendList(Long memberNo) {
        // 해당 회원 번호의 friendNo 또는 memberNo가 memberNo와 일치하고 상태는 ACCEPTED인 리스트
        List<Friend> list = friendService.selectFriendList(memberNo);

        return list.stream()
                .map(friend -> {
                    Long friendNo;
                    if (friend.getFriend().equals(memberNo)) {
                        friendNo = friend.getMember().getMemberNo();
                    } else {
                        friendNo = friend.getFriend();
                    }
                    return ResSearchMemberDto.of(selectMemberNo(friendNo)); // 해당 친구 번호로 ResMemberDto 변환
                })
                .collect(Collectors.toList());
    }

    /**
     * 회원에게 친구 요청을 보낸 회원의 리스트 조회 메소드
     * @param memberNo 로그인된 회원의 번호
     * @return 요청을 보낸 친구 리스트
     */
    public List<ResSearchMemberDto> selectWaitingFriendList(Long memberNo) {
        List<Friend> list = friendService.selectWaitingFriendList(memberNo);

        return list.stream()
                .map(friend -> {
                    Long fromMemberNo = friend.getMember().getMemberNo(); // friendNo를 통해 친구 회원 번호 가져오기
                    return ResSearchMemberDto.of(selectMemberNo(fromMemberNo)); // 해당 친구 번호로 ResMemberDto 변환
                })
                .collect(Collectors.toList());
    }

    /**
     * 친구 요청을 수락하는 메소드
     * @param memberNo 로그인된 회원의 번호
     * @param friendNo 요청을 보낸 회원의 번호
     * @return 성공 여부
     */
    @Transactional
    public Boolean acceptFriendReqeuest(Long memberNo, Long friendNo) {
        //friendNo가 memberNo, member가 memberNo 의 객체
        List<Friend> waitingRequests = friendService.selectWaitingFriendList(memberNo);

        // 요청 목록에서 요청을 보낸 회원 번호가 일치하는 친구 요청을 찾기
        for (Friend request : waitingRequests) {
            if (request.getMember().getMemberNo().equals(friendNo)) {
                request.setStatus(FriendStatus.ACCEPTED);

                return true;
            }
        }

        return false;
    }

    /**
     * 친구 요청을 거절하는 메소드
     * @param memberNo 로그인된 회원의 번호
     * @param friendNo 요청을 보낸 회원의 번호
     * @return 성공 여부
     */
    @Transactional
    public Boolean rejectFriendRequest(Long memberNo, Long friendNo) {
        List<Friend> list = friendService.selectWaitingFriendList(memberNo);

        // 요청 목록에서 요청을 보낸 회원 번호가 일치하는 친구 요청을 찾기
        for (Friend request : list) {
            if (request.getMember().getMemberNo().equals(friendNo)) {
                friendRepository.delete(request);
                return true;
            }
        }

        return false;
    }

    /**
     * 친구를 삭제하는 메소드
     * @param memberNo 로그인된 회원의 번호
     * @param friendNo 삭제할 회원의 번호
     * @return 성공 여부
     */
    public Boolean deleteFriend(Long memberNo, Long friendNo) {
        Friend friendLog = friendService.myFriendList(memberNo, friendNo);

        return friendService.deleteFriend(friendLog);
    }

    /**
     * 사용자의 이미지 경로와 인기도 조회 메소드
     *
     * @param memberNo
     * @return
     */
    public ResImgPathAndPopCntDto selectImgPathAndPopCntAndPoint(Long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);

        return ResImgPathAndPopCntDto.of(member.getProfile(), member.getPopularity(), member.getPoint());


    }

    /**
     * 사용자의 인기도를 증가시키는 메소드
     *
     * @param memberNo 증가 시킬 사용자의 회원번호
     * @return 성공 여부
     */
    @Transactional
    public Boolean incrementPopularity(Long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        member.setPopularity(member.getPopularity() + 1);

        return true;
    }

    /**
     * 사용자의 인기도를 감소시키는 메소드
     *
     * @param memberNo 증가 시킬 사용자의 회원번호
     * @return 성공 여부
     */
    @Transactional
    public Boolean decrementPopularity(Long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        member.setPopularity(member.getPopularity() - 1);

        return true;
    }

    /**
     * 사용자의 포인트를 증가시키는 메소드
     *
     * @param memberNo 증가 시킬 사용자의 회원번호
     * @return 성공 여부
     */
    @Transactional
    public Boolean incrementPoint(Long memberNo, int point, UseDetail useDetail) {
        Member member = memberRepository.findByMemberNo(memberNo);

        if (member == null) {
            throw new IllegalArgumentException("Member not found with memberNo: " + memberNo);
        }

        member.setPoint(member.getPoint() + point);

        UsePointLog usePointLog = usePointLogRepository.findByUseDetail(useDetail);

        PointLog pointLog = PointLog.builder()
                                .useDate(Date.valueOf(LocalDateTime.now().toLocalDate()))
                                .usePoint(point)
                                .remainPoint(member.getPoint())
                                .member(member)
                                .usePointLog(usePointLog)
                                .build();

        if(pointLogRepository.save(pointLog)!=null) { return true; }

        return false;
    }

    /**
     * 사용자의 포인트를 감소시키는 메소드
     *
     * @param memberNo 증가 시킬 사용자의 회원번호
     * @return 성공 여부
     */
    @Transactional
    public Boolean decrementPoint(Long memberNo, int point, UseDetail useDetail) {
        Member member = memberRepository.findByMemberNo(memberNo);

        if (member == null) {
            throw new IllegalArgumentException("Member not found with memberNo: " + memberNo);
        }

        member.setPoint(member.getPoint() - point);

        UsePointLog usePointLog = usePointLogRepository.findByUseDetail(useDetail);

        PointLog pointLog = PointLog.builder()
                .useDate(Date.valueOf(LocalDateTime.now().toLocalDate()))
                .usePoint(point)
                .remainPoint(member.getPoint())
                .member(member)
                .usePointLog(usePointLog)
                .build();

        if(pointLogRepository.save(pointLog)!=null) { return true; }

        return false;
    }


    /**
     * 회원의 포인트 기록을 조회하는 메소드
     * @param memberNo 회원의 번호
     * @param pageable 페이지네이션 객체
     * @return 포인트 기록 리스트, max page
     */
    public ResPointLogDataDto selectPointLoglist(Long memberNo, Pageable pageable) {
        List<PointLog> list = pointLogRepository.findAllByMemberNo(memberNo, pageable).getContent();

        List<ResPointLogDto> pointLogEntity =  list.stream()
                .map(pointLog -> {
                    return ResPointLogDto.of(pointLog);
                })
                .collect(Collectors.toList());

        int count = pointLogRepository.findAllByMemberNo(memberNo, pageable).getTotalPages();

        return ResPointLogDataDto.of(count, pointLogEntity);
    }
}



