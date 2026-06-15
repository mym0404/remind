# Focus Trap

## 언제 쓰나

Focus Trap은 modal처럼 사용자가 열린 영역을 먼저 처리해야 할 때 쓴다. Tab focus가 화면 뒤로 빠지지 않게 막고, 열린 영역 안에서만 움직이게 만든다.

열릴 때는 닫기 버튼이나 첫 입력값처럼 바로 쓸 수 있는 요소로 focus를 옮긴다. 닫힐 때는 열기 전에 focus가 있던 요소로 되돌린다.

focus 대상은 selector로 후보를 모은 뒤 다시 걸러낸다. `disabled`, `hidden`, `aria-hidden`, `display: none`, `visibility: hidden` 상태인 요소는 Tab 순서에서 제외한다.

## 바로 쓰는 코드

```tsx
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const focusableSelector = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]",
].join(",");

const isVisible = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    element.getClientRects().length > 0
  );
};

const isFocusable = (element: HTMLElement) =>
  element.matches(focusableSelector) &&
  !element.closest("[hidden], [inert], [aria-hidden='true']") &&
  !element.matches(":disabled") &&
  isVisible(element);

const getTabbableElements = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>(focusableSelector)].filter(
    (element) => isFocusable(element) && element.tabIndex >= 0,
  );

const getActiveElement = () => {
  const element = document.activeElement;

  if (!(element instanceof HTMLElement) || element === document.body) {
    return undefined;
  }

  return element;
};

type FocusTrapOptions = {
  isActive: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
};

export const useFocusTrap = ({
  isActive,
  containerRef,
  initialFocusRef,
}: FocusTrapOptions) => {
  const previousFocusRef = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    previousFocusRef.current = getActiveElement();

    const tabbableElements = getTabbableElements(container);
    const initialFocusElement =
      initialFocusRef?.current && isFocusable(initialFocusRef.current)
        ? initialFocusRef.current
        : tabbableElements[0] ?? container;

    initialFocusElement.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const currentTabbableElements = getTabbableElements(container);

      if (currentTabbableElements.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = currentTabbableElements[0];
      const lastElement =
        currentTabbableElements[currentTabbableElements.length - 1];
      const activeElement = getActiveElement();
      const isFocusOutside =
        !activeElement || !container.contains(activeElement);

      if (event.shiftKey) {
        if (activeElement === firstElement || isFocusOutside) {
          event.preventDefault();
          lastElement.focus();
        }

        return;
      }

      if (activeElement === lastElement || isFocusOutside) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [containerRef, initialFocusRef, isActive]);
};

export const FocusTrapExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap({
    isActive: isOpen,
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
  });

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        배송지 선택
      </button>

      {isOpen ? (
        <div className="backdrop">
          <section
            ref={dialogRef}
            aria-labelledby="delivery-title"
            aria-modal="true"
            className="dialog"
            role="dialog"
            tabIndex={-1}
          >
            <h2 id="delivery-title">배송지 선택</h2>

            <button type="button">집</button>
            <button type="button">회사</button>
            <button type="button" disabled>
              임시 저장된 배송지
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          </section>
        </div>
      ) : undefined}
    </>
  );
};
```

## 실수 포인트

- focusable selector는 후보를 모으는 용도다. 실제 Tab 순서는 보이는 상태와 `tabIndex`를 다시 확인해 계산한다.
- focusable element를 처음 한 번만 계산하면, 나중에 `disabled`가 된 요소가 Tab 순서에 남을 수 있다.
- `disabled`나 `hidden` 요소를 빼지 않으면 focus할 수 없는 요소를 기준으로 순환을 계산한다.
- open 시 focus를 옮기지 않으면 keyboard 사용자가 열린 영역의 시작점을 직접 찾아야 한다.
- 마지막 요소에서 Tab을 누르면 첫 요소로 보내야 한다.
- 첫 요소에서 Shift+Tab을 누르면 마지막 요소로 보내야 한다.
- close 후 이전 focus로 복귀하지 않으면 사용자가 닫기 전 위치를 잃는다.
- focus할 요소가 없을 수 있으므로 container에 `tabIndex={-1}`을 둔다.

## 참고

- [MDN HTMLElement focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
