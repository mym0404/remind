# Popover / Dropdown / Tooltip Positioning

## 언제 쓰나

Popover, Dropdown, Tooltip처럼 trigger element 옆에 작은 floating element를 띄울 때 쓴다. trigger와 floating element를 각각 `ref`로 잡고, `getBoundingClientRect()`로 현재 위치와 크기를 읽는다.

`getBoundingClientRect()`가 돌려주는 `top`, `left`, `right`, `bottom`은 viewport 기준 좌표다. `position: fixed`로 띄우면 이 값을 그대로 쓰고, `position: absolute`로 document 기준에 놓을 때는 `window.scrollX`, `window.scrollY`를 더한다.

floating element가 화면 밖으로 나가지 않게 하려면 clip rect를 먼저 정한다. 보통 viewport를 쓰지만, scroll container 안에서만 보여야 한다면 viewport와 scroll container의 겹치는 영역을 clip rect로 쓴다.

위치는 `top`, `bottom`, `left`, `right` placement로 계산한다. 원하는 방향에 공간이 부족하면 반대 방향으로 flip하고, 그래도 삐져나가면 clip rect 안으로 shift한다. trigger와 floating element 사이 간격은 offset으로 둔다.

stacking context가 복잡한 화면에서는 `z-index`만 올려도 해결되지 않을 수 있다. 이런 경우 floating element를 `body`에 portal로 렌더링하고 `position: fixed`를 쓰면 scroll container와 부모 stacking context의 영향을 줄이기 쉽다.

## 바로 쓰는 코드

아래 예시는 floating element를 `body`에 portal로 렌더링한다. 기본은 `position: fixed`지만, `strategy`를 `absolute`로 바꾸면 document 기준 좌표를 쓰도록 `scrollX/Y`를 더한다.

