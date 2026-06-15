# URL Search Filter

## 목표

검색어를 URL query string에 저장하고 새로고침 가능한 상태로 만든다.

## 요구사항

- useSearchParams로 초기 검색어를 읽는다.
- 검색어 변경 시 query string을 갱신한다.
- 빈 검색어는 query param을 제거한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-url-search-filter dev
pnpm --filter @remind/practice-url-search-filter test
```
