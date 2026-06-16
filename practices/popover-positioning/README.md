# Popover Positioning

## 목표

trigger와 floating rect를 읽어 기본 위치를 잡고 viewport 밖이면 보정한다.

## 요구사항

- trigger click으로 popover를 열고 다시 누르면 닫는다.
- outside click과 Escape로 닫는다.
- `computePopoverPosition`은 named export로 제공한다.
- 기본 placement는 trigger 아래쪽이다.
- 아래쪽 공간이 부족하면 trigger 위쪽으로 flip한다.
- popover가 viewport 좌우를 벗어나면 수평 위치를 보정한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-popover-positioning dev
pnpm --filter @remind/practice-popover-positioning test
```
