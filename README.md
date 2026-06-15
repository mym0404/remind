![Remind](./public/og-image.png)

# Remind

React Live Coding in your mind.

React live coding을 짧게 반복 연습하는 저장소입니다. 각 practice는 CoderPad처럼 얇은 starter만 제공하고, 테스트가 요구하는 동작은 직접 구현하게 되어 있습니다.

문제를 먼저 풀고 막히는 지점에서 해답 문서를 확인하세요. 해답 문서는 완성 파일 전체가 아니라 상태 설계, 이벤트 처리, 접근성 연결, 테스트가 보는 핵심 코드만 보여줍니다.

## 구성

| 경로 | 설명 |
|---|---|
| `docs/` | practice별 해답 문서 |
| `docs/sections/*.mdx` | practice 하나에 대응하는 해답 페이지 |
| `references/sections.md` | 해답 페이지 sidebar 기준 |
| `practices/` | React + TypeScript practice workspace |
| `practices/coverage.md` | practice별 검증 개념 매트릭스 |
| `public/og-image.png` | README와 Open Graph 용도 이미지 |

## 연습 순서

1. 아래 목록에서 풀 practice를 하나 고릅니다.
2. 해당 package의 `README.md`를 읽습니다.
3. `src/App.tsx`를 고쳐 테스트가 요구하는 동작을 구현합니다.
4. `pnpm --filter <package-name> test`를 반복 실행합니다.
5. 막히면 문서 사이트에서 같은 이름의 해답 페이지를 봅니다.

starter 상태에서 테스트가 실패하는 것은 정상입니다. 앱은 빌드되지만, 테스트는 아직 구현하지 않은 동작을 채점합니다.

## 실행

처음에는 의존성을 설치합니다.

```bash
pnpm install
```

해답 문서 사이트를 볼 때는 Rspress dev server를 실행합니다.

```bash
pnpm dev
```

practice 하나를 풀 때는 package filter를 씁니다.

```bash
pnpm --filter @remind/practice-react-router-detail dev
pnpm --filter @remind/practice-react-router-detail test
```

전체 practice가 컴파일되는지 확인할 때는 아래 명령을 실행합니다.

```bash
pnpm -r --filter './practices/*' build
```

문서 코드블록과 문서 사이트 build는 아래 명령으로 확인합니다.

```bash
pnpm validate:codeblocks
pnpm build
```

## Practice 목록

| 패키지 | 중심 개념 |
|---|---|
| `@remind/practice-controlled-fields` | 여러 입력값을 하나의 form state로 묶고 DOM 문자열을 화면 경계에서 정리한다. |
| `@remind/practice-form-validation-errors` | 제출 시 field별 에러를 만들고 첫 번째 invalid field로 focus를 옮긴다. |
| `@remind/practice-submit-reset-flow` | 비동기 제출 중 중복 제출을 막고 성공 후 reset까지 한 흐름으로 처리한다. |
| `@remind/practice-async-load-states` | 네트워크 요청의 loading, error, data, empty 상태를 분리한다. |
| `@remind/practice-debounced-search` | 입력은 즉시 바꾸고 요청 기준값만 delay 뒤에 갱신한다. |
| `@remind/practice-throttled-input` | 짧은 시간에 몰리는 입력 이벤트를 일정 간격으로 제한한다. |
| `@remind/practice-stale-response-guard` | 늦게 끝난 이전 요청이 최신 화면을 덮지 못하게 막는다. |
| `@remind/practice-retryable-fetch` | 실패한 요청을 같은 조건으로 다시 실행한다. |
| `@remind/practice-local-storage-hook` | state와 localStorage를 같은 API로 묶고 깨진 저장값을 기본값으로 복구한다. |
| `@remind/practice-reducer-actions` | 상태 전이를 discriminated union action으로 모은다. |
| `@remind/practice-context-provider-guard` | Provider 바깥 hook 사용을 명확한 에러로 막고 context value를 안정화한다. |
| `@remind/practice-file-tree-transform` | flat path 배열을 임의 깊이의 folder/file tree로 바꾼다. |
| `@remind/practice-react-router-detail` | 목록 route와 상세 route를 나누고 route param으로 데이터를 찾는다. |
| `@remind/practice-url-search-filter` | 검색어를 URL query string에 저장하고 새로고침 가능한 상태로 만든다. |
| `@remind/practice-modal-dialog` | dialog ARIA, focus 이동, Escape와 backdrop 닫기를 한 modal 문제 안에서 구현한다. |
| `@remind/practice-toast-notifications` | toast queue, live region, 수동 닫기, 자동 제거를 한 문제로 다룬다. |
| `@remind/practice-popover-positioning` | trigger와 floating rect를 읽어 기본 위치를 잡고 viewport 밖이면 보정한다. |
| `@remind/practice-pagination-controls` | page state와 page size로 목록을 자르고 이전/다음 버튼 상태를 계산한다. |
| `@remind/practice-infinite-scroll-sentinel` | IntersectionObserver로 sentinel을 관찰하고 다음 page를 append한다. |
| `@remind/practice-virtualized-list-range` | scroll 위치와 row 높이로 보이는 구간만 렌더링한다. |
| `@remind/practice-deferred-filter-list` | 입력 state는 즉시 갱신하고 무거운 필터링만 낮은 우선순위로 늦춘다. |
| `@remind/practice-responsive-card-grid` | 카드 목록이 viewport 너비에 맞춰 열 수를 바꾸게 만든다. |
| `@remind/practice-sticky-table-header` | 스크롤되는 표에서 header만 상단에 붙게 만든다. |
| `@remind/practice-scrollable-panel-layout` | 고정 header와 내부 scroll 영역이 섞인 panel layout을 만든다. |

## 해답 문서

문서 사이트의 첫 화면은 practice 해답 목록입니다. 각 페이지는 문제, 풀이 흐름, 핵심 코드, 테스트가 보는 것, 실수 포인트를 짧게 정리합니다.

## 배포 URL

[https://mym0404.github.io/remind/](https://mym0404.github.io/remind/)
