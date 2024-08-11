package com.sdp.taskandtimemanager.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.taskandtimemanager.auth.ProjectsRequest;
import com.sdp.taskandtimemanager.model.Projects;
import com.sdp.taskandtimemanager.model.Users;
import com.sdp.taskandtimemanager.service.ProjectsService;
import com.sdp.taskandtimemanager.service.UsersService;

@RestController
@RequestMapping("/projects")
public class ProjectsController {
    @Autowired
    private ProjectsService service;
    @Autowired
    private UsersService usersService;

    @GetMapping("/findAll")
    public List<Projects> findAll() {
        return service.findAllProjects();
    }

    @GetMapping("/findById/{projectId}")
    public Projects findById(@PathVariable Long projectId) {
        return service.findProjectById(projectId);
    }

    // @PostMapping("/add")
    // public String add(@RequestBody Projects project) {
    // return service.addProject(project);
    // }

    // add project with ProjectRequest
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ProjectsRequest projectRequest) {
        try {
            // Fetch the Users object based on the manager ID
            Users manager = usersService.findUserById(projectRequest.getManagerId());
            if (manager == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Manager not found");
            }

            // Create and set up the Projects object
            Projects project = new Projects();
            project.setProjectname(projectRequest.getProjectname());
            project.setProjectdescription(projectRequest.getProjectdescription());
            project.setDuedate(projectRequest.getDuedate());
            project.setManager(manager);

            // Save the Projects object
            Projects savedProject = service.addProject(project);
            return ResponseEntity.ok(savedProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update/{projectId}")
    public Projects update(@PathVariable Long projectId, @RequestBody Projects project) {
        return service.updateProject(projectId, project);
    }

    @PatchMapping("/updateSpecific/{projectId}")
    public Projects patch(@PathVariable Long projectId, @RequestBody Projects project) {
        return service.patchProject(projectId, project);
    }

    @DeleteMapping("delete/{projectId}")
    public void delete(@PathVariable Long projectId) {
        service.deleteProject(projectId);
    }

}
