package com.jobmanagement.dto;

import com.jobmanagement.entity.Resume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeDto {
    private Long resumeId;
    private Long userId;
    private String title;
    private Boolean isPrimary;
    private String jobCategory;
    private String targetCompanyType;
    private String targetLocation;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static ResumeDto from(Resume resume) {
        return ResumeDto.builder()
                .resumeId(resume.getResumeId())
                .userId(resume.getUser().getUserId())
                .title(resume.getTitle())
                .isPrimary(resume.getIsPrimary())
                .jobCategory(resume.getJobCategory())
                .targetCompanyType(resume.getTargetCompanyType())
                .targetLocation(resume.getTargetLocation())
                .isPublic(resume.getIsPublic())
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}
