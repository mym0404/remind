# Reducer Actions

## 목표

상태 전이를 discriminated union action으로 모은다.

## 요구사항

- add, toggle, remove action을 정의한다.
- reducer는 기존 배열을 mutate하지 않는다.
- 완료 항목은 화면에서 완료 상태로 보인다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-reducer-actions dev
pnpm --filter @remind/practice-reducer-actions test
```
