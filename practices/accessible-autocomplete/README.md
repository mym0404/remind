# Concept Autocomplete

## 목표

키보드와 보조기술 기준을 만족하는 autocomplete를 완성한다.

현재 코드는 input과 버튼 목록만 있다. combobox 역할, active option, 선택, 닫기, 바깥 클릭 처리를 추가해야 한다.

## 요구사항

- input에 `role="combobox"`를 적용한다.
- 추천 목록에는 `role="listbox"`를 적용한다.
- 추천 항목에는 `role="option"`을 적용한다.
- input과 listbox를 `aria-controls`로 연결한다.
- 현재 active item을 `aria-activedescendant`로 표현한다.
- ArrowDown, ArrowUp으로 active item을 이동한다.
- Enter로 active item을 선택한다.
- Escape로 목록을 닫는다.
- 바깥 클릭 시 목록을 닫는다.
- 선택된 값은 input value에 반영한다.
- 결과가 없을 때는 빈 상태를 보여준다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- 마우스 없이 검색과 선택을 끝낼 수 있어야 한다.
- focus를 불필요하게 list item으로 옮기지 않는다.
- ARIA id가 실제 DOM id와 일치해야 한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-accessible-autocomplete dev
pnpm --filter @remind/practice-accessible-autocomplete test
```
