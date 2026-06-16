# React Router Detail

## 목표

목록 route와 상세 route를 나누고 route param으로 데이터를 찾는다.

## 요구사항

- React Router Routes를 구성한다.
- 목록 route(`/`)에서 article 목록을 보여준다.
- 각 article은 Link로 `/articles/:id` 상세 route로 이동한다.
- useParams로 id를 읽는다.
- id 조회 로직은 named export인 `findArticle`로 구현한다.
- 없는 id는 404 fallback을 보여준다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-react-router-detail dev
pnpm --filter @remind/practice-react-router-detail test
```
