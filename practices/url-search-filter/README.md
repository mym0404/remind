# URL Search Filter

## 목표

검색어를 URL query string에 저장하고 새로고침 가능한 상태로 만든다.

## 요구사항

- useSearchParams로 초기 검색어를 읽는다.
- 초기 검색어는 입력값과 결과 목록에 모두 반영한다.
- 검색어 변경 시 query string을 갱신한다.
- 빈 검색어는 query param을 제거한다.
- 상품 필터링 로직은 `filterProducts` named export로 제공한다.
- 테스트만을 위한 URL 표시 UI를 추가하지 않는다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- 테스트는 4~7개로 사용자 동작과 순수 로직을 함께 검증한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-url-search-filter dev
pnpm --filter @remind/practice-url-search-filter test
```