```tsx
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Placement = "top" | "bottom" | "left" | "right";
type PositionStrategy = "fixed" | "absolute";

type Rect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

type FloatingPosition = {
  top: number;
  left: number;
  placement: Placement;
};

const OFFSET = 8;
const PREFERRED_PLACEMENT: Placement = "bottom";
const STRATEGY: PositionStrategy = "fixed";

const oppositePlacement: Record<Placement, Placement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const toRect = (rect: DOMRect): Rect => ({
  top: rect.top,
  right: rect.right,
  bottom: rect.bottom,
  left: rect.left,
  width: rect.width,
  height: rect.height,
});

const getScrollOffset = () => ({
  top: window.scrollY,
  left: window.scrollX,
});

const getBoundedClipRect = (scrollContainer?: HTMLElement): Rect => {
  const viewportRect: Rect = {
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  if (scrollContainer === undefined) {
    return viewportRect;
  }

  const containerRect = toRect(scrollContainer.getBoundingClientRect());
  const top = Math.max(viewportRect.top, containerRect.top);
  const right = Math.min(viewportRect.right, containerRect.right);
  const bottom = Math.min(viewportRect.bottom, containerRect.bottom);
  const left = Math.max(viewportRect.left, containerRect.left);

  return {
    top,
    right,
    bottom,
    left,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  };
};

const getBasePosition = ({
  placement,
  triggerRect,
  floatingRect,
  offset,
}: {
  placement: Placement;
  triggerRect: Rect;
  floatingRect: Rect;
  offset: number;
}) => {
  if (placement === "top") {
    return {
      top: triggerRect.top - floatingRect.height - offset,
      left: triggerRect.left + (triggerRect.width - floatingRect.width) / 2,
    };
  }

  if (placement === "bottom") {
    return {
      top: triggerRect.bottom + offset,
      left: triggerRect.left + (triggerRect.width - floatingRect.width) / 2,
    };
  }

  if (placement === "left") {
    return {
      top: triggerRect.top + (triggerRect.height - floatingRect.height) / 2,
      left: triggerRect.left - floatingRect.width - offset,
    };
  }

  return {
    top: triggerRect.top + (triggerRect.height - floatingRect.height) / 2,
    left: triggerRect.right + offset,
  };
};

const isInsideClipRect = ({
  top,
  left,
  floatingRect,
  clipRect,
}: {
  top: number;
  left: number;
  floatingRect: Rect;
  clipRect: Rect;
}) => {
  return (
    top >= clipRect.top &&
    left >= clipRect.left &&
    top + floatingRect.height <= clipRect.bottom &&
    left + floatingRect.width <= clipRect.right
  );
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), Math.max(min, max));
};

const shiftIntoClipRect = ({
  top,
  left,
  floatingRect,
  clipRect,
}: {
  top: number;
  left: number;
  floatingRect: Rect;
  clipRect: Rect;
}) => ({
  top: clamp(top, clipRect.top, clipRect.bottom - floatingRect.height),
  left: clamp(left, clipRect.left, clipRect.right - floatingRect.width),
});

const computeFloatingPosition = ({
  preferredPlacement,
  triggerRect,
  floatingRect,
  clipRect,
  offset,
  strategy,
}: {
  preferredPlacement: Placement;
  triggerRect: Rect;
  floatingRect: Rect;
  clipRect: Rect;
  offset: number;
  strategy: PositionStrategy;
}): FloatingPosition => {
  const placements = [
    preferredPlacement,
    oppositePlacement[preferredPlacement],
  ];

  const placement =
    placements.find((nextPlacement) => {
      const basePosition = getBasePosition({
        placement: nextPlacement,
        triggerRect,
        floatingRect,
        offset,
      });

      return isInsideClipRect({
        ...basePosition,
        floatingRect,
        clipRect,
      });
    }) ?? preferredPlacement;

  const shiftedPosition = shiftIntoClipRect({
    ...getBasePosition({
      placement,
      triggerRect,
      floatingRect,
      offset,
    }),
    floatingRect,
    clipRect,
  });

  const scrollOffset =
    strategy === "absolute" ? getScrollOffset() : { top: 0, left: 0 };

  return {
    top: shiftedPosition.top + scrollOffset.top,
    left: shiftedPosition.left + scrollOffset.left,
    placement,
  };
};

export const PopoverPositionExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<FloatingPosition>();
  const [portalRoot, setPortalRoot] = useState<HTMLElement>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const updatePosition = useCallback(() => {
    if (!isOpen) {
      return;
    }

    const triggerElement = triggerRef.current;
    const floatingElement = floatingRef.current;

    if (triggerElement === null) {
      setIsOpen(false);
      setPosition(undefined);
      return;
    }

    if (floatingElement === null) {
      return;
    }

    const clipRect = getBoundedClipRect(
      scrollContainerRef.current ?? undefined,
    );

    setPosition(
      computeFloatingPosition({
        preferredPlacement: PREFERRED_PLACEMENT,
        triggerRect: toRect(triggerElement.getBoundingClientRect()),
        floatingRect: toRect(floatingElement.getBoundingClientRect()),
        clipRect,
        offset: OFFSET,
        strategy: STRATEGY,
      }),
    );
  }, [isOpen]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  return (
    <div ref={scrollContainerRef} className="scroll-area">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        필터
      </button>

      {isOpen && portalRoot !== undefined
        ? createPortal(
            <div
              ref={floatingRef}
              className="popover"
              data-placement={position?.placement}
              style={{
                position: STRATEGY,
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                visibility: position === undefined ? "hidden" : "visible",
                zIndex: 1000,
              }}
            >
              <button type="button">최신순</button>
              <button type="button">인기순</button>
            </div>,
            portalRoot,
          )
        : undefined}
    </div>
  );
};
```

## 실수 포인트

- `getBoundingClientRect()` 값을 document 좌표로 착각하면 scroll 후 위치가 밀린다.
- `position: fixed`인데 `scrollX/Y`를 더하면 스크롤한 만큼 floating element가 어긋난다.
- `position: absolute`로 `body` 기준에 놓으면서 `scrollX/Y`를 더하지 않으면 document scroll 위치를 반영하지 못한다.
- scroll container를 무시하고 viewport만 clip rect로 쓰면 container 밖으로 튀어나온 메뉴가 보일 수 있다.
- placement만 계산하고 flip을 하지 않으면 아래 공간이 부족한 trigger에서 메뉴가 화면 밖으로 나간다.
- flip 후에도 shift를 하지 않으면 좌우 끝에 가까운 trigger에서 일부가 잘린다.
- scroll이나 resize 때 위치를 다시 계산하지 않으면 trigger와 floating element가 분리되어 보인다.
- 부모에 `transform`, `opacity`, `isolation` 같은 stacking context가 있으면 `z-index`만으로는 floating element가 위로 올라오지 않을 수 있다.
- trigger가 조건부 렌더링으로 사라졌는데 floating element를 열어 두면 기준점 없는 UI가 남는다.

## 참고

- [MDN getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
