-- 취업 관리 시스템 초기 DB 스키마
-- 데이터베이스는 docker-compose.yml에서 생성됨

-- 사용자 테이블
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    career_level ENUM('NEWCOMER', 'EXPERIENCED') NOT NULL DEFAULT 'NEWCOMER',
    job_category VARCHAR(100),
    profile_image_url VARCHAR(500),
    is_matching_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 희망 조건 테이블
CREATE TABLE user_preferences (
    preference_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    job_categories JSON, -- ["웹・SW 개발", "AI/ML"]
    locations JSON, -- ["서울특별시", "경기도"]
    min_salary INT, -- 단위: 만원
    work_type ENUM('REMOTE', 'OFFICE', 'HYBRID') DEFAULT 'OFFICE',
    other_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 회사 테이블
CREATE TABLE companies (
    company_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL UNIQUE,
    industry VARCHAR(100),
    size ENUM('STARTUP', 'MEDIUM', 'LARGE') DEFAULT 'MEDIUM',
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 이력서 테이블
CREATE TABLE resumes (
    resume_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    job_category VARCHAR(100),
    target_company_type VARCHAR(100),
    target_location VARCHAR(200),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 자기소개서 테이블
CREATE TABLE cover_letters (
    cover_letter_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    is_template BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 지원 현황 테이블
CREATE TABLE applications (
    application_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    company_id BIGINT NOT NULL,
    resume_id BIGINT,
    cover_letter_id BIGINT,
    status ENUM('APPLIED', 'DOCUMENT_PASS', 'FINAL_PASS', 'REJECTED') DEFAULT 'APPLIED',
    applied_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(resume_id) ON DELETE SET NULL,
    FOREIGN KEY (cover_letter_id) REFERENCES cover_letters(cover_letter_id) ON DELETE SET NULL
);

-- 관심 회사 테이블
CREATE TABLE user_companies (
    user_company_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    company_id BIGINT NOT NULL,
    job_category VARCHAR(100),
    priority INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_company (user_id, company_id)
);

-- 활동 통계 테이블
CREATE TABLE activity_stats (
    stat_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    stat_type ENUM('RESUME_COUNT', 'COVER_LETTER_COUNT', 'BOOKMARK_COUNT', 'DEADLINE_COUNT') NOT NULL,
    value INT DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_stat_date (user_id, stat_type, date)
);

-- 인덱스 생성
CREATE INDEX idx_applications_user_status ON applications(user_id, status);
CREATE INDEX idx_resumes_user_primary ON resumes(user_id, is_primary);
CREATE INDEX idx_user_companies_user ON user_companies(user_id);
CREATE INDEX idx_activity_stats_user_date ON activity_stats(user_id, date);

-- 테스트 데이터 삽입
INSERT INTO users (name, career_level, job_category, is_matching_enabled) VALUES
('박건도', 'NEWCOMER', '개발자', TRUE);

INSERT INTO companies (name, industry, size, location) VALUES
('네이버', 'IT/인터넷', 'LARGE', '경기도 성남시'),
('카카오', 'IT/인터넷', 'LARGE', '경기도 성남시'),
('라인', 'IT/인터넷', 'LARGE', '경기도 성남시'),
('쿠팡', 'IT/인터넷', 'LARGE', '서울특별시'),
('토스', '핀테크', 'MEDIUM', '서울특별시');

INSERT INTO user_preferences (user_id, job_categories, locations, min_salary, work_type, other_requirements) VALUES
(1, '["웹・SW 개발", "AI/ML"]', '["서울특별시", "경기도"]', 3500, 'HYBRID', '재택근무 가능');

INSERT INTO resumes (user_id, title, is_primary, job_category, target_company_type, target_location, is_public) VALUES
(1, '기본 이력서', TRUE, 'IT개발·데이터', '회사내규에 따름', '경기 이천시', TRUE),
(1, '백엔드 개발자 이력서', FALSE, 'IT개발·데이터', '스타트업 지원', '서울 강남구', FALSE),
(1, '프론트엔드 개발자 이력서', FALSE, 'IT개발·데이터', '대기업 지원용', '서울 전체', TRUE);

INSERT INTO applications (user_id, company_id, status, applied_date) VALUES
(1, 1, 'APPLIED', '2025-06-01'),
(1, 3, 'APPLIED', '2025-06-02'),
(1, 2, 'DOCUMENT_PASS', '2025-05-25'),
(1, 5, 'FINAL_PASS', '2025-05-20'),
(1, 4, 'REJECTED', '2025-05-15');

INSERT INTO user_companies (user_id, company_id, job_category, priority) VALUES
(1, 1, '프론트엔드', 1),
(1, 2, '백엔드', 2),
(1, 3, '풀스택', 3),
(1, 4, '프론트엔드', 4);
