# Reusable Notes Workspace

## 목표

노트 상태를 custom hook, reducer, localStorage로 분리한다.

현재 코드는 한 컴포넌트에 상태 로직이 모여 있다. 반복 가능한 hook과 reducer action으로 상태 전이를 명확하게 만들어야 한다.

## 요구사항

- `useLocalStorage` hook을 만들어 노트 목록을 저장하고 복원한다.
- `usePrevious` hook으로 직전 노트 개수를 화면에 보여준다.
- 노트 추가, 삭제, 고정 토글을 `useReducer`로 처리한다.
- reducer action은 discriminated union으로 정의한다.
- pinned 노트는 항상 일반 노트보다 위에 렌더링한다.
- Provider와 `useNotes` hook을 만들고, Provider 바깥 사용 시 에러를 던진다.
- Context value는 불필요한 리렌더링이 늘지 않도록 안정화한다.
- hook은 이 화면에만 묶이지 않도록 인자와 반환값을 일반적으로 설계한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- reducer에서 기존 배열이나 객체를 직접 mutate하지 않는다.
- `any`나 타입 우회 캐스팅을 쓰지 않는다.
- localStorage 값이 깨졌을 때 앱이 멈추지 않아야 한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-reusable-state-hooks dev
pnpm --filter @remind/practice-reusable-state-hooks test
```
