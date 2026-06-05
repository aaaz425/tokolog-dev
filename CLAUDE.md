# MyStack

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
