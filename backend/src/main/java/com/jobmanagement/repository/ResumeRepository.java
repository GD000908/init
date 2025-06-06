package com.jobmanagement.repository;

import com.jobmanagement.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserUserId(Long userId);
    Optional<Resume> findByUserUserIdAndIsPrimaryTrue(Long userId);
}
