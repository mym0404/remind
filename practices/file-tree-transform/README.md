# File Tree Transform

## 목표

flat path 배열을 임의 깊이의 folder/file tree로 바꾼다.

## 요구사항

- path 목록을 넘기면 folder node와 file node가 구분된 tree가 만들어진다.
- 같은 folder를 공유하는 path는 하나의 folder node 아래로 합쳐진다.
- 중복 path를 넣어도 같은 file node가 한 번만 보인다.
- 여러 depth의 nested path를 넣어도 계층이 유지된다.
- 같은 depth에서는 folder가 file보다 먼저 보이고, 이름은 대소문자와 무관하게 정렬된다.
- `buildFileTree` named export로 변환 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-file-tree-transform dev
pnpm --filter @remind/practice-file-tree-transform test
```
