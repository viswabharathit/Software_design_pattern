package com.taskmanage.tasks.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.taskmanage.tasks.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailId(String emailId);
}
