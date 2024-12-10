package com.gisadan.studyhub.etc;

import com.gisadan.studyhub.entity.Member;
import com.gisadan.studyhub.entity.UserDetailsImpl;
import com.gisadan.studyhub.entity.etc.MemberGrade;
import com.gisadan.studyhub.repository.MemberRepository;
import com.gisadan.studyhub.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class AuthorizationFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 쿠키에서 액세스 토큰과 리프레시 토큰을 가져오기
        String accessToken = null;
        String refreshToken = null;

        // 쿠키 배열을 가져옵니다
        Cookie[] cookies = request.getCookies();
        System.out.println("cookies: " + cookies);
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    accessToken = cookie.getValue(); // 액세스 토큰
                } else if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue(); // 리프레시 토큰
                }
            }
        }

        // 헤더 검증
        if (accessToken == null) {
            System.out.println("token null");
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰 소멸 시간 검증
        if (jwtUtil.isExpired(accessToken)) {
            System.out.println("access token expired");

            // 액세스 토큰이 만료되었고 리프레시 토큰이 있다면, 리프레시 토큰을 이용해 새로운 액세스 토큰 발급
            if (refreshToken != null) {

                // 리프레시 토큰 검증
                if (jwtUtil.isExpired(refreshToken)) {
                    System.out.println("refresh token expired");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }

                String memberId = jwtUtil.getUsername(refreshToken);
                long memberNo = jwtUtil.getMemeberNo(refreshToken);
                String nickName = jwtUtil.getNickName(refreshToken);

                // 정보를 어디서 가져올거냐
                String newAccessToken = jwtUtil.createAccessToken(memberId, memberNo, nickName, 60 * 60 * 1000L); // 새로운 액세스 토큰 생성

                // 새로운 액세스 토큰을 응답에 추가
                Cookie accessTokenCookie = new Cookie("accessToken", newAccessToken);
                accessTokenCookie.setPath("/");
                accessTokenCookie.setHttpOnly(true);
                accessTokenCookie.setMaxAge(60 * 60); // 1시간 동안 유효
                response.addCookie(accessTokenCookie);

                accessToken = newAccessToken; // 새로 발급된 액세스 토큰을 사용

                // 새로 발급한 access 토큰 검증
                memberId = jwtUtil.getUsername(accessToken);

                Member member = new Member();
                member.setMemberId(memberId);
                member.setGrade(MemberGrade.USER);

                UserDetailsImpl userDetailsImpl = new UserDetailsImpl(member);

                Authentication authToken = new UsernamePasswordAuthenticationToken(userDetailsImpl, null, userDetailsImpl.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);

                filterChain.doFilter(request, response);

                return;
            }

            // 리프레시 토큰이 없으면 401 Unauthorized 반환
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String memberId = jwtUtil.getUsername(accessToken);

        Member member = new Member();
        member.setMemberId(memberId);
        member.setGrade(MemberGrade.USER);

        UserDetailsImpl userDetailsImpl = new UserDetailsImpl(member);

        Authentication authToken = new UsernamePasswordAuthenticationToken(userDetailsImpl, null, userDetailsImpl.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
