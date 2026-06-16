# Form Validation Errors

## 목표

제출 시 field별 에러를 만들고 첫 번째 invalid field로 focus를 옮긴다.

## 요구사항

- 빈 form을 제출하면 field별 에러 메시지가 보인다.
- invalid field에는 `aria-invalid="true"`가 적용된다.
- 에러 메시지 id는 해당 input의 `aria-describedby`와 연결된다.
- 제출 뒤 focus는 첫 번째 invalid field로 이동한다.
- 유효한 값으로 다시 제출하면 기존 에러가 사라진다.
- `validateForm` named export로 field별 에러 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-form-validation-errors dev
pnpm --filter @remind/practice-form-validation-errors test
```
