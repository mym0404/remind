# Form Validation Errors

## 목표

제출 시 field별 에러를 만들고 첫 번째 invalid field로 focus를 옮긴다.

## 요구사항

- `validateForm`을 컴포넌트 밖에서 named export로 구현한다.
- 제출 시 field별 에러 메시지를 보여준다.
- invalid field에는 `aria-invalid="true"`를 적용한다.
- 에러 메시지와 입력을 `aria-describedby`로 연결한다.
- 제출 시 첫 번째 invalid field에 focus를 보낸다.
- 유효한 값으로 다시 제출하면 기존 에러를 제거한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작, 접근성 속성, 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-form-validation-errors dev
pnpm --filter @remind/practice-form-validation-errors test
```
