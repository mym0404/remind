# Virtualized List Range

## 목표

scroll 위치와 row 높이로 보이는 구간만 렌더링한다.

## 요구사항

- `scrollTop`, `viewportHeight`, `rowHeight`, `itemCount`, `overscan`을 넣으면 렌더링 range가 계산된다.
- 계산된 start/end는 list boundary 밖으로 나가지 않는다.
- 스크롤 위치가 바뀌면 화면에 렌더링되는 row가 바뀐다.
- range 앞뒤 offscreen row 높이는 spacer로 유지된다.
- 긴 목록 화면을 열면 DOM에는 visible range row만 있고 전체 row가 한 번에 보이지 않는다.
- `getVisibleRange` named export로 range 계산 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-virtualized-list-range dev
pnpm --filter @remind/practice-virtualized-list-range test
```
