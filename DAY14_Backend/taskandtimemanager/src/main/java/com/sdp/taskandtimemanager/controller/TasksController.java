package com.sdp.taskandtimemanager.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.taskandtimemanager.model.Tasks;
import com.sdp.taskandtimemanager.service.TasksService;

@RestController
@RequestMapping("/tasks")
public class TasksController {
    @Autowired
    private TasksService service;

    @GetMapping("/findAll")
    public List<Tasks> findAll() {
        return service.findAllTasks();
    }

    @GetMapping("/findById/{taskId}")
    public Tasks findById(@PathVariable Long taskId) {
        return service.findTaskById(taskId);
    }

    @PostMapping("/add")
    public String add(@RequestBody Tasks task) {
        return service.addTask(task);
    }

    @PutMapping("/update/{taskId}")
    public Tasks update(@PathVariable Long taskId, @RequestBody Tasks task) {
        return service.updateTask(taskId, task);
    }

    @PatchMapping("/updateSpecific/{taskId}")
    public Tasks patch(@PathVariable Long taskId, @RequestBody Tasks task) {
        return service.patchTask(taskId, task);
    }

    @DeleteMapping("delete/{taskId}")
    public void delete(@PathVariable Long taskId) {
        service.deleteTask(taskId);
    }

}
