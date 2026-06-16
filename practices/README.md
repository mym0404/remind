# CoderPad React + TypeScript Practice Sets

이 폴더는 React live coding 대비용 practice workspace다. 각 package는 얇은 starter, README, Vitest 채점 테스트를 함께 둔다.

## 패키지

| 패키지 | 중심 개념 |
|---|---|
| `form-validation-errors` | 제출 시 field별 에러를 만들고 첫 번째 invalid field로 focus를 옮긴다. |
| `async-load-states` | 네트워크 요청의 loading, error, data, empty 상태를 분리한다. |
| `debounced-search` | 입력은 즉시 바꾸고 요청 기준값만 delay 뒤에 갱신한다. |
| `throttled-input` | 짧은 시간에 몰리는 입력 이벤트를 일정 간격으로 제한한다. |
| `stale-response-guard` | 늦게 끝난 이전 요청이 최신 화면을 덮지 못하게 막는다. |
| `retryable-fetch` | 실패한 요청을 같은 조건으로 다시 실행한다. |
| `local-storage-hook` | state와 localStorage를 같은 API로 묶고 깨진 저장값을 기본값으로 복구한다. |
| `reducer-actions` | 상태 전이를 discriminated union action으로 모은다. |
| `context-provider-guard` | Provider 바깥 hook 사용을 명확한 에러로 막고 context value를 안정화한다. |
| `file-tree-transform` | flat path 배열을 임의 깊이의 folder/file tree로 바꾼다. |
| `react-router-detail` | 목록 route와 상세 route를 나누고 route param으로 데이터를 찾는다. |
| `url-search-filter` | 검색어를 URL query string에 저장하고 새로고침 가능한 상태로 만든다. |
| `modal-dialog` | dialog ARIA, focus 이동, Escape와 backdrop 닫기를 한 modal 문제 안에서 구현한다. |
| `toast-notifications` | toast queue, live region, 수동 닫기, 자동 제거를 한 문제로 다룬다. |
| `popover-positioning` | trigger와 floating rect를 읽어 기본 위치를 잡고 viewport 밖이면 보정한다. |
| `pagination-controls` | page state와 page size로 목록을 자르고 이전/다음 버튼 상태를 계산한다. |
| `infinite-scroll-sentinel` | IntersectionObserver로 sentinel을 관찰하고 다음 page를 append한다. |
| `virtualized-list-range` | scroll 위치와 row 높이로 보이는 구간만 렌더링한다. |
| `deferred-filter-list` | 입력 state는 즉시 갱신하고 무거운 필터링만 낮은 우선순위로 늦춘다. |
| `responsive-card-grid` | 카드 목록이 viewport 너비에 맞춰 열 수를 바꾸게 만든다. |
| `sticky-table-header` | 스크롤되는 표에서 header만 상단에 붙게 만든다. |
| `scrollable-panel-layout` | 고정 header와 내부 scroll 영역이 섞인 panel layout을 만든다. |

## 실행

```bash
pnpm --filter @remind/practice-form-validation-errors dev
pnpm --filter @remind/practice-form-validation-errors test
```
