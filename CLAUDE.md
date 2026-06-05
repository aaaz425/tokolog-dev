# tokolog

개인 경력 관리 서비스. 사내/개인 프로젝트를 체계적으로 기록하고 관리한다.

## 기술 스택

- React 18 + Vite + TypeScript
- Tailwind CSS (v4, `@tailwindcss/vite` 플러그인)
- React Router v6
- Zustand (상태관리 + localStorage 영속성)

## 실행 명령어

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 디렉토리 구조

```
src/
├── components/   # 재사용 UI 컴포넌트 (Layout, ProjectCard, TagBadge)
├── pages/        # 라우트별 페이지 (HomePage, ProjectDetailPage)
├── store/        # Zustand 스토어 (projectStore.ts)
└── types/        # TypeScript 타입 정의 (project.ts)
```

## 라우팅

| 경로 | 페이지 |
|------|--------|
| `/` | 프로젝트 목록 (필터 탭 + 카드 그리드) |
| `/projects/:id` | 프로젝트 상세/편집/삭제 |

## 데이터 모델 (`src/types/project.ts`)

```ts
interface Project {
  id: string;           // crypto.randomUUID()
  title: string;
  type: 'company' | 'personal';
  description: string;
  techStack: string[];  // 기술 스택 태그
  startDate: string;    // YYYY-MM 형식
  endDate?: string;     // 없으면 진행 중
  links?: { label: string; url: string }[];
  createdAt: string;    // ISO 8601
}
```

## 코딩 컨벤션

- 컴포넌트: named export (`export function Foo`)
- 타입은 모두 `src/types/` 에 위치
- 스토어 액션은 Zustand set 함수 안에서 localStorage도 함께 동기화
- 새 ProjectType 추가 시 수정 파일: `src/types/project.ts`, `ProjectCard.tsx`, `HomePage.tsx` 필터 탭

## Git 컨벤션

### 커밋 메시지 — Conventional Commits

```
<type>: <subject>
```

| type | 사용 시점 |
|------|----------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | UI/스타일 변경 (기능 변경 없음) |
| `refactor` | 코드 리팩토링 |
| `chore` | 설정, 패키지, 빌드 관련 |
| `docs` | 문서 수정 (CLAUDE.md, design.md 등) |

- subject는 명령형으로, 마침표 없이 작성
- 예: `feat: 프로젝트 추가 모달 구현`, `fix: 날짜 입력 유효성 오류 수정`

### 브랜치 전략 — GitHub Flow

```
main
├── feature/<설명>   # 새 기능
└── fix/<설명>       # 버그 수정
```

- `main` 직접 push 금지
- 작업 단위로 브랜치 생성 → PR → Squash Merge
- 브랜치명은 소문자 + 하이픈: `feature/sidebar-layout`, `fix/modal-date-validation`

### 머지 방식 — Squash Merge

- PR의 커밋을 하나로 합쳐 `main`에 머지
- 머지 후 feature 브랜치 즉시 삭제

### PR 규칙

- **제목**: 커밋 메시지와 동일한 형식 (`feat: ...`, `fix: ...`)
- **본문**: 변경 이유 + 주요 변경 사항 요약
- **머지**: Squash Merge 후 브랜치 즉시 삭제
- **셀프 리뷰**: 머지 전 diff 한 번 확인

---

## 스타일 작업 규칙

**UI·스타일 관련 작업 시 반드시 [`docs/design.md`](docs/design.md)를 먼저 확인한다.**

- 색상, 타이포그래피, 간격은 `docs/design.md`의 Tailwind 클래스 기준을 따른다
- 새 색상·폰트·radius를 임의로 추가하지 않는다
- 컴포넌트 추가 시 `docs/design.md`의 컴포넌트 패턴을 재사용한다
- `docs/design.md`에 없는 패턴이 필요하면 먼저 문서에 추가한 뒤 구현한다
- 라이트모드 단일 기준 (다크모드 없음)
