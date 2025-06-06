package com.jobmanagement.dto;

import com.jobmanagement.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private Long companyId;
    private String name;
    private String industry;
    private String size;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static CompanyDto from(Company company) {
        return CompanyDto.builder()
                .companyId(company.getCompanyId())
                .name(company.getName())
                .industry(company.getIndustry())
                .size(company.getSize().name())
                .location(company.getLocation())
                .createdAt(company.getCreatedAt())
                .updatedAt(company.getUpdatedAt())
                .build();
    }
}
