# Pagination Controls

## 목표

page state와 page size로 목록을 자르고 이전/다음 버튼 상태를 계산한다.

## 요구사항

- 처음 화면에는 첫 page item만 보인다.
- Next/Previous 버튼을 누르면 보이는 item과 page label이 바뀐다.
- 첫 page에서는 Previous가 disabled이고 마지막 page에서는 Next가 disabled이다.
- page size를 바꾸면 한 page에 보이는 item 수가 바뀐다.
- page size 변경으로 현재 page가 범위를 벗어나면 마지막 page로 보정된다.
- 마지막 page에는 남은 item만 보인다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-pagination-controls dev
pnpm --filter @remind/practice-pagination-controls test
```
