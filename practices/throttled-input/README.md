# Throttled Input

## 목표

짧은 시간에 몰리는 입력 이벤트를 일정 간격으로 제한한다.

## 요구사항

- useThrottle hook을 만든다.
- interval 안에서는 값을 즉시 바꾸지 않는다.
- 마지막 입력은 interval 뒤에 반영한다.

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
