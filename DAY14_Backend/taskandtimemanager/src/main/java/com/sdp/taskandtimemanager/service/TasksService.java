package com.sdp.taskandtimemanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdp.taskandtimemanager.model.Projects;
import com.sdp.taskandtimemanager.model.Tasks;
import com.sdp.taskandtimemanager.model.Users;
import com.sdp.taskandtimemanager.repo.ProjectsRepo;
import com.sdp.taskandtimemanager.repo.TasksRepo;
import com.sdp.taskandtimemanager.repo.UsersRepo;

@Service
public class TasksService {

    @Autowired
    private TasksRepo repo;
    @Autowired
    private ProjectsRepo prepo;
    @Autowired
    private UsersRepo urepo;

    public List<Tasks> findAllTasks() {
        return repo.findAll();
    }

    public Tasks findTaskById(Long taskId) {
        return repo.findById(taskId).orElse(null);
    }

    public String addTask(Tasks task) {
        Projects project = prepo.findById(task.getProject().getProjectid()).orElse(null);
        Users user = urepo.findById(task.getMember().getUserid()).orElse(null);
        if (project == null) {
            return "Project error";
        }
        if (user == null) {
            return "User error";
        }
        task.setProject(project);
        task.setMember(user);
        repo.save(task);
        return "Task added ";
    }

    public Tasks updateTask(Long taskId, Tasks task) {
        Optional<Tasks> optionalTasks = repo.findById(taskId);
        if (optionalTasks.isPresent()) {
            Tasks existingTask = optionalTasks.get();
            existingTask.setTaskname(task.getTaskname());
            existingTask.setTaskdescription(task.getTaskdescription());
            existingTask.setTaskstatus(task.getTaskstatus());
            existingTask.setDuedate(task.getDuedate());
            existingTask.setProject(task.getProject());
            existingTask.setTaskpriority(task.getTaskpriority());
            existingTask.setMember(task.getMember());
            existingTask.setAssignedstatus(task.getAssignedstatus());
            return repo.save(existingTask);
        }
        return task;
    }

    public Tasks patchTask(Long taskId, Tasks task) {
        Optional<Tasks> optionalTask = repo.findById(taskId);
        if (optionalTask.isPresent()) {
            Tasks existingTask = optionalTask.get();

            if (task.getTaskname() != null) {
                existingTask.setTaskname(task.getTaskname());
            }

            if (task.getTaskdescription() != null) {
                existingTask.setTaskdescription(task.getTaskdescription());
            }

            if (task.getDuedate() != null) {
                existingTask.setDuedate(task.getDuedate());
            }

            if (task.getTaskstatus() != null) {
                existingTask.setTaskstatus(task.getTaskstatus());
            }

            if (task.getTaskpriority() != null) {
                existingTask.setTaskpriority(task.getTaskpriority());
            }

            if (task.getMember() != null) {
                existingTask.setMember(task.getMember());
            }

            if (task.getProject() != null) {
                existingTask.setProject(task.getProject());
            }

            if (task.getAssignedstatus() != null) {
                existingTask.setAssignedstatus(task.getAssignedstatus());
            }
            return repo.save(existingTask);
        }
        return task;
    }

    public void deleteTask(Long taskId) {
        repo.deleteById(taskId);
    }

}
