package com.jobmanagement.service;

import com.jobmanagement.dto.ResumeDto;
import com.jobmanagement.entity.Resume;
import com.jobmanagement.entity.User;
import com.jobmanagement.repository.ResumeRepository;
import com.jobmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeService {
    
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    
    public List<ResumeDto> getResumesByUser(Long userId) {
        List<Resume> resumes = resumeRepository.findByUserUserId(userId);
        return resumes.stream()
                .map(ResumeDto::from)
                .collect(Collectors.toList());
    }
    
    public ResumeDto getResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("이력서를 찾을 수 없습니다."));
        return ResumeDto.from(resume);
    }
    
    @Transactional
    public ResumeDto createResume(ResumeDto resumeDto) {
        User user = userRepository.findById(resumeDto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        
        Resume resume = Resume.builder()
                .user(user)
                .title(resumeDto.getTitle())
                .isPrimary(resumeDto.getIsPrimary() != null ? resumeDto.getIsPrimary() : false)
                .jobCategory(resumeDto.getJobCategory())
                .targetCompanyType(resumeDto.getTargetCompanyType())
                .targetLocation(resumeDto.getTargetLocation())
                .isPublic(resumeDto.getIsPublic() != null ? resumeDto.getIsPublic() : false)
                .build();
        
        // 만약 primary로 설정한다면 기존 primary 해제
        if (resume.getIsPrimary()) {
            resumeRepository.findByUserUserIdAndIsPrimaryTrue(user.getUserId())
                    .ifPresent(existing -> {
                        existing.setIsPrimary(false);
                        resumeRepository.save(existing);
                    });
        }
        
        Resume savedResume = resumeRepository.save(resume);
        return ResumeDto.from(savedResume);
    }
    
    @Transactional
    public ResumeDto updateResume(Long resumeId, ResumeDto resumeDto) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("이력서를 찾을 수 없습니다."));
        
        if (resumeDto.getTitle() != null) {
            resume.setTitle(resumeDto.getTitle());
        }
        if (resumeDto.getIsPrimary() != null) {
            // primary 설정 시 기존 primary 해제
            if (resumeDto.getIsPrimary() && !resume.getIsPrimary()) {
                resumeRepository.findByUserUserIdAndIsPrimaryTrue(resume.getUser().getUserId())
                        .ifPresent(existing -> {
                            existing.setIsPrimary(false);
                            resumeRepository.save(existing);
                        });
            }
            resume.setIsPrimary(resumeDto.getIsPrimary());
        }
        if (resumeDto.getJobCategory() != null) {
            resume.setJobCategory(resumeDto.getJobCategory());
        }
        if (resumeDto.getTargetCompanyType() != null) {
            resume.setTargetCompanyType(resumeDto.getTargetCompanyType());
        }
        if (resumeDto.getTargetLocation() != null) {
            resume.setTargetLocation(resumeDto.getTargetLocation());
        }
        if (resumeDto.getIsPublic() != null) {
            resume.setIsPublic(resumeDto.getIsPublic());
        }
        
        Resume savedResume = resumeRepository.save(resume);
        return ResumeDto.from(savedResume);
    }
    
    @Transactional
    public void deleteResume(Long resumeId) {
        if (!resumeRepository.existsById(resumeId)) {
            throw new RuntimeException("이력서를 찾을 수 없습니다.");
        }
        resumeRepository.deleteById(resumeId);
    }
}
