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

### Phase 1 — Projects 완성 (현재)

| 순서 | 기능 | 브랜치 |
|------|------|--------|
| 1 | 링크 입력 UI — 모달에 GitHub / 배포 링크 필드 추가 | `feature/project-links` |
| 2 | 썸네일 이미지 업로드 — 이미지 선택 및 미리보기, base64 저장 | `feature/project-thumbnail` |
| 3 | 검색 — 제목 기준 실시간 검색 인풋 추가 | `feature/project-search` |
| 4 | 정렬 — 최신순 / 오래된순 / 이름순 드롭다운 | `feature/project-sort` |
| 5 | 빈 상태(Empty State) 개선 — 일러스트 또는 안내 문구 + CTA 버튼 | `feature/project-empty-state` |

### Phase 2 — Experience

| 순서 | 기능 | 브랜치 |
|------|------|--------|
| 1 | 타입 정의 + 스토어 — Experience 인터페이스, Zustand 스토어, localStorage | `feature/experience-store` |
| 2 | 경력 타임라인 UI — 회사명, 직책, 기간을 세로 타임라인으로 표시 | `feature/experience-timeline` |
| 3 | 경력 CRUD — 추가 모달, 편집, 삭제 | `feature/experience-crud` |
| 4 | 담당 업무 목록 — 경력 상세에 세부 업무 bullet 리스트 | `feature/experience-tasks` |
| 5 | 재직 중 표시 — endDate 없을 때 "재직 중" 배지 | `feature/experience-current` |

### Phase 3 — Tech Stack

| 순서 | 기능 | 브랜치 |
|------|------|--------|
| 1 | 타입 정의 + 스토어 — TechStack 인터페이스, Zustand 스토어, localStorage | `feature/techstack-store` |
| 2 | 카테고리별 기술 목록 UI — 언어 / 프레임워크 / 도구 / 인프라 섹션 | `feature/techstack-list` |
| 3 | 기술 CRUD — 추가, 편집, 삭제 | `feature/techstack-crud` |
| 4 | 숙련도 표시 — 레벨 1~3 시각적 인디케이터 (점 또는 바) | `feature/techstack-level` |
| 5 | 기술 아이콘 — Simple Icons 또는 이미지 URL 기반 아이콘 | `feature/techstack-icon` |

### Phase 4 — Blog (장기 로드맵)

| 순서 | 기능 | 브랜치 |
|------|------|--------|
| 1 | 글 목록 UI — 카드형 목록, 날짜·태그 표시 | `feature/blog-list` |
| 2 | 마크다운 에디터 — 작성 / 미리보기 | `feature/blog-editor` |
| 3 | 글 상세 보기 — 마크다운 렌더링 | `feature/blog-detail` |
| 4 | 태그 분류 — 태그별 필터링 | `feature/blog-tags` |
| 5 | 공개 / 비공개 설정 | `feature/blog-visibility` |

---

## 공통 사항

- **인증 없음** — 개인 서비스로 로그인 불필요
- **데이터 저장** — localStorage (현재) → 추후 백엔드 연동 고려
- **반응형** — PC(사이드바 + 3열) / 모바일(탑 네브 + 1열)
- **디자인** — `docs/design.md` 기준 준수
