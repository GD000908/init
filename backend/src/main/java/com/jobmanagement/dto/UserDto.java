package com.jobmanagement.dto;

import com.jobmanagement.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String name;
    private String careerLevel;
    private String jobCategory;
    private String profileImageUrl;
    private Boolean isMatchingEnabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // 프론트엔드 호환성을 위한 추가 필드
    private String email;
    private String phone;
    private String jobTitle;
    private String introduction;
    
    public static UserDto from(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .careerLevel(user.getCareerLevel().name())
                .jobCategory(user.getJobCategory())
                .profileImageUrl(user.getProfileImageUrl())
                .isMatchingEnabled(user.getIsMatchingEnabled())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                // 임시 하드코딩 값 (추후 DB 스키마 수정 시 변경)
                .email("nagundo@naver.com")
                .phone("010-9999-5678")
                .jobTitle(user.getJobCategory() != null ? user.getJobCategory() : "개발자")
                .introduction("안녕하세요, " + (user.getCareerLevel() == User.CareerLevel.NEWCOMER ? "신입" : "경력") + " 개발자입니다.")
                .build();
    }
}
