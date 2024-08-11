package com.sdp.taskandtimemanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdp.taskandtimemanager.model.Projects;
// import com.sdp.taskandtimemanager.model.Tasks;
import com.sdp.taskandtimemanager.model.Users;
import com.sdp.taskandtimemanager.repo.ProjectsRepo;
import com.sdp.taskandtimemanager.repo.UsersRepo;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepo repo;

    @Autowired
    private UsersRepo urepo;

    public List<Projects> findAllProjects() {
        return repo.findAll();
    }

    public Projects findProjectById(Long projectId) {
        return repo.findById(projectId).orElse(null);
    }

    // add project
    public Projects addProject(Projects project) {
        Users user = urepo.findById(project.getManager().getUserid()).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        project.setManager(user);
        return repo.save(project);
    }

    public Projects updateProject(Long projectId, Projects project) {

        Optional<Projects> optionalProjects = repo.findById(projectId);
        if (optionalProjects.isPresent()) {
            Projects existingProjects = optionalProjects.get();
            existingProjects.setProjectname(project.getProjectname());
            existingProjects.setProjectdescription(project.getProjectdescription());
            existingProjects.setDuedate(project.getDuedate());
            existingProjects.setManager(project.getManager());
            return repo.save(existingProjects);
        }
        return project;
    }

    public void deleteProject(Long projectId) {
        repo.deleteById(projectId);
    }

    public Projects patchProject(Long projectId, Projects project) {
        Optional<Projects> optionalProjects = repo.findById(projectId);
        if (optionalProjects.isPresent()) {
            Projects existingProject = optionalProjects.get();

            if (project.getProjectname() != null) {
                existingProject.setProjectname(project.getProjectname());
            }

            if (project.getProjectdescription() != null) {
                existingProject.setProjectdescription(project.getProjectdescription());
            }

            if (project.getDuedate() != null) {
                existingProject.setDuedate((project.getDuedate()));
            }

            if (project.getManager() != null) {
                existingProject.setManager(project.getManager());
            }

            return repo.save(existingProject);
        }
        return project;

    }
}
