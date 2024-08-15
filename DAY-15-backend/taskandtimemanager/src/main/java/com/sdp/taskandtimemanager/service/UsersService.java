package com.sdp.taskandtimemanager.service;

import java.util.List;
import java.util.Optional;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sdp.taskandtimemanager.auth.LoginRequest;
import com.sdp.taskandtimemanager.auth.RegisterRequest;
import com.sdp.taskandtimemanager.config.JwtToken;
import com.sdp.taskandtimemanager.model.Token;
import com.sdp.taskandtimemanager.model.Users;
import com.sdp.taskandtimemanager.repo.JwtRepo;
import com.sdp.taskandtimemanager.repo.UsersRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class UsersService implements AuthService {

    @Autowired
    private UsersRepo repo;
    private final JwtRepo tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtToken jwtUtil;

    @Autowired
    private BCryptPasswordEncoder bpasswordEncoder;

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername(); // Assuming username is the email

            // Retrieve the user entity from the repository
            Users user = repo.findUserByEmail(username); // Adjust if you're using a different identifier
            if (user != null) {
                return user.getUserid(); // Return the user ID
            }
            throw new IllegalStateException("User not found");
        }
        throw new IllegalStateException("No authenticated user found");
    }

    public List<Users> findAllUsers() {
        return repo.findAll();
    }

    public Users findUserById(Long userId) {
        return repo.findById(userId).orElse(null);
    }

    public Long findByEmail(String email) {
        Users user = repo.findUserByEmail(email);
        Long userid = user.getUserid();
        return userid;
    }

    public String register(RegisterRequest registerRequest) {
        Optional<Users> userExist = repo.findByEmail(registerRequest.getEmail());
        if (userExist.isPresent()) {
            return "User already exists with email id " + registerRequest.getEmail();
        }
        var user = Users.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .contact(registerRequest.getContact())
                // .dob(registerRequest.getDob())
                .role(Users.Role.TEAMMEMBER)
                .build();
        repo.save(user);
        return "Team Member registered successfully";
    }

    public String registerManager(RegisterRequest registerRequest) {
        Optional<Users> userExist = repo.findByEmail(registerRequest.getEmail());
        if (userExist.isPresent()) {
            return "User already exists with email id " + registerRequest.getEmail();
        }
        var user = Users.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .contact(registerRequest.getContact())
                // .dob(registerRequest.getDob())
                .role(Users.Role.PROJECTMANAGER)
                .build();
        repo.save(user);
        return "Project Manager registered successfully";
    }

    public String login(LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }

        var user = repo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().toString());

        String accessToken = jwtUtil.generateToken(extraClaims, user);

        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        return accessToken;
    }

    public Users updateUser(Long userId, Users user) {
        Optional<Users> optionalUser = repo.findById(userId);
        if (optionalUser.isPresent()) {
            Users existingUser = optionalUser.get();
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existingUser.setPassword(bpasswordEncoder.encode(user.getPassword()));
            }
            existingUser.setContact(user.getContact());
            // existingUser.setDob(user.getDob());
            return repo.save(existingUser);
        }
        return null; // Consider returning null or throwing an exception if user not found
    }

    public Users patchUser(Long userId, Users user) {
        Optional<Users> optionalUser = repo.findById(userId);
        if (optionalUser.isPresent()) {
            Users existingUsers = optionalUser.get();
            if (user.getName() != null) {
                existingUsers.setName(user.getName());
            }
            if (user.getEmail() != null) {
                existingUsers.setEmail(user.getEmail());
            }
            if (user.getPassword() != null) {
                existingUsers.setPassword(user.getPassword());
            }
            // if (user.getDob() != null) {
            // existingUsers.setDob(user.getDob());
            // }
            if (user.getRole() != null) {
                existingUsers.setRole(user.getRole());
            }
            if (user.getContact() != null) {
                existingUsers.setContact(user.getContact());
            }
            return repo.save(existingUsers);
        }
        return user;
    }

    public void deleteUser(Long userId) {
        repo.deleteById(userId);
    }

    private void saveUserToken(Users user, String accessToken) {
        var token = Token.builder().user(user).token(accessToken).expired(false).revoked(false).build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Users user) {
        var validUserTokens = tokenRepository.findAllByUser_useridAndExpiredFalseAndRevokedFalse(user.getUserid());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public String createAdmin() {
        Optional<Users> userExist = repo.findByEmail("admin@gmail.com");
        if (userExist.isPresent()) {
            return "Admin already exists";
        }

        var user = Users.builder()
                .name("Admin")
                .email("admin@gmail.com")
                .password(passwordEncoder.encode("Admin@123"))
                .contact("1234567890")
                .role(Users.Role.ADMIN)
                .build();
        repo.save(user);
        return "Admin registered successfully.";
    }

}