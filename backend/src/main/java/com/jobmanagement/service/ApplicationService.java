package com.jobmanagement.service;

import com.jobmanagement.dto.ApplicationDto;
import com.jobmanagement.dto.ApplicationStatsDto;
import com.jobmanagement.entity.*;
import com.jobmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final ResumeRepository resumeRepository;
    private final CoverLetterRepository coverLetterRepository;
    
    public List<ApplicationDto> getApplicationsByUser(Long userId) {
        List<Application> applications = applicationRepository.findByUserUserIdOrderByAppliedDateDesc(userId);
        return applications.stream()
                .map(ApplicationDto::from)
                .collect(Collectors.toList());
    }
    
    public ApplicationDto getApplication(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("지원 내역을 찾을 수 없습니다."));
        return ApplicationDto.from(application);
    }
    
    public ApplicationStatsDto getApplicationStats(Long userId) {
        Long total = applicationRepository.countByUserId(userId);
        Long applied = applicationRepository.countByUserIdAndStatus(userId, Application.ApplicationStatus.APPLIED);
        Long documentPass = applicationRepository.countByUserIdAndStatus(userId, Application.ApplicationStatus.DOCUMENT_PASS);
        Long finalPass = applicationRepository.countByUserIdAndStatus(userId, Application.ApplicationStatus.FINAL_PASS);
        Long rejected = applicationRepository.countByUserIdAndStatus(userId, Application.ApplicationStatus.REJECTED);
        
        return ApplicationStatsDto.builder()
                .totalApplications(total != null ? total : 0L)
                .appliedCount(applied != null ? applied : 0L)
                .documentPassCount(documentPass != null ? documentPass : 0L)
                .finalPassCount(finalPass != null ? finalPass : 0L)
                .rejectedCount(rejected != null ? rejected : 0L)
                .build();
    }
    
    @Transactional
    public ApplicationDto createApplication(ApplicationDto applicationDto) {
        User user = userRepository.findById(applicationDto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        
        Company company = companyRepository.findById(applicationDto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("회사를 찾을 수 없습니다."));
        
        Application.ApplicationBuilder builder = Application.builder()
                .user(user)
                .company(company)
                .appliedDate(applicationDto.getAppliedDate())
                .notes(applicationDto.getNotes());
        
        // 이력서 설정
        if (applicationDto.getResumeId() != null) {
            Resume resume = resumeRepository.findById(applicationDto.getResumeId())
                    .orElseThrow(() -> new RuntimeException("이력서를 찾을 수 없습니다."));
            builder.resume(resume);
        }
        
        // 자기소개서 설정
        if (applicationDto.getCoverLetterId() != null) {
            CoverLetter coverLetter = coverLetterRepository.findById(applicationDto.getCoverLetterId())
                    .orElseThrow(() -> new RuntimeException("자기소개서를 찾을 수 없습니다."));
            builder.coverLetter(coverLetter);
        }
        
        // 상태 설정
        if (applicationDto.getStatus() != null) {
            try {
                builder.status(Application.ApplicationStatus.valueOf(applicationDto.getStatus()));
            } catch (IllegalArgumentException e) {
                builder.status(Application.ApplicationStatus.APPLIED);
            }
        } else {
            builder.status(Application.ApplicationStatus.APPLIED);
        }
        
        Application savedApplication = applicationRepository.save(builder.build());
        return ApplicationDto.from(savedApplication);
    }
    
    @Transactional
    public ApplicationDto updateApplication(Long applicationId, ApplicationDto applicationDto) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("지원 내역을 찾을 수 없습니다."));
        
        if (applicationDto.getAppliedDate() != null) {
            application.setAppliedDate(applicationDto.getAppliedDate());
        }
        if (applicationDto.getNotes() != null) {
            application.setNotes(applicationDto.getNotes());
        }
        if (applicationDto.getStatus() != null) {
            try {
                application.setStatus(Application.ApplicationStatus.valueOf(applicationDto.getStatus()));
            } catch (IllegalArgumentException e) {
                // 유효하지 않은 상태는 무시
            }
        }
        
        Application savedApplication = applicationRepository.save(application);
        return ApplicationDto.from(savedApplication);
    }
    
    @Transactional
    public ApplicationDto updateApplicationStatus(Long applicationId, String status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("지원 내역을 찾을 수 없습니다."));
        
        try {
            application.setStatus(Application.ApplicationStatus.valueOf(status));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("유효하지 않은 상태값입니다: " + status);
        }
        
        Application savedApplication = applicationRepository.save(application);
        return ApplicationDto.from(savedApplication);
    }
    
    @Transactional
    public void deleteApplication(Long applicationId) {
        if (!applicationRepository.existsById(applicationId)) {
            throw new RuntimeException("지원 내역을 찾을 수 없습니다.");
        }
        applicationRepository.deleteById(applicationId);
    }
}
