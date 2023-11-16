package com.amsir.SpringApplication.Services;

import com.amsir.SpringApplication.Entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {
    List<User> getAllUsers();

    User getUserById(final Integer id);

    User getUserByUsername(final String username);

    User getUserByEmail(final String email);

    void createUser(final User user);

    void updateUser(final Map<String, ?> changes, final Integer id);

    void deleteUser(final Integer userId);
}
