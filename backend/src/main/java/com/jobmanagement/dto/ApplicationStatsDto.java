package com.jobmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStatsDto {
    private Long totalApplications;
    private Long appliedCount;
    private Long documentPassCount;
    private Long finalPassCount;
    private Long rejectedCount;
    
    // 통과율 계산
    public Double getDocumentPassRate() {
        if (totalApplications == 0) return 0.0;
        return (documentPassCount / (double) totalApplications) * 100;
    }
    
    public Double getFinalPassRate() {
        if (totalApplications == 0) return 0.0;
        return (finalPassCount / (double) totalApplications) * 100;
    }
}
