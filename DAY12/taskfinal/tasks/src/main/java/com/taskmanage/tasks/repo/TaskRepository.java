package com.taskmanage.tasks.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanage.tasks.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}