package com.amsir.SpringApplication.Services;

import com.amsir.SpringApplication.Entities.User;
import com.amsir.SpringApplication.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(final Integer id) {
        return userRepository.getByIntegerId(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.getByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    @Override
    public void createUser(User user) {
        userRepository.saveAndFlush(user);
    }

    @Override
    @Transactional
    public void updateUser(final Map<String, ?> changes, final Integer id) {
        User storedUser = userRepository.getByIntegerId(id);
        log.debug("Detected changes to be saved in the user -> " + changes.keySet().toString());
        changes.keySet().forEach(key -> {
            switch (key) {
                case "username":
                    storedUser.setUsername(String.valueOf(changes.get(key)));
                case "password":
                    storedUser.setPassword(String.valueOf(changes.get(key)));
                case "email":
                    storedUser.setEmail(String.valueOf(changes.get(key)));
                default:
                    // todo: maybe throw an exception to ask the client to remove unknown values
                    break;
            }
        });
        userRepository.saveAndFlush(storedUser);
    }

    @Transactional
    @Override
    public void deleteUser(Integer userId) {
        try {
            final User user = userRepository.getByIntegerId(userId);

            userRepository.deleteUserById(user.getId());
            userRepository.flush();
        } catch (Exception e) {
            log.error("Exception while deleting user -> "+e.getMessage());
        }
    }
}
