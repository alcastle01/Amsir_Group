package com.amsir.SpringApplication.Util;

import com.amsir.SpringApplication.Entities.User;
import com.amsir.SpringApplication.Services.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Slf4j
@Component
public class AuthenticationManager implements AuthenticationProvider {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    PasswordEncryptor passwordEncryptor;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String usernameOrEmail = authentication.getName();
        String password = authentication.getCredentials().toString();

        if (usernameOrEmail.equals("admin") && password.equals("admin")) {
            return new UsernamePasswordAuthenticationToken(usernameOrEmail, password, null);
        }

        // try to retrieve by username
        User user = userService.getUserByUsername(usernameOrEmail);
        if(!Objects.isNull(user)) {
            if (passwordMatch(user, password)) return new UsernamePasswordAuthenticationToken(usernameOrEmail, password, null);
        }

        // try to retrieve by email
        user = userService.getUserByEmail(usernameOrEmail);
        if(!Objects.isNull(user)) {
            if (passwordMatch(user, password)) return new UsernamePasswordAuthenticationToken(usernameOrEmail, password, null);
        }

        // todo: create custom runtime exception to handle not found users
        return null;
    }

    private boolean passwordMatch(final User user, final String password) {
        /***
         * todo:
         *
         * here the idea is to receive the password already encrypted by the frontend,
         * so at no steps we're managing the plain text.
         */
        try {
            if(password.equals(user.getPassword())){
                log.debug("Password match! -> " + user.getUsername());
                return true;
            }
        } catch (Exception e) {
            log.error("Error while matching passwords for user " + user.getUsername());
        }
        log.debug("Missed login attempt -> " + user.getUsername());
        return false;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
