# Infinite Scroll Sentinel

## 목표

IntersectionObserver로 sentinel을 관찰하고 다음 page를 append한다.

## 요구사항

- sentinel ref를 observe한다.
- loading 중 중복 호출을 막는다.
- unmount 시 observer를 disconnect한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-infinite-scroll-sentinel dev
pnpm --filter @remind/practice-infinite-scroll-sentinel test
```
