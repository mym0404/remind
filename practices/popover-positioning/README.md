# Popover Positioning

## 목표

trigger와 floating rect를 읽어 기본 위치를 잡고 viewport 밖이면 보정한다.

## 요구사항

- trigger를 누르면 popover가 열리고 다시 누르면 닫힌다.
- 바깥 영역을 클릭하거나 Escape를 누르면 popover가 닫힌다.
- trigger 아래 공간이 충분하면 popover 위치가 아래쪽으로 계산된다.
- 아래 공간이 부족하면 popover 위치가 위쪽으로 flip된다.
- popover가 viewport 좌우를 벗어나면 left 값이 viewport 안으로 보정된다.
- `computePopoverPosition` named export로 위치 계산 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-popover-positioning dev
pnpm --filter @remind/practice-popover-positioning test
```
