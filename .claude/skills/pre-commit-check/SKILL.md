---
name: pre-commit-check
description: 커밋 전 포맷·빌드를 실행하고 통과 여부를 확인한다. 코드 변경 후 커밋하기 직전에 반드시 실행한다.
---

## 커밋 전 검증 순서

```
1. npm run format   # Prettier 자동 포맷 적용
2. npm run build    # TypeScript 컴파일 오류 없는지 확인
```

- 두 단계 모두 통과해야 커밋을 진행한다
- `npm run format`은 파일을 직접 수정하므로 변경된 파일을 다시 스테이징해야 한다
- 빌드 오류를 무시하고 커밋하지 않는다
