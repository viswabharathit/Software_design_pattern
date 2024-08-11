package com.sdp.taskandtimemanager.auth;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProjectsRequest {
    private String projectname;
    private String projectdescription;
    private LocalDate duedate;
    private Long managerId;

    // Getters and setters
}
