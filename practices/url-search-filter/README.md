# URL Search Filter

## 목표

검색어를 URL query string에 저장하고 새로고침 가능한 상태로 만든다.

## 요구사항

- query string에 검색어가 있으면 초기 input value와 결과 목록에 같은 검색어가 반영된다.
- 검색어를 입력하면 URL query string이 갱신된다.
- 검색어를 비우면 query param이 URL에서 제거된다.
- 화면에는 현재 검색어에 맞는 상품만 보인다.
- 화면을 확인하면 테스트만을 위한 URL 표시 UI가 없다.
- `filterProducts` named export로 필터 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-url-search-filter dev
pnpm --filter @remind/practice-url-search-filter test
```
