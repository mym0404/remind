![Remind](./public/og-image.png)

# Remind

React Live Coding in your mind.

React live coding을 짧게 반복 연습하는 저장소입니다. 각 practice는 CoderPad처럼 얇은 starter만 제공하고, 요구사항은 사용자가 실행하는 액션과 그 뒤에 확인되는 결과로 적습니다.

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
3. `src/App.tsx`를 고쳐 README의 액션과 기대 결과가 통과하도록 구현합니다.
4. `pnpm --filter <package-name> test`를 반복 실행합니다.
5. 막히면 문서 사이트에서 같은 이름의 해답 페이지를 봅니다.

starter 상태에서 테스트가 실패하는 것은 정상입니다. 앱은 빌드되지만, 테스트는 아직 구현하지 않은 액션 결과를 검증합니다.

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

| 패키지 | 검증되는 액션과 결과 |
|---|---|
| `@remind/practice-form-validation-errors` | 빈 form을 제출하면 field별 에러가 보이고 첫 번째 invalid field로 focus가 이동한다. |
| `@remind/practice-async-load-states` | 불러오기를 시작하면 loading이 보이고, 응답 결과에 따라 success, empty, error UI가 갈린다. |
| `@remind/practice-debounced-search` | 검색어를 빠르게 입력하면 input 값은 바로 바뀌고 마지막 입력만 delay 뒤 검색 결과에 반영된다. |
| `@remind/practice-throttled-input` | 짧은 간격으로 값을 계속 바꾸면 지정 interval 안의 과도한 갱신이 막히고 마지막 값은 반영된다. |
| `@remind/practice-stale-response-guard` | 이전 검색 요청이 늦게 끝나도 최신 검색어의 결과만 화면에 남는다. |
| `@remind/practice-retryable-fetch` | 실패 화면에서 retry를 누르면 같은 조건으로 다시 loading이 시작되고 성공 시 error가 사라진다. |
| `@remind/practice-local-storage-hook` | 저장된 값을 읽어 초기 UI에 보여주고, 값을 바꾸면 localStorage도 함께 갱신된다. |
| `@remind/practice-reducer-actions` | 항목을 추가, 완료 전환, 삭제하면 목록과 완료 상태가 reducer 결과대로 바뀐다. |
| `@remind/practice-context-provider-guard` | Provider 안에서 toggle하면 context 값이 바뀌고, Provider 밖 hook 사용은 명확한 에러로 막힌다. |
| `@remind/practice-file-tree-transform` | path 목록을 입력하면 folder와 file이 깊이별 tree로 렌더링되고 정렬 순서가 유지된다. |
| `@remind/practice-react-router-detail` | 목록 링크를 누르면 route param에 맞는 상세 화면이 열리고 없는 id는 404 화면이 보인다. |
| `@remind/practice-url-search-filter` | 검색어를 입력하면 URL query가 갱신되고 새로고침 뒤에도 같은 필터 결과가 보인다. |
| `@remind/practice-modal-dialog` | 열기 버튼을 누르면 dialog가 열리고 focus가 이동하며 Escape나 backdrop으로 닫힌다. |
| `@remind/practice-toast-notifications` | toast를 추가하면 live region에 쌓이고, 닫기 버튼이나 시간이 지나면 목록에서 제거된다. |
| `@remind/practice-popover-positioning` | trigger를 누르면 popover가 열리고 viewport 밖으로 나가지 않게 위치가 보정된다. |
| `@remind/practice-pagination-controls` | 다음/이전 버튼과 page size를 바꾸면 보이는 항목과 button disabled 상태가 함께 바뀐다. |
| `@remind/practice-infinite-scroll-sentinel` | sentinel이 viewport에 들어오면 다음 page를 불러와 기존 목록 뒤에 붙인다. |
| `@remind/practice-virtualized-list-range` | 스크롤하면 보이는 row 구간만 렌더링되고 spacer 높이로 전체 scroll 높이가 유지된다. |
| `@remind/practice-deferred-filter-list` | 검색어를 입력하면 input은 즉시 바뀌고 무거운 목록 필터링은 지연된 결과로 갱신된다. |
| `@remind/practice-responsive-card-grid` | viewport 폭을 바꾸면 card grid의 열 수가 CSS Grid 규칙대로 바뀐다. |
| `@remind/practice-sticky-table-header` | table container를 스크롤하면 header가 상단에 붙고 body row만 지나간다. |
| `@remind/practice-scrollable-panel-layout` | panel 안 내용을 길게 만들면 page body 대신 내부 content 영역만 스크롤된다. |

## 해답 문서

문서 사이트의 첫 화면은 practice 해답 목록입니다. 각 페이지는 문제, 풀이 흐름, 핵심 코드, 테스트가 보는 것, 실수 포인트를 짧게 정리합니다.

## 배포 URL

[https://mym0404.github.io/remind/](https://mym0404.github.io/remind/)
