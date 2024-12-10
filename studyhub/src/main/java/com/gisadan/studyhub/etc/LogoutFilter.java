package com.gisadan.studyhub.etc;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class LogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
    }

    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // 경로 및 method 체크
        String requestUri = request.getRequestURI();
        if (!requestUri.equals("/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = null;
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    accessToken = cookie.getValue();
                }

                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (accessToken == null && refreshToken == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try {
            jwtUtil.isExpired(accessToken);

        } catch (ExpiredJwtException e) {

            try {
                jwtUtil.isExpired(refreshToken);
            } catch (ExpiredJwtException ex) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            } catch (JwtException ex) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
        } catch (JwtException e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        // 쿠키 삭제
        Cookie accessCookie = new Cookie("accessToken", null);
        Cookie refreshCookie = new Cookie("refreshToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
