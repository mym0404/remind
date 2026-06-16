# Controlled Fields

## 목표

여러 입력값을 하나의 form state object로 관리하는 controlled form을 완성한다.

이 practice는 React live-coding에서 자주 묻는 입력 동기화 문제를 작게 재현한다. 이름, 이메일, 역할, 약관 동의를 따로따로 state로 두지 않고 하나의 객체로 묶어 업데이트해야 한다.

## 요구사항

- `src/App.tsx`는 named export만 사용한다.
- `FormState`는 `name`, `email`, `role`, `terms`를 하나의 객체에 담는다.
- 이름 input은 `form.name`으로 제어하고, 입력하면 같은 state object의 `name`만 바뀐다.
- 이메일 input은 `form.email`로 제어하고, 입력하면 같은 state object의 `email`만 바뀐다.
- 역할 select는 `form.role`로 제어하고, 선택지는 `frontend`, `backend`, `designer`를 사용한다.
- 약관 checkbox는 `form.terms`로 제어하고, 체크 여부를 boolean으로 저장한다.
- 입력값이 바뀔 때마다 화면의 live preview가 즉시 바뀐다.
- 초기화 버튼을 누르면 네 필드와 preview가 모두 초기 상태로 돌아간다.

## 구현할 함수

- `formatPreview(form)`: 현재 form state를 preview 문자열로 바꾼다.
- `updateFormField(form, field, value)`: 기존 객체의 다른 필드는 유지하고 지정한 필드만 바꾼 새 객체를 반환한다.
- `resetForm(form)`: 초기 form state를 반환한다.

## 기대 동작

| 상태 | Preview |
| --- | --- |
| 모든 값이 비어 있고 약관 미동의 | `입력 대기` |
| 이름 `민지`, 이메일 `minji@example.com`, 역할 `backend`, 약관 동의 | `민지 / minji@example.com / backend / 약관 동의` |
| 이름과 이메일이 비어 있고 역할 `backend`, 약관 동의 | `이름 없음 / 이메일 없음 / backend / 약관 동의` |
| 약관 미동의 | 마지막 부분이 `약관 미동의` |

## 금지 사항

- `name`, `email`, `role`, `terms`를 각각 별도 `useState`로 분리하지 않는다.
- 테스트 문자열만 맞추기 위해 preview를 하드코딩하지 않는다.
- select와 checkbox를 uncontrolled input으로 두지 않는다.
- `default export`를 추가하지 않는다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-controlled-fields dev
pnpm --filter @remind/practice-controlled-fields test
```
