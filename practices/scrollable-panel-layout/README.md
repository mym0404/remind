# Scrollable Panel Layout

## 목표

고정 header와 내부 scroll 영역이 섞인 panel layout을 만든다.

## 요구사항

- page 전체 높이를 고정한다.
- grid row에 minmax(0, 1fr)를 쓴다.
- scroll 영역에 overflow: auto를 둔다.

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
