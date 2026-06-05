# tokolog Spec

개인 경력 관리 및 블로그 서비스. 프로젝트·경력·기술 스택을 한 곳에서 관리하고 공유한다.

---

## 페이지 구성 및 우선순위

| 순위 | 페이지 | 상태 |
|------|--------|------|
| 1 | Projects | 진행 중 |
| 2 | Experience | 미착수 |
| 3 | Tech Stack | 미착수 |
| - | Blog | 장기 로드맵 |

---

## Projects 페이지

### 목적
사내·개인 프로젝트를 카드 형태로 기록하고 관리한다.

### 기능 목록
- [ ] 프로젝트 카드 목록 (3열 그리드, 모바일 1열)
- [ ] 유형 필터 탭 (전체 / 사내 / 개인)
- [ ] 프로젝트 추가 (모달)
- [ ] 프로젝트 상세 보기
- [ ] 프로젝트 편집
- [ ] 프로젝트 삭제
- [ ] 썸네일 이미지 업로드

### 데이터 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | ✅ | crypto.randomUUID() |
| `title` | string | ✅ | 프로젝트명 |
| `type` | 'company' \| 'personal' | ✅ | 사내 / 개인 |
| `description` | string | ✅ | 프로젝트 설명 |
| `techStack` | string[] | | 사용 기술 태그 |
| `startDate` | string | ✅ | YYYY-MM |
| `endDate` | string | | YYYY-MM, 없으면 진행 중 |
| `thumbnailUrl` | string | | 썸네일 이미지 URL |
| `links` | { label, url }[] | | 관련 링크 (GitHub, 배포 등) |
| `createdAt` | string | ✅ | ISO 8601 |

### 미완성 항목
- 썸네일 업로드 미구현 (현재 첫 글자 플레이스홀더)
- 링크 입력 UI 미구현 (모달에 링크 필드 없음)

---

## Experience 페이지

### 목적
회사 경력을 타임라인 형태로 정리한다.

### 기능 목록
- [ ] 경력 타임라인 목록
- [ ] 경력 추가 / 편집 / 삭제
- [ ] 회사별 담당 업무 기술

### 데이터 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | ✅ | |
| `company` | string | ✅ | 회사명 |
| `role` | string | ✅ | 직책/직무 |
| `startDate` | string | ✅ | YYYY-MM |
| `endDate` | string | | YYYY-MM, 없으면 재직 중 |
| `description` | string | | 담당 업무 요약 |
| `tasks` | string[] | | 세부 업무 목록 |

---

## Tech Stack 페이지

### 목적
사용 가능한 기술을 카테고리별로 정리하고 숙련도를 표시한다.

### 기능 목록
- [ ] 카테고리별 기술 목록 (언어, 프레임워크, 도구 등)
- [ ] 기술별 숙련도 표시
- [ ] 기술 추가 / 편집 / 삭제

### 데이터 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | ✅ | |
| `name` | string | ✅ | 기술명 |
| `category` | string | ✅ | 언어 / 프레임워크 / 도구 / 인프라 |
| `level` | 1 \| 2 \| 3 | ✅ | 1: 입문 / 2: 실무 / 3: 숙련 |
| `iconUrl` | string | | 아이콘 이미지 |

---

## Blog (장기 로드맵)

### 목적
기술 글, 회고, 일상을 작성하고 공유한다.

### 기능 목록 (예정)
- [ ] 글 목록 (카드형)
- [ ] 글 작성 / 편집 (Markdown)
- [ ] 태그 기반 분류
- [ ] 공개 / 비공개 설정

---

## 기술 스택

| 역할 | 선택 |
|------|------|
| 프론트엔드 | React + Vite + TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 상태관리 | Zustand + localStorage (현재) → Supabase 연동 시 제거 |
| DB | Supabase (PostgreSQL) |
| 백엔드 API | Supabase 내장 REST API + supabase-js |
| 이미지 스토리지 | Supabase Storage |
| 호스팅 | Vercel |

---

## 개발 순서

### Phase 1 — Projects

#### /projects 페이지 초기 구현

| 순서 | 태스크 | 브랜치 |
|------|------|--------|
| 1 | 목 데이터 파일 생성 — `src/data/projects.ts`에 `mockProjects` 배열 선언 | `feature/projects-page` |
| 2 | ProjectsPage 생성 — 그리드 레이아웃 뼈대 작성 | `feature/projects-page` |
| 3 | 카드 렌더링 연결 — `mockProjects.map`으로 `ProjectCard` 출력 | `feature/projects-page` |
| 4 | 라우트 등록 — `App.tsx`에 `/projects` 경로 추가 | `feature/projects-page` |
| 5 | 네비게이션 수정 — Layout의 Projects 링크를 `/` → `/projects` 변경 | `feature/projects-page` |

---

## 공통 사항

- **인증 없음** — 개인 서비스로 로그인 불필요
- **데이터 저장** — localStorage (현재) → 추후 백엔드 연동 고려
- **반응형** — PC(사이드바 + 3열) / 모바일(탑 네브 + 1열)
- **디자인** — `docs/design.md` 기준 준수
