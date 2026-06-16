# Submit Reset Flow

## 목표

비동기 제출 중 중복 제출을 막고 성공 후 reset까지 한 흐름으로 처리한다.

## 요구사항

- 제출 중 submit button을 disabled 처리한다.
- 제출 중 중복 제출을 막는다.
- 성공 메시지를 보여준다.
- 성공한 제출은 입력값을 비운다.
- 실패한 제출은 입력값을 유지하고 실패 메시지를 보여준다.
- 초기화 버튼은 입력값과 상태 메시지를 함께 되돌린다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- `pnpm build`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 `submitMessage` helper를 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-submit-reset-flow dev
pnpm --filter @remind/practice-submit-reset-flow test
```
