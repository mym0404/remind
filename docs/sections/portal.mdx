# Portal

## 언제 쓰나

Portal은 컴포넌트의 React tree 위치는 유지하면서 실제 DOM 위치만 다른 곳으로 옮길 때 쓴다. Modal, toast, dropdown처럼 화면 위에 떠야 하는 UI가 부모의 `overflow`, `transform`, stacking context에 막힐 때 맞다.

`createPortal(children, domNode)`은 `children`을 지정한 DOM node 아래에 렌더링한다. 그래서 부모 DOM 밖으로 빠져나가지만 Context와 state 흐름은 그대로 유지된다.

Portal은 z-index 값을 무작정 키우는 방법이 아니다. 레이어 UI를 `document.body` 아래 같은 위치로 모아 z-index 경쟁 범위를 줄이고, 잘리는 문제를 완화하는 방법이다.

## 바로 쓰는 코드

아래 예시는 Portal 대상 DOM node가 있으면 재사용하고, 없으면 `document.body` 아래에 만든다. 첫 렌더처럼 아직 대상 node가 없을 때는 `null`을 반환해 `createPortal`을 호출하지 않는다.

```tsx
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

const PORTAL_ROOT_ID = "portal-root";

const usePortalTarget = (targetId: string) => {
  const [target, setTarget] = useState<HTMLElement>();

  useEffect(() => {
    const existingTarget = document.getElementById(targetId);

    if (existingTarget) {
      setTarget(existingTarget);
      return;
    }

    const createdTarget = document.createElement("div");
    createdTarget.id = targetId;
    document.body.appendChild(createdTarget);
    setTarget(createdTarget);

    return () => {
      createdTarget.remove();
    };
  }, [targetId]);

  return target;
};

const Portal = ({
  children,
  targetId = PORTAL_ROOT_ID,
}: {
  children: ReactNode;
  targetId?: string;
}) => {
  const target = usePortalTarget(targetId);

  if (target === undefined) {
    return null;
  }

  return createPortal(children, target);
};

export const PortalModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const stopDialogClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        초대하기
      </button>

      {isOpen ? (
        <Portal>
          <div className="modal-backdrop" onClick={handleBackdropClick}>
            <section
              aria-labelledby="invite-title"
              aria-modal="true"
              className="modal"
              onClick={stopDialogClick}
              role="dialog"
            >
              <h2 id="invite-title">팀원 초대</h2>
              <p>초대할 팀원의 이메일을 입력하세요.</p>
              <label htmlFor="invite-email">이메일</label>
              <input id="invite-email" name="email" type="email" />
              <button type="button" onClick={closeModal}>
                닫기
              </button>
            </section>
          </div>
        </Portal>
      ) : undefined}
    </>
  );
};
```

Dropdown도 같은 방식으로 floating element만 Portal로 보낼 수 있다. 이때 trigger 위치 계산은 `getBoundingClientRect()` 같은 값으로 따로 처리한다.

## 실수 포인트

- Portal 대상 DOM node가 없는 상태에서 `createPortal`을 호출하면 렌더링할 위치가 없다.
- 대상 node가 앱 HTML에 없다면 mount 후 직접 만들거나, 준비되기 전에는 `null`로 fallback 처리한다.
- Portal 내부 click event는 DOM tree가 아니라 React tree 기준으로 부모에 bubble된다.
- Portal 안쪽 클릭이 상위 `onClick`을 건드리면 내부에서 `event.stopPropagation()`을 호출하거나 Portal을 React tree의 더 위로 옮긴다.
- Portal만으로 focus trap, Escape 닫기, 스크롤 잠금이 자동으로 생기지 않는다.
- z-index가 계속 꼬이면 Portal root를 여러 곳에 만들기보다 레이어를 모을 위치를 하나로 정한다.

## 참고

- [React createPortal](https://react.dev/reference/react-dom/createPortal)
