package com.amsir.SpringApplication.Controller;

import com.amsir.SpringApplication.Dto.UserDto;
import com.amsir.SpringApplication.Entities.User;
import com.amsir.SpringApplication.Services.UserService;
import com.amsir.SpringApplication.Services.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    @Autowired
    private final UserService userService = new UserServiceImpl();

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = this.userService.getAllUsers();

            if (!users.isEmpty()) return new ResponseEntity<>(users, HttpStatus.OK);

            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") final String id) {
        try {
            User user = this.userService.getUserById(Integer.valueOf(id));

            if(Objects.isNull(user)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createUser(@RequestBody UserDto userDto) {
        //todo: apply validations

        //todo: handle error output for an already existing user

        try {
            User user = new User(userDto);
            this.userService.createUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            log.warn(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable("id") final Integer id, @RequestBody UserDto userDto) {
        try {
            User storedUser = userService.getUserById(id);

            if (Objects.isNull(storedUser)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            Map<String, String> changes = findModelDifferenceWith(userDto, storedUser);

            if (!changes.isEmpty()) {
                userService.updateUser(changes, id);
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Exception thrown while updating user -> " + e);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") final Integer id) {
        try {
            this.userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private static Map<String, String> findModelDifferenceWith(UserDto newUser, User previouslyStoredUser) {
        Map<String, String> changes = new HashMap<>();

        if (!previouslyStoredUser.getUsername().equals(newUser.getUsername())
                && !newUser.getUsername().isEmpty()) {
            changes.put("username", newUser.getUsername());
        }
        if (!previouslyStoredUser.getEmail().equals(newUser.getEmail())
                && !newUser.getEmail().isEmpty()) {
            changes.put("email", newUser.getEmail());
        }
        if (!previouslyStoredUser.getPassword().equals(newUser.getPassword())
                && !Objects.isNull(newUser.getPassword())
                && !newUser.getPassword().isEmpty()) {
            changes.put("password", newUser.getPassword());
        }
        return changes;
    }
}
