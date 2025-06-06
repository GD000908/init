package com.jobmanagement.service;

import com.jobmanagement.dto.UserDto;
import com.jobmanagement.entity.User;
import com.jobmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserDto getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        return UserDto.from(user);
    }
    
    @Transactional
    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        
        // 업데이트 가능한 필드만 수정
        if (userDto.getName() != null) {
            user.setName(userDto.getName());
        }
        if (userDto.getJobCategory() != null) {
            user.setJobCategory(userDto.getJobCategory());
        }
        if (userDto.getCareerLevel() != null) {
            try {
                user.setCareerLevel(User.CareerLevel.valueOf(userDto.getCareerLevel()));
            } catch (IllegalArgumentException e) {
                // 유효하지 않은 경력 레벨인 경우 무시
            }
        }
        if (userDto.getProfileImageUrl() != null) {
            user.setProfileImageUrl(userDto.getProfileImageUrl());
        }
        if (userDto.getIsMatchingEnabled() != null) {
            user.setIsMatchingEnabled(userDto.getIsMatchingEnabled());
        }
        
        User savedUser = userRepository.save(user);
        return UserDto.from(savedUser);
    }
}
