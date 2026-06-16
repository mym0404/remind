# Scrollable Panel Layout

## 목표

고정 header와 내부 scroll 영역이 섞인 panel layout을 만든다.

## 요구사항

- page 전체 높이를 고정한다.
- header는 고정 영역으로 두고 content panel만 남은 높이를 쓴다.
- flexible grid row에는 `minmax(0, 1fr)`를 쓴다.
- body/page scroll은 막고 panel body에만 `overflow: auto`를 둔다.
- scroll panel이 grid 안에서 줄어들 수 있도록 `min-height: 0`을 둔다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-scrollable-panel-layout dev
pnpm --filter @remind/practice-scrollable-panel-layout test
```
