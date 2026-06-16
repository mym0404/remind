# Scrollable Panel Layout

## 목표

고정 header와 내부 scroll 영역이 섞인 panel layout을 만든다.

## 요구사항

- page shell은 viewport 높이에 맞춰 고정된다.
- header는 고정 영역으로 남고 content panel만 남은 높이를 차지한다.
- panel body 내용이 길어지면 body/page가 아니라 panel body만 스크롤된다.
- flexible grid row에는 `minmax(0, 1fr)`가 적용된다.
- scroll panel에는 `min-height: 0`과 `overflow: auto`가 적용된다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-scrollable-panel-layout dev
pnpm --filter @remind/practice-scrollable-panel-layout test
```
