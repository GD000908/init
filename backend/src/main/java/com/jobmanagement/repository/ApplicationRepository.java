package com.jobmanagement.repository;

import com.jobmanagement.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserUserIdOrderByAppliedDateDesc(Long userId);
    
    @Query("SELECT a FROM Application a WHERE a.user.userId = :userId AND a.status = :status")
    List<Application> findByUserIdAndStatus(@Param("userId") Long userId, @Param("status") Application.ApplicationStatus status);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.user.userId = :userId AND a.status = :status")
    Long countByUserIdAndStatus(@Param("userId") Long userId, @Param("status") Application.ApplicationStatus status);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.user.userId = :userId")
    Long countByUserId(@Param("userId") Long userId);
}
