---
name: git-convention
description: tokolog 프로젝트의 Git 커밋 메시지 형식과 작업 흐름을 참조한다. 커밋 직전에 반드시 확인한다.
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

## 작업 흐름

```
1. 작업 & git commit
2. git push origin main
```
