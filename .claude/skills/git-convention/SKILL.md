---
name: git-convention
description: tokolog 프로젝트의 Git 커밋 메시지 형식, 브랜치 전략, PR 규칙, 작업 흐름을 참조한다. 커밋·PR 생성 직전에 반드시 확인한다.
---

## 커밋 메시지 — Conventional Commits

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

## 브랜치 전략 — GitHub Flow

```
main
├── feature/<설명>   # 새 기능
└── fix/<설명>       # 버그 수정
```

- `main` 직접 push 금지
- 브랜치명은 소문자 + 하이픈: `feature/sidebar-layout`, `fix/modal-date-validation`

## 작업 흐름 (매 작업마다 이 순서로)

```
1. git checkout -b feature/<설명>
2. 작업 & git commit
3. git push origin feature/<설명>
4. gh pr create
5. gh pr merge --squash --delete-branch
```

## PR 규칙

- **제목**: 커밋 메시지와 동일한 형식 (`feat: ...`, `fix: ...`)
- **본문**: 변경 이유 + 주요 변경 사항 요약
- **머지**: Squash Merge 후 브랜치 즉시 삭제
