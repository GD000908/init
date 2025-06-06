package com.jobmanagement.controller;

import com.jobmanagement.dto.ResumeDto;
import com.jobmanagement.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ResumeController {
    
    private final ResumeService resumeService;
    
    @GetMapping
    public ResponseEntity<List<ResumeDto>> getResumesByUser(@RequestParam Long userId) {
        List<ResumeDto> resumes = resumeService.getResumesByUser(userId);
        return ResponseEntity.ok(resumes);
    }
    
    @GetMapping("/{resumeId}")
    public ResponseEntity<ResumeDto> getResume(@PathVariable Long resumeId) {
        ResumeDto resume = resumeService.getResume(resumeId);
        return ResponseEntity.ok(resume);
    }
    
    @PostMapping
    public ResponseEntity<ResumeDto> createResume(@RequestBody ResumeDto resumeDto) {
        ResumeDto createdResume = resumeService.createResume(resumeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdResume);
    }
    
    @PutMapping("/{resumeId}")
    public ResponseEntity<ResumeDto> updateResume(@PathVariable Long resumeId, @RequestBody ResumeDto resumeDto) {
        ResumeDto updatedResume = resumeService.updateResume(resumeId, resumeDto);
        return ResponseEntity.ok(updatedResume);
    }
    
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long resumeId) {
        resumeService.deleteResume(resumeId);
        return ResponseEntity.noContent().build();
    }
}
