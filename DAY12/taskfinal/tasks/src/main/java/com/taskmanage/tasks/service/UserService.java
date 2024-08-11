package com.taskmanage.tasks.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanage.tasks.model.User;
import com.taskmanage.tasks.repo.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(Long userId, User userDetails) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setUserName(userDetails.getUserName());
        user.setEmailId(userDetails.getEmailId());
        user.setPassword(userDetails.getPassword());
        user.setDateOfBirth(userDetails.getDateOfBirth());
        user.setRole(userDetails.getRole());
        return userRepository.save(user);
    }

    public User patchUser(Long userId, Map<String, Object> updates) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        updates.forEach((key, value) -> {
            switch (key) {
                case "userName":
                    user.setUserName((String) value);
                    break;
                case "emailId":
                    user.setEmailId((String) value);
                    break;
                case "password":
                    user.setPassword((String) value);
                    break;
                case "dateOfBirth":
                    user.setDateOfBirth(LocalDate.parse((String) value));
                    break;
                case "role":
                    user.setRole((String) value);
                    break;
            }
        });

        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public boolean verifyLogin(String emailId, String password) {
        Optional<User> optionalUser = userRepository.findByEmailId(emailId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getPassword().equals(password);
        }
        return false;
    }
}
