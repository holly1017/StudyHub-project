package com.gisadan.studyhub.service;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.UserDetailsImpl;
import com.gisadan.studyhub.entity.etc.Status;
import com.gisadan.studyhub.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    /**
     * 사용자 인증을 위한 메소드
     * @param memberId DB에서 조회할 회원의 아이디
     * @return UserDetails 객체 - 인증에 필요한 회원 정보
     * @throws UsernameNotFoundException 사용자가 존재하지 않을 경우 발생할 예외
     */
    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemberIdAndStatus(memberId, Status.YES);
        if(member == null) {
            throw new RuntimeException("User not found");
        }
        return new UserDetailsImpl(member);
    }
}
