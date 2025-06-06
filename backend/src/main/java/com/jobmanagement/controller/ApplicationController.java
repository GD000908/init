package com.jobmanagement.controller;

import com.jobmanagement.dto.ApplicationDto;
import com.jobmanagement.dto.ApplicationStatsDto;
import com.jobmanagement.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ApplicationController {
    
    private final ApplicationService applicationService;
    
    @GetMapping
    public ResponseEntity<List<ApplicationDto>> getApplicationsByUser(@RequestParam Long userId) {
        List<ApplicationDto> applications = applicationService.getApplicationsByUser(userId);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/{applicationId}")
    public ResponseEntity<ApplicationDto> getApplication(@PathVariable Long applicationId) {
        ApplicationDto application = applicationService.getApplication(applicationId);
        return ResponseEntity.ok(application);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<ApplicationStatsDto> getApplicationStats(@RequestParam Long userId) {
        ApplicationStatsDto stats = applicationService.getApplicationStats(userId);
        return ResponseEntity.ok(stats);
    }
    
    @PostMapping
    public ResponseEntity<ApplicationDto> createApplication(@RequestBody ApplicationDto applicationDto) {
        ApplicationDto createdApplication = applicationService.createApplication(applicationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdApplication);
    }
    
    @PutMapping("/{applicationId}")
    public ResponseEntity<ApplicationDto> updateApplication(@PathVariable Long applicationId, @RequestBody ApplicationDto applicationDto) {
        ApplicationDto updatedApplication = applicationService.updateApplication(applicationId, applicationDto);
        return ResponseEntity.ok(updatedApplication);
    }
    
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<ApplicationDto> updateApplicationStatus(
            @PathVariable Long applicationId, 
            @RequestParam String status) {
        ApplicationDto updatedApplication = applicationService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok(updatedApplication);
    }
    
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return ResponseEntity.noContent().build();
    }
}
