# MutationObserver

## 언제 쓰나

`MutationObserver`는 DOM node가 추가되거나 제거되는 순간, 또는 `class`, `style`, `aria-*`, `data-*` 같은 attribute가 바뀌는 순간을 감지할 때 쓴다. React state로 DOM을 만들고 있다면 state를 기준으로 처리하는 편이 먼저다.

필요한 경우는 DOM 변화의 출처가 React 바깥에 있을 때다. 외부 라이브러리가 내부 DOM을 직접 바꾸거나, portal로 렌더링된 요소가 현재 컴포넌트 밖에서 붙고 떨어질 때가 여기에 해당한다.

Popover나 Dropdown은 trigger 주변 DOM이 바뀌면 위치가 어긋날 수 있다. 이때 변경을 감지한 뒤 `getBoundingClientRect()`로 위치를 다시 계산한다.

옵션은 좁게 켠다.

- `childList`는 자식 node 추가와 제거를 감지한다.
- `attributes`는 attribute 변경을 감지한다.
- `subtree`는 하위 DOM 전체까지 감지 범위를 넓힌다.

## 바로 쓰는 코드

아래 예시는 외부 라이브러리나 portal 영역의 DOM이 바뀌면 floating panel 위치를 다시 계산한다.

```tsx
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

type FloatingPosition = {
  left: number;
  top: number;
  width: number;
};

type UseMutationRepositionArgs = {
  enabled: boolean;
  floatingRef: RefObject<HTMLElement | null>;
  observeRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
};

const mutationOptions: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

const getFloatingPosition = ({
  floatingRef,
  triggerRef,
}: Pick<UseMutationRepositionArgs, "floatingRef" | "triggerRef">) => {
  const trigger = triggerRef.current;
  const floating = floatingRef.current;

  if (!trigger || !floating) {
    return undefined;
  }

  const triggerRect = trigger.getBoundingClientRect();

  return {
    left: triggerRect.left + window.scrollX,
    top: triggerRect.bottom + window.scrollY + 8,
    width: triggerRect.width,
  };
};

const isSamePosition = (
  left: FloatingPosition | undefined,
  right: FloatingPosition | undefined,
) =>
  left?.left === right?.left &&
  left?.top === right?.top &&
  left?.width === right?.width;

const toFloatingStyle = (
  position: FloatingPosition | undefined,
): CSSProperties => ({
  left: position?.left ?? 0,
  minWidth: position?.width ?? 0,
  position: "absolute",
  top: position?.top ?? 0,
  visibility: position ? "visible" : "hidden",
});

const useMutationReposition = ({
  enabled,
  floatingRef,
  observeRef,
  triggerRef,
}: UseMutationRepositionArgs) => {
  const [position, setPosition] = useState<FloatingPosition>();

  const updatePosition = useCallback(() => {
    const nextPosition = getFloatingPosition({ floatingRef, triggerRef });

    setPosition((currentPosition) =>
      isSamePosition(currentPosition, nextPosition)
        ? currentPosition
        : nextPosition,
    );
  }, [floatingRef, triggerRef]);

  useLayoutEffect(() => {
    if (enabled) {
      updatePosition();
    }
  }, [enabled, updatePosition]);

  useEffect(() => {
    const observeTarget = observeRef.current;

    if (!enabled || !observeTarget) {
      return;
    }

    let frameId: number | undefined;

    const scheduleUpdate = () => {
      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updatePosition);
    };

    const observer = new MutationObserver((records) => {
      const shouldUpdate = records.some(
        (record) => record.type === "childList" || record.type === "attributes",
      );

      if (shouldUpdate) {
        scheduleUpdate();
      }
    });

    observer.observe(observeTarget, mutationOptions);
    scheduleUpdate();

    return () => {
      observer.disconnect();

      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enabled, observeRef, updatePosition]);

  return toFloatingStyle(position);
};

export const FilterPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const floatingStyle = useMutationReposition({
    enabled: isOpen,
    floatingRef,
    observeRef: rootRef,
    triggerRef,
  });

  return (
    <section ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        필터
      </button>

      {isOpen ? (
        <div ref={floatingRef} style={floatingStyle}>
          <button type="button">오늘</button>
          <button type="button">이번 주</button>
          <div data-external-widget="" />
        </div>
      ) : undefined}
    </section>
  );
};
```

## 실수 포인트

- React state로 렌더링한 DOM 변화라면 observer보다 state 변화 지점을 기준으로 처리한다.
- `document.body` 전체를 `subtree: true`로 감시하면 작은 DOM 변화에도 callback이 자주 돈다.
- `attributes`를 켜면 `style` 변경도 감지되므로 같은 위치면 state를 다시 바꾸지 않는다.
- observer callback 안에서 바로 여러 번 `setState`하지 말고 `requestAnimationFrame`으로 묶어 위치를 다시 계산한다.
- `childList`만 켜면 `class`나 `style` 변경은 감지하지 못한다.
- `subtree`를 빼면 대상 node의 깊은 하위에서 생긴 portal 내부 변화는 놓칠 수 있다.
- cleanup에서 `disconnect()`를 호출하지 않으면 unmount된 컴포넌트도 DOM 변화를 계속 받는다.

## 참고

- [MDN MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
