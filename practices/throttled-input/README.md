# Throttled Input

## 목표

짧은 시간에 몰리는 입력 이벤트를 일정 간격으로 제한한다.

## 요구사항

- `useThrottle` hook을 named export로 만든다.
- 입력값은 사용자가 타이핑하는 즉시 input에 반영한다.
- 게시 값은 throttled value로 분리한다.
- leading/trailing 정책은 다음과 같다.
  - 초기값은 첫 렌더링에서 즉시 게시한다.
  - 이후 변경값은 leading으로 즉시 게시하지 않는다.
  - interval 안에 들어온 추가 변경은 새 게시를 막고 최신값만 보관한다.
  - interval이 끝나면 보관한 최신값을 trailing으로 게시한다.
- 컴포넌트가 unmount되면 남아 있는 trailing timer를 정리한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-throttled-input dev
pnpm --filter @remind/practice-throttled-input test
```
