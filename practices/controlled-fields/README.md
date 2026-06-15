# Controlled Fields

## 목표

여러 입력값을 하나의 form state로 묶고 DOM 문자열을 화면 경계에서 정리한다.

## 요구사항

- 이름, 이메일, 역할, 약관 동의를 하나의 state object로 관리한다.
- checkbox와 select도 controlled component로 다룬다.
- 입력값이 바뀔 때 미리보기 문장이 함께 갱신된다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-controlled-fields dev
pnpm --filter @remind/practice-controlled-fields test
```
