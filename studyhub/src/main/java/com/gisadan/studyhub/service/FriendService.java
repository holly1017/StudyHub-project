package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.Friend;
import com.gisadan.studyhub.entity.etc.FriendStatus;
import com.gisadan.studyhub.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;

//    /**
//     * 친구 요청 여부 조회 메소드
//     * @param memberNo 로그인한 회원의 번호
//     * @param friendNo 친구 요청 여부를 확인할 회원의 번호
//     * @return 요청 여부
//     */
//    public boolean hasSentRequest(Long memberNo, Long friendNo) {
//        return friendRepository.existsByMemberNoAndFriendAndStatus(memberNo, friendNo, FriendStatus.WAITING) ||
//                friendRepository.existsByMemberNoAndFriendAndStatus(memberNo, friendNo, FriendStatus.ACCEPTED);
//    }

    /**
     * 친구 요청을 보내는 메소드
     * @param friendRequest 친구요청을 보낼 Friend 객체
     * @return 요청 여부
     */
    public boolean sentFriendRequest(Friend friendRequest) {
        if(friendRepository.save(friendRequest)!=null) { return true; }
        return false;
    }

    /**
     * 회원의 친구 리스트 조회
     * @param memberNo
     * @return 조회된 친구 리스트
     */
    public List<Friend> selectFriendList(Long memberNo) {
        return friendRepository.findByFriendNoOrMemberNoAndStatus(memberNo, FriendStatus.ACCEPTED);
    }

    /**
     * 요청 대기 친구 리스트 조회 메소드
     * @param memberNo 조회할 회원의 번호
     * @return 조회된 친구 리스트
     */
    public List<Friend> selectWaitingFriendList(Long memberNo) {
        return friendRepository.findByMemberNoAndStatus(memberNo, FriendStatus.WAITING);
    }

    /**
     * 회원의 친구를 삭제하기 위해 친구 데이터를 조회할 메소드
     * @param memberNo 회원 번호 
     * @param friendNo 친구 회원 번호
     * @return 친구 관계 데이터
     */
    public Friend myFriendList(Long memberNo, Long friendNo) {
        return friendRepository.findByFriendNoAndMemberNo(memberNo, friendNo);
    }

    /**
     * 친구를 삭제할 메소드
     * @param friend 삭제할 친구 객체
     * @return 성공 여부
     */
    public Boolean deleteFriend(Friend friend) {
        friendRepository.delete(friend);
        return true;
    }
}
