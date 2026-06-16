# Infinite Scroll Sentinel

## 목표

`useIntersectionObserver` hook으로 sentinel을 관찰하고 다음 page를 append한다.

## 요구사항

- sentinel이 교차 상태가 되면 다음 page item이 기존 목록 뒤에 붙는다.
- `isIntersecting`이 `false`이면 append callback이 실행되지 않는다.
- loading 중 다시 교차해도 중복 append가 일어나지 않는다.
- 컴포넌트가 unmount되면 observer가 disconnect된다.
- `useIntersectionObserver` named hook으로 observe와 cleanup 동작을 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-infinite-scroll-sentinel dev
pnpm --filter @remind/practice-infinite-scroll-sentinel test
```
