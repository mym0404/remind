# ARIA / Keyboard Interaction

## 언제 쓰나

접근성은 native element로 먼저 해결한다. 클릭은 `button`, 입력은 `input`, 선택은 `select`, 대화 상자는 `dialog`처럼 브라우저가 이미 의미와 키보드 동작을 가진 요소를 우선한다.

ARIA는 native element만으로 의미를 충분히 전달하기 어려울 때 붙인다. ARIA는 이름, 상태, 관계를 보조 기술에 알려줄 뿐 키보드 동작을 대신 만들어주지 않는다.

보이는 이름이 있으면 `aria-labelledby`로 연결한다. 보이는 이름이 없을 때만 `aria-label`을 쓰고, 도움말이나 에러처럼 설명을 덧붙일 때는 `aria-describedby`를 쓴다.

열고 닫히는 UI는 trigger에 `aria-expanded`, `aria-controls`, `aria-haspopup`를 함께 둔다. 값이 여러 개 중 하나를 고르는 상태면 `aria-selected`, 켜짐과 꺼짐을 나타내면 `checked`나 `aria-checked`를 쓴다.

키보드 규칙은 사용자가 예상하는 방식과 맞춘다. Tab은 컴포넌트 사이를 이동하고, Arrow 키는 listbox, menu, tablist 같은 composite 안에서 항목을 이동한다.

Enter와 Space는 현재 항목을 실행하거나 선택할 때 쓴다. Escape는 열린 popover, menu, dialog를 닫을 때 쓴다.

## 바로 쓰는 코드

아래 예시는 listbox 안에서 roving `tabindex`를 쓴다. disabled item은 발견할 수 있어야 해서 `aria-disabled`로 남기고, 선택 동작만 막는다.

```tsx
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";

type ActionItem = {
  id: string;
  label: string;
  description: string;
  disabled?: boolean;
};

const actions: ActionItem[] = [
  { id: "share", label: "공유", description: "링크를 복사합니다." },
  {
    id: "archive",
    label: "보관",
    description: "읽기 목록으로 옮깁니다.",
    disabled: true,
  },
  { id: "delete", label: "삭제", description: "목록에서 제거합니다." },
];

const nextIndex = (currentIndex: number, step: 1 | -1) =>
  (currentIndex + step + actions.length) % actions.length;

export const ActionPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(actions[0].id);
  const [status, setStatus] = useState("");
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const titleId = useId();
  const helpId = useId();
  const listboxId = useId();

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  const closePicker = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const selectAction = (action: ActionItem) => {
    if (action.disabled) {
      setStatus(`${action.label}은 현재 사용할 수 없습니다.`);
      return;
    }

    setSelectedId(action.id);
    setStatus(`${action.label}을 선택했습니다.`);
    closePicker();
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(nextIndex(index, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(nextIndex(index, -1));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectAction(actions[index]);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closePicker();
    }
  };

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId}>작업 선택</h2>
      <p id={helpId}>목록이 열리면 위아래 화살표로 항목을 이동합니다.</p>

      <button
        ref={triggerRef}
        type="button"
        aria-describedby={helpId}
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((current) => !current)}
      >
        작업 열기
      </button>

      <p aria-live="polite">{status}</p>

      {isOpen ? (
        <div id={listboxId} role="listbox" aria-labelledby={titleId}>
          {actions.map((action, index) => {
            const optionId = `${listboxId}-${action.id}`;
            const descriptionId = `${optionId}-description`;

            return (
              <button
                id={optionId}
                key={action.id}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                className="picker-option"
                type="button"
                role="option"
                tabIndex={index === activeIndex ? 0 : -1}
                aria-selected={selectedId === action.id}
                aria-disabled={action.disabled}
                aria-describedby={descriptionId}
                onFocus={() => setActiveIndex(index)}
                onClick={() => selectAction(action)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                <span>{action.label}</span>
                <span id={descriptionId}>{action.description}</span>
              </button>
            );
          })}
        </div>
      ) : undefined}

      <label>
        <input
          type="checkbox"
          checked={saveAsDefault}
          onChange={({ target }) => setSaveAsDefault(target.checked)}
        />
        기본 작업으로 저장
      </label>
    </section>
  );
};
```

DOM focus를 항목마다 옮기기 어렵다면 `aria-activedescendant`를 쓴다. 이 패턴에서는 focus가 컨테이너에 남고, active item의 `id`만 바뀐다.

```tsx
import { KeyboardEvent, useId, useState } from "react";

export const ActivedescendantListbox = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(actions[0].id);
  const listboxId = useId();
  const activeItem = actions[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => nextIndex(current, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => nextIndex(current, -1));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!activeItem.disabled) {
        setSelectedId(activeItem.id);
      }
    }
  };

  return (
    <div
      id={listboxId}
      role="listbox"
      tabIndex={0}
      aria-label="작업"
      aria-activedescendant={`${listboxId}-${activeItem.id}`}
      onKeyDown={handleKeyDown}
    >
      {actions.map((action) => (
        <div
          id={`${listboxId}-${action.id}`}
          key={action.id}
          role="option"
          aria-selected={selectedId === action.id}
          aria-disabled={action.disabled}
        >
          {action.label}
        </div>
      ))}
    </div>
  );
};
```

```css
.picker-option:focus-visible,
[role="listbox"]:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

## 실수 포인트

- `div`에 `role="button"`을 붙이기보다 실제 `button`을 쓴다.
- `aria-label`로 보이는 label을 덮어쓰면 화면의 이름과 보조 기술의 이름이 달라질 수 있다.
- 도움말과 에러 메시지는 `aria-describedby`로 연결해야 입력 요소와 함께 읽힌다.
- `aria-expanded`만 바꾸고 `aria-controls`를 빼면 어떤 영역이 열렸는지 추적하기 어렵다.
- `aria-haspopup`는 실제로 열리는 UI의 종류에 맞춰 `menu`, `listbox`, `dialog` 같은 값으로 쓴다.
- 탭이나 옵션의 현재 선택은 `aria-selected`로 표현한다.
- 체크박스, 라디오, 스위치의 켜짐 상태는 native `checked`를 우선하고, custom widget에서만 `aria-checked`를 쓴다.
- `aria-disabled="true"`는 클릭과 키 입력을 막지 않으므로 handler에서 직접 막아야 한다.
- 실제 `disabled`는 form control을 비활성화하고 Tab 순서에서도 제외한다.
- Toast나 비동기 완료 메시지를 화면에만 추가하면 보조 기술이 변화를 놓칠 수 있다.
- Arrow 키 이동 중 Tab까지 가로채면 사용자가 컴포넌트 밖으로 나가기 어렵다.
- focus indicator를 없애면 키보드 사용자가 현재 위치를 알 수 없다.
- `aria-activedescendant`를 쓸 때 참조하는 `id`가 실제 DOM에 없으면 active item을 전달할 수 없다.

## 참고

- [WAI-ARIA Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
