package com.gisadan.studyhub.etc;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {

    private Key key;

    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        byte[] byteSecretKey = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(byteSecretKey);
    }

    public String getUsername(String token) {

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("memberId", String.class);
    }

    public long getMemeberNo(String token) {

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("memberNo", Integer.class);
    }

    public String getNickName(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("nickName", String.class);
    }

    public Boolean isExpired(String token) {
        try {
            Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration();
            System.out.println("Token expiration: " + expiration);
            return expiration.before(new Date());
        } catch (ExpiredJwtException e) {
            System.out.println("Token has expired: " + e.getMessage());
            return true; // 만료된 토큰은 true 반환
        } catch (Exception e) {
            System.out.println("Error parsing token: " + e.getMessage());
            return true; // 다른 예외가 발생하면 true 반환 (예를 들어 토큰이 잘못된 경우)
        }
    }


    public String createAccessToken(String memberId, long memberNo, String nickName, Long expiredMs) {

        Claims claims = Jwts.claims();
        claims.put("memberId", memberId);
        claims.put("memberNo", memberNo);
        claims.put("nickName", nickName);

        long now = System.currentTimeMillis();
        Date issuedAt = new Date(now);
        Date expiration = new Date(now + expiredMs);

        System.out.println("Access Token Issued at: " + issuedAt);
        System.out.println("Access Token Expiration at: " + expiration);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String memberId, long memberNo, String nickName, Long expiredMs) {

        Claims claims = Jwts.claims();
        claims.put("memberId", memberId);
        claims.put("memberNo", memberNo);
        claims.put("nickName", nickName);

        long now = System.currentTimeMillis();
        Date issuedAt = new Date(now);
        Date expiration = new Date(now + expiredMs);

        System.out.println("Refresh Token Issued at: " + issuedAt);
        System.out.println("Refresh Token Expiration at: " + expiration);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

}



