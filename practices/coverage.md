# Practice Concept Coverage

이 매트릭스는 practice set이 코딩 테스트형 React 문제를 작은 단위로 나눠 묻는지 확인하는 기준이다.

## 커버리지 요약

- practice package: 22개
- 기준: 얇은 starter, 세분화된 테스트, 문제별 해답 문서

## 개념 매트릭스

| Practice | 검증 개념 |
|---|---|
| `form-validation-errors` | validation 함수를 컴포넌트 밖에 둔다., 에러 메시지와 입력을 aria-describedby로 연결한다., 첫 번째 invalid field에 focus를 보낸다. |
| `async-load-states` | 초기 요청 시 loading을 보여준다., 빈 배열은 empty state로 처리한다., 실패는 error message로 보여준다. |
| `debounced-search` | useDebounce hook을 만든다., value 변경 시 이전 timer를 cleanup한다., 마지막 입력만 검색에 반영한다. |
| `throttled-input` | useThrottle hook을 만든다., interval 안에서는 값을 즉시 바꾸지 않는다., 마지막 입력은 interval 뒤에 반영한다. |
| `stale-response-guard` | 검색어 변경마다 요청을 보낸다., 최신 요청 id나 AbortController로 stale response를 무시한다., loading 중에도 input은 즉시 갱신된다. |
| `retryable-fetch` | 실패 시 error message와 retry 버튼을 렌더링한다., retry는 마지막 요청 조건을 유지한다., 재시도 중에는 loading 상태를 다시 보여준다. |
| `local-storage-hook` | useLocalStorage hook을 만든다., 초기 mount에서 저장값을 읽는다., 깨진 JSON은 기본값으로 처리한다. |
| `reducer-actions` | add, toggle, remove action을 정의한다., reducer는 기존 배열을 mutate하지 않는다., 완료 항목은 화면에서 완료 상태로 보인다. |
| `context-provider-guard` | Provider와 useTheme hook을 만든다., Provider 밖에서는 에러를 던진다., context value는 useMemo로 안정화한다. |
| `file-tree-transform` | 폴더와 파일 node를 구분한다., 폴더를 파일보다 먼저 정렬한다., 같은 depth에서는 대소문자 무시 알파벳 순으로 정렬한다. |
| `react-router-detail` | React Router Routes를 구성한다., useParams로 id를 읽는다., 없는 id는 404 fallback을 보여준다. |
| `url-search-filter` | useSearchParams로 초기 검색어를 읽는다., 검색어 변경 시 query string을 갱신한다., 빈 검색어는 query param을 제거한다. |
| `modal-dialog` | role="dialog"와 aria-modal을 적용한다., 열릴 때 닫기 버튼으로 focus를 옮긴다., 닫힐 때 trigger focus를 복귀한다., Escape와 backdrop click으로 닫는다. |
| `toast-notifications` | toast 배열 상태를 관리한다., role="status"나 aria-live를 둔다., 수동 닫기와 timer cleanup을 구현한다. |
| `popover-positioning` | trigger click으로 popover를 연다., outside click과 Escape로 닫는다., computePopoverPosition에서 flip과 shift를 처리한다. |
| `pagination-controls` | 현재 page를 state로 둔다., page size로 visible items를 계산한다., 처음/끝 page에서 버튼을 disabled 처리한다. |
| `infinite-scroll-sentinel` | sentinel ref를 observe한다., loading 중 중복 호출을 막는다., unmount 시 observer를 disconnect한다. |
| `virtualized-list-range` | getVisibleRange를 구현한다., overscan을 적용한다., 전체 row를 한 번에 렌더링하지 않는다. |
| `deferred-filter-list` | input value는 transition에 넣지 않는다., useDeferredValue나 useTransition으로 목록 갱신을 분리한다., pending UI를 좁은 범위에만 보여준다. |
| `responsive-card-grid` | CSS Grid를 쓴다., auto-fit 또는 auto-fill과 minmax를 쓴다., 카드 최소 너비를 고정하고 남는 공간을 분배한다. |
| `sticky-table-header` | table을 감싸는 scroll container를 만든다., thead th에 position: sticky와 top을 준다., sticky header 배경을 지정한다. |
| `scrollable-panel-layout` | page 전체 높이를 고정한다., grid row에 minmax(0, 1fr)를 쓴다., scroll 영역에 overflow: auto를 둔다. |
