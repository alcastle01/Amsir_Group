package com.amsir.SpringApplication.Util;

import com.amsir.SpringApplication.Entities.User;
import com.amsir.SpringApplication.Services.UserService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Objects;

@Component
public class JwtTokenProvider {

    @Value("${token.provider.value}")
    private String jwtSecret;

    @Value("${token.provider.expiration.value}")
    private int jwtExpirationTimeInMs;

    public String generateToken(Authentication authentication, UserService userService) {
        if (Objects.isNull(authentication)) return "";

        String username = authentication.getPrincipal().toString();

        // todo: figure out if we need to do something with UserService or if we don't need that
        // userService.getUserByUsername(username);


        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationTimeInMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
