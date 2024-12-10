package com.gisadan.studyhub.config;

import com.gisadan.studyhub.etc.AuthenticationFilter;
import com.gisadan.studyhub.etc.AuthorizationFilter;
import com.gisadan.studyhub.etc.JWTUtil;
import com.gisadan.studyhub.etc.LogoutFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationConfiguration configuration;
    private final JWTUtil jwtUtil;

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        // 회원가입, 비밀번호 찾기, 아이디 찾기
                        .requestMatchers("/member/signup/**").permitAll()
                        .requestMatchers("/member/idfind/**").permitAll()
                        .requestMatchers("/member/pwfind/**").permitAll()
                        // 스터디
                        .requestMatchers("/study/list").permitAll()
                        .requestMatchers("/study/list/search").permitAll()
                        .requestMatchers("/study/list/view").permitAll()
                        .requestMatchers("/study/reply").permitAll()
                        .requestMatchers("/study/reply/list").permitAll()
                        .requestMatchers("/study/reply/write").permitAll()
                        .requestMatchers("/study/reply/list/delete").permitAll()
                        .requestMatchers("/study/reply/list/").permitAll()
                        .requestMatchers("/study/studyJoin/exist").permitAll()
                        .requestMatchers("/study/studyJoin/accept").permitAll()
                        .requestMatchers("/study/studyJoin/refuse").permitAll()
                        .requestMatchers("/study/studyJoin/kick").permitAll()
                        .requestMatchers("/study/recommend").permitAll()
                        .requestMatchers("/study/recommend/unlogin").permitAll()
                        // 질문
                        .requestMatchers("/question/list").permitAll()
                        .requestMatchers("/question/bestQuestion").permitAll()
                        .requestMatchers("/question/list/search").permitAll()
                        // 장터
                        .requestMatchers("/trade/list").permitAll()
                        // 이미지 데이터 요청
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/api-docs/**").permitAll()
                        .anyRequest().authenticated())
                .logout(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .cors(withDefaults());

        // 기존 필터 추가
        http.addFilterBefore(new AuthorizationFilter(jwtUtil), AuthenticationFilter.class);
        http.addFilterAt(new AuthenticationFilter(authenticationManager(configuration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // 로그아웃 필터 추가
        http.addFilterBefore(new LogoutFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    protected AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {//2 - AuthenticationManager 등록
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}