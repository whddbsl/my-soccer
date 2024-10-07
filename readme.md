# 프로젝트 이름

## Day 1: 프로젝트 초기 설정 및 기본 기능 구현

오늘은 프로젝트의 기초를 다지고 몇 가지 핵심 기능을 구현했습니다.

### 1. 프로젝트 초기 설정

- .gitignore 파일 생성 및 구성
- env.local 파일 Git 추적 제거

### 2. API 구현

#### 2.1 사용자 인증 API
- POST /api/auth/signup: 새 사용자 등록
- POST /api/auth/login: 사용자 로그인

#### 2.2 팀 관련 API
- POST /api/team/create: 새 팀 생성
- POST /api/team/join: 팀 가입
- GET /api/team/[teamId]: 특정 팀 정보 조회

#### 2.3 사용자 관련 API
- GET /api/user/info: 사용자 정보 조회
- GET /api/user/teams: 사용자가 속한 팀 목록 조회

#### 2.4 팀원 관련 API
- GET /api/team/members: 팀 멤버 목록 조회

### 3. 컴포넌트 개발

- CreateTeamModal: 새 팀 생성을 위한 모달 컴포넌트
- JoinTeamModal: 팀 가입을 위한 모달 컴포넌트

### 4. 페이지 구현

- pages/index.js: 메인 페이지 (홈)
- pages/login.js: 로그인 페이지
- pages/signup.js: 회원가입 페이지
- pages/team/[teamId].js: 팀 상세 페이지

### 5. 유틸리티 및 설정 파일

- lib/mongodb.js: MongoDB 연결 설정
- lib/auth.js: 사용자 인증 관련 유틸리티 함수
- tailwind.config.js: Tailwind CSS 설정
- postcss.config.js: PostCSS 설정

### 주요 기능

1. 사용자 등록 및 로그인
2. 팀 생성 및 가입
3. 사용자가 속한 팀 목록 조회
4. 팀 상세 정보 및 멤버 목록 조회

### 다음 단계

- [ ] 팀 관리 기능 개선 (멤버 역할 관리, 팀 설정 등)
- [ ] 경기 일정 관리 기능 구현
- [ ] 사용자 프로필 페이지 개발
- [ ] 팀 통계 기능 추가

---

이 README는 프로젝트의 진행 상황을 기록합니다. 앞으로도 주요 작업과 결정사항을 지속적으로 업데이트할 예정입니다.
