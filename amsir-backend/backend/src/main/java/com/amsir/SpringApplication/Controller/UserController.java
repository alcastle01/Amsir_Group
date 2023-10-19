package com.amsir.SpringApplication.Controller;

import com.amsir.SpringApplication.Dto.LoginRequestDto;
import com.amsir.SpringApplication.Dto.UserDto;
import com.amsir.SpringApplication.Entities.User;
import com.amsir.SpringApplication.Services.UserService;
import com.amsir.SpringApplication.Util.AuthenticationManager;
import com.amsir.SpringApplication.Util.JwtAuthenticationResponse;
import com.amsir.SpringApplication.Util.JwtTokenProvider;
import com.amsir.SpringApplication.Util.PasswordEncryptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncryptor passwordEncryptor;

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = this.userService.getAllUsers();

            if (!users.isEmpty()) return new ResponseEntity<>(users, HttpStatus.OK);

            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") final String id) {
        try {
            User user = this.userService.getUserById(Integer.valueOf(id));

            if(Objects.isNull(user)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.usernameOrEmail, loginRequest.password));

        String jwt = jwtTokenProvider.generateToken(authentication, userService);

        if (jwt.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new JwtAuthenticationResponse(jwt), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> createUser(@RequestBody UserDto userDto) {
        // validations
        if (userDto.username.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if (userDto.email.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if (userDto.password.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // hash pwd
        try {
            userDto.password = passwordEncryptor.encryptPassword(userDto.password);
            // create Models (Entities)
            User user = new User(userDto);

            // store in DB
            this.userService.createUser(user);

            // return response to client
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            log.warn(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/user/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable("id") final Integer id, @RequestBody UserDto userDto) {
        try {
            User storedUser = userService.getUserById(id);

            if (Objects.isNull(storedUser)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            Map<String, String> changes = new HashMap<>();

            if (!storedUser.getUsername().equals(userDto.getUsername())
                    && !userDto.getUsername().isEmpty()) {
                changes.put("username", userDto.getUsername());
            }
            if (!storedUser.getEmail().equals(userDto.getEmail())
                    && !userDto.getEmail().isEmpty()) {
                changes.put("email", userDto.getEmail());
            }
            if (!storedUser.getPassword().equals(userDto.getPassword())
                    && !Objects.isNull(userDto.getPassword())
                    && !userDto.getPassword().isEmpty()) {
                changes.put("password", userDto.getPassword());
            }

            if (!changes.isEmpty()) {
                userService.updateUser(changes, id);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Exception thrown while updating user -> " + e.toString());
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") final Integer id) {
        try {
            this.userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
