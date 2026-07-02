# tokolog

개인 경력 관리 서비스. 사내/개인 프로젝트를 체계적으로 기록하고 관리한다.

## 기술 스택

| 역할 | 선택 |
|------|------|
| 프레임워크 | Next.js 16.2 + React 19 + TypeScript |
| 스타일링 | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| 상태관리 | Zustand (Client UI 상태만) |
| 데이터 | 정적 JSON 파일 (`src/data/`) |
| 이미지 | Vercel `public/` 폴더 |
| 동영상 | Google Drive iframe 임베드 |
| 호스팅 | Vercel |
| 라우팅 | Next.js App Router (`src/app/`) |

## 실행 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
```

## 데이터 모델

타입 정의: [`src/types/project.ts`](src/types/project.ts)

## 개발 규칙

### React 컴포넌트
- **작성·수정 시 반드시 `nextjs-best-practice` skill을 먼저 실행한다**
- named export (`export function Foo`)
- 타입은 모두 `src/types/` 에 위치
- 데이터는 `src/data/*.json`에서 직접 import, Zustand는 UI 상태에만 사용

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

- **커밋 전 반드시 `pre-commit-check` skill을 실행한다**
- **커밋 시 반드시 `git-convention` skill을 실행한다**
- main 브랜치에 직접 push한다
