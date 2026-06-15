# Modal

## 언제 쓰나

Modal은 사용자가 지금 흐름을 멈추고 결정을 내려야 할 때 쓴다. 삭제 확인, 짧은 입력 폼, 세션 만료 안내처럼 페이지 뒤의 작업보다 앞선 판단이 필요할 때 맞다.

단순 안내라면 Modal보다 Toast나 화면 안의 메시지가 덜 방해된다. Modal을 열었다면 닫기 버튼, backdrop 클릭, Escape 키를 모두 닫기 경로로 제공한다.

`isOpen`은 화면을 여닫는 기준 상태다. Modal을 닫은 뒤에는 처음 열었던 trigger element로 focus를 돌려야 사용자가 흐름을 잃지 않는다.

## 바로 쓰는 코드

아래 예시는 닫기 버튼에 초기 focus를 주고, 닫힌 뒤 trigger button으로 focus를 되돌린다.

```tsx
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const closeModal = useCallback(() => {
    setIsOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        결제 수단 변경
      </button>

      {isOpen ? (
        <div className="backdrop" onClick={handleBackdropClick}>
          <section
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className="modal"
            role="dialog"
          >
            <h2 id={titleId}>결제 수단 변경</h2>
            <p id={descriptionId}>
              다음 결제부터 사용할 카드를 선택하세요.
            </p>

            <label htmlFor="card">카드</label>
            <select id="card" name="card" defaultValue="personal">
              <option value="personal">개인 카드</option>
              <option value="company">법인 카드</option>
            </select>

            <div className="actions">
              <button type="button" onClick={closeModal}>
                저장
              </button>
              <button ref={closeButtonRef} type="button" onClick={closeModal}>
                닫기
              </button>
            </div>
          </section>
        </div>
      ) : undefined}
    </>
  );
};
```

## 실수 포인트

- `isOpen`만 바꾸고 focus를 그대로 두면 닫힌 뒤 사용자의 위치가 사라진다.
- `keydown` listener를 cleanup하지 않으면 닫힌 Modal도 Escape 입력에 반응한다.
- `role="dialog"`만 넣고 제목을 `aria-labelledby`로 연결하지 않으면 스크린 리더가 Modal의 목적을 알기 어렵다.
- 설명 문장이 있다면 `aria-describedby`로 본문 설명과 Modal을 연결한다.
- backdrop 내부 콘텐츠 클릭까지 닫히지 않게 `event.target`과 `event.currentTarget`을 비교한다.
- 닫기 버튼을 숨기거나 빼면 pointer 사용자가 명확한 종료 경로를 찾기 어렵다.

## 참고

- [WAI-ARIA Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
