# Throttled Input

## 목표

짧은 시간에 몰리는 입력 이벤트를 일정 간격으로 제한한다.

## 요구사항

- 값을 입력하면 input value는 즉시 바뀐다.
- 첫 렌더링의 초기값은 바로 게시된다.
- interval 안에서 추가로 입력하면 게시 값은 즉시 바뀌지 않는다.
- interval이 끝나면 interval 안의 마지막 값이 게시된다.
- 컴포넌트가 unmount되면 남은 trailing timer가 정리된다.
- `useThrottle` named hook으로 게시 값 변화를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-throttled-input dev
pnpm --filter @remind/practice-throttled-input test
```
