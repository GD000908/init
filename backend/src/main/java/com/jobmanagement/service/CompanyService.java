package com.jobmanagement.service;

import com.jobmanagement.dto.CompanyDto;
import com.jobmanagement.entity.Company;
import com.jobmanagement.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompanyService {
    
    private final CompanyRepository companyRepository;
    
    public List<CompanyDto> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(CompanyDto::from)
                .collect(Collectors.toList());
    }
    
    public CompanyDto getCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("회사를 찾을 수 없습니다."));
        return CompanyDto.from(company);
    }
}
