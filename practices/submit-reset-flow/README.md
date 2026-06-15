# Submit Reset Flow

## 목표

비동기 제출 중 중복 제출을 막고 성공 후 reset까지 한 흐름으로 처리한다.

## 요구사항

- 제출 중 submit button을 disabled 처리한다.
- 성공 메시지를 보여준다.
- 초기화 버튼은 입력값과 상태 메시지를 함께 되돌린다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-submit-reset-flow dev
pnpm --filter @remind/practice-submit-reset-flow test
```
