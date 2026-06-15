# File Tree Transform

## 목표

flat path 배열을 임의 깊이의 folder/file tree로 바꾼다.

## 요구사항

- 폴더와 파일 node를 구분한다.
- 폴더를 파일보다 먼저 정렬한다.
- 같은 depth에서는 대소문자 무시 알파벳 순으로 정렬한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-file-tree-transform dev
pnpm --filter @remind/practice-file-tree-transform test
```
