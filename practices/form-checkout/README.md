# Checkout Form

## 목표

주문 폼을 실제 제출 흐름처럼 완성한다.

현재 코드는 controlled input만 연결되어 있다. validation, field error, 제출 중 상태, reset 처리를 추가해야 한다.

## 요구사항

- 이름, 이메일, 수량, 배송 방식, 요청 사항, 약관 동의를 하나의 form state로 관리한다.
- 수량은 DOM string을 숫자로 변환해 검증한다.
- 제출 시 `preventDefault()`를 호출한다.
- validation 로직은 컴포넌트 밖 함수로 분리한다.
- field별 error object를 만들고 input과 error를 `aria-describedby`로 연결한다.
- invalid field에는 `aria-invalid`를 적용한다.
- validation 실패 시 첫 번째 invalid field로 focus를 이동한다.
- 제출 중에는 submit button을 disabled 처리한다.
- 성공 후 `민지님의 택배 주문 3건을 접수했습니다.` 같은 완료 메시지를 보여준다.
- 초기화 버튼은 form과 상태 메시지를 처음 상태로 되돌린다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- TypeScript 타입 우회 없이 event와 form model 타입을 작성한다.
- placeholder를 label 대신 쓰지 않는다.
- `button type="submit"`과 `button type="button"`을 구분한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-form-checkout dev
pnpm --filter @remind/practice-form-checkout test
```
