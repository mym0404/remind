# Reducer Actions

## 목표

상태 전이를 discriminated union action으로 모은다.

## 요구사항

- 할 일을 입력하고 추가하면 새 항목이 목록에 보인다.
- 항목 checkbox를 누르면 완료 표시와 checked 상태가 바뀐다.
- 삭제 버튼을 누르면 해당 항목이 목록에서 사라진다.
- reducer 호출 뒤에도 이전 배열 객체가 직접 mutate되지 않는다.
- `todoReducer` named export로 add, toggle, remove 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-reducer-actions dev
pnpm --filter @remind/practice-reducer-actions test
```
