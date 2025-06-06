package com.jobmanagement.repository;

import com.jobmanagement.entity.CoverLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoverLetterRepository extends JpaRepository<CoverLetter, Long> {
    List<CoverLetter> findByUserUserIdOrderByCreatedAtDesc(Long userId);
    List<CoverLetter> findByUserUserIdAndIsTemplateTrue(Long userId);
}
