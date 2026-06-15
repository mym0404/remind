# Form Validation Errors

## 목표

제출 시 field별 에러를 만들고 첫 번째 invalid field로 focus를 옮긴다.

## 요구사항

- validation 함수를 컴포넌트 밖에 둔다.
- 에러 메시지와 입력을 aria-describedby로 연결한다.
- 첫 번째 invalid field에 focus를 보낸다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-form-validation-errors dev
pnpm --filter @remind/practice-form-validation-errors test
```
