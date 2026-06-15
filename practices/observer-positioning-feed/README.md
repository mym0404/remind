# Observer Positioning Feed

## 목표

무한 스크롤 feed와 floating UI 위치 계산을 완성한다.

현재 코드는 버튼으로 더 불러오기만 한다. observer 기반 로딩, cleanup, 좌표 계산을 구현해야 한다.

## 요구사항

- sentinel element에 ref를 연결한다.
- `IntersectionObserver`로 다음 page를 append한다.
- loading 중에는 중복 요청을 막는다.
- `hasMore`가 false면 추가 요청을 멈춘다.
- observer는 unmount나 dependency 변경 시 cleanup한다.
- stale closure 때문에 같은 page가 두 번 붙지 않게 한다.
- `getBoundingClientRect()`로 trigger 위치를 읽는다.
- viewport 밖으로 나가는 floating element를 shift 처리한다.
- 공간이 부족하면 top/bottom placement를 flip한다.
- ResizeObserver나 scroll listener로 위치를 다시 계산한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- observer callback에서 최신 loading/page/hasMore 값을 사용해야 한다.
- DOMRect 좌표와 scroll offset을 혼동하지 않는다.
- cleanup 없이 observer나 listener를 계속 쌓지 않는다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-observer-positioning-feed dev
pnpm --filter @remind/practice-observer-positioning-feed test
```
