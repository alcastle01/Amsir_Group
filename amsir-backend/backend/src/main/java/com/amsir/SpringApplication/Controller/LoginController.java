package com.amsir.SpringApplication.Controller;

import com.amsir.SpringApplication.Dto.LoginRequestDto;
import com.amsir.SpringApplication.Services.UserService;
import com.amsir.SpringApplication.Services.UserServiceImpl;
import com.amsir.SpringApplication.Util.AuthenticationManager;
import com.amsir.SpringApplication.Util.JwtAuthenticationResponse;
import com.amsir.SpringApplication.Util.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/api")
@Slf4j
public class LoginController {
    @Autowired
    private final UserService userService = new UserServiceImpl();

    @Autowired
    private final AuthenticationManager authManager = new AuthenticationManager();

    @Autowired
    private final JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequest) {
        log.info("Login attempt for -> " + loginRequest.usernameOrEmail + " -> " + loginRequest.password);
        // todo: update "?" type with JwtAuthenticationResponse
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.usernameOrEmail, loginRequest.password));

        if (Objects.isNull(authentication)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        String jwt = jwtTokenProvider.generateToken(authentication, userService);

        if (jwt.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new JwtAuthenticationResponse(jwt), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
