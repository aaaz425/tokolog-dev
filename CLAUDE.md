# tokolog

개인 경력 관리 서비스. 사내/개인 프로젝트를 체계적으로 기록하고 관리한다.

## 기술 스택

| 역할 | 선택 |
|------|------|
| 프론트엔드 | React 18 + Vite + TypeScript |
| 스타일링 | Tailwind CSS v4 (`@tailwindcss/vite` 플러그인) |
| 상태관리 | Zustand (UI 상태) |
| 데이터 | 정적 JSON 파일 (`src/data/`) |
| 이미지 | Vercel `public/` 폴더 |
| 동영상 | Google Drive iframe 임베드 |
| 호스팅 | Vercel |
| 라우팅 | React Router v6 |

## 실행 명령어

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run server   # json-server (localhost:3001) — 별도 터미널에서 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 디렉토리 구조

```
src/
├── components/   # 재사용 UI 컴포넌트 (Layout, ProjectCard, TagBadge)
├── data/         # 정적 JSON 데이터 (projects.json, posts.json 등)
├── pages/        # 라우트별 페이지 (HomePage, ProjectDetailPage)
├── store/        # Zustand 스토어 (UI 상태만)
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

## 개발 규칙

### React 컴포넌트
- **작성·수정 시 반드시 `react-best-practice` skill을 먼저 실행한다**
- **커밋 전 반드시 `pre-commit-check` skill을 실행한다**
- named export (`export function Foo`)
- 타입은 모두 `src/types/` 에 위치
- 데이터는 `src/data/*.json`에서 직접 import, Zustand는 UI 상태(필터 탭 등)에만 사용
- 새 ProjectType 추가 시 수정 파일: `src/types/project.ts`, `ProjectCard.tsx`, `HomePage.tsx` 필터 탭

### 스타일
- **작업 시 반드시 [`docs/design.md`](docs/design.md)를 먼저 확인한다**
- 색상, 타이포그래피, 간격은 `docs/design.md`의 Tailwind 클래스 기준을 따른다
- 새 색상·폰트·radius를 임의로 추가하지 않는다
- `docs/design.md`에 없는 패턴이 필요하면 먼저 문서에 추가한 뒤 구현한다
- 라이트모드 단일 기준 (다크모드 없음)

### 아이콘
- 아이콘은 **`lucide-react`만 사용한다** (`import { IconName } from 'lucide-react'`)
- 텍스트 기호(`×`, `←`, `→` 등)로 아이콘을 표현하지 않는다
- 이모지는 장식 텍스트에만 허용 (UI 액션 아이콘으로는 사용 불가)

## Git 컨벤션

- **커밋·PR 생성 시 반드시 `git-convention` skill을 실행한다**
- `git`, `gh` 등 모든 CLI 명령은 반드시 **PowerShell 도구**로 실행한다 (Bash에서는 `gh` 못 찾음)
- `gh` 전체 경로: `& "C:\Program Files\GitHub CLI\gh.exe"`

