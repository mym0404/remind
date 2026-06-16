# React Router Detail

## 목표

목록 route와 상세 route를 나누고 route param으로 데이터를 찾는다.

## 요구사항

- `/` route로 들어가면 article 목록이 보인다.
- article link를 누르면 `/articles/:id` 상세 route로 이동하고 해당 article이 보인다.
- URL의 id가 없는 article이면 404 fallback이 보인다.
- `findArticle` named export로 id 조회 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-react-router-detail dev
pnpm --filter @remind/practice-react-router-detail test
```
