package com.jobmanagement.dto;

import com.jobmanagement.entity.Application;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {
    private Long applicationId;
    private Long userId;
    private Long companyId;
    private String companyName;
    private Long resumeId;
    private String resumeTitle;
    private Long coverLetterId;
    private String coverLetterTitle;
    private String status;
    private LocalDate appliedDate;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static ApplicationDto from(Application application) {
        return ApplicationDto.builder()
                .applicationId(application.getApplicationId())
                .userId(application.getUser().getUserId())
                .companyId(application.getCompany().getCompanyId())
                .companyName(application.getCompany().getName())
                .resumeId(application.getResume() != null ? application.getResume().getResumeId() : null)
                .resumeTitle(application.getResume() != null ? application.getResume().getTitle() : null)
                .coverLetterId(application.getCoverLetter() != null ? application.getCoverLetter().getCoverLetterId() : null)
                .coverLetterTitle(application.getCoverLetter() != null ? application.getCoverLetter().getTitle() : null)
                .status(application.getStatus().name())
                .appliedDate(application.getAppliedDate())
                .notes(application.getNotes())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }
}
