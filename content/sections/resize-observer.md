# ResizeObserver

## 언제 쓰나

element 자체의 크기가 바뀔 때 화면 상태를 맞춰야 하면 `ResizeObserver`를 쓴다. viewport 크기만 보면 부족한 경우다. 사이드바 접힘, 글꼴 로딩, 이미지 로딩, 부모 container 너비 변화처럼 window resize 없이 element 크기가 바뀔 수 있다.

floating UI에도 자주 쓴다. trigger나 floating element의 크기가 바뀌면 `getBoundingClientRect()`로 한 번 계산한 위치가 바로 틀어진다. 이때 크기 변화를 감지해서 top, left, placement를 다시 계산한다.

container query처럼 layout state가 필요할 때도 쓸 수 있다. 단, observer callback마다 `setState`를 호출하면 렌더링이 과하게 늘어난다. 이전 크기와 비교하고, DOM read와 state update를 분리한다.

## 바로 쓰는 코드

```tsx
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

type Size = {
  height: number;
  width: number;
};

type LayoutMode = "compact" | "regular";

const emptySize: Size = {
  height: 0,
  width: 0,
};

const isSameSize = (left: Size, right: Size) =>
  left.width === right.width && left.height === right.height;

const readBoxSize = (entry: ResizeObserverEntry): Size => {
  const borderBox = entry.borderBoxSize?.[0];

  if (borderBox) {
    return {
      height: borderBox.blockSize,
      width: borderBox.inlineSize,
    };
  }

  return {
    height: entry.contentRect.height,
    width: entry.contentRect.width,
  };
};

const getLayoutMode = (width: number): LayoutMode => {
  return width < 480 ? "compact" : "regular";
};

const getFloatingStyle = ({
  panelSize,
  triggerSize,
}: {
  panelSize: Size;
  triggerSize: Size;
}): CSSProperties => {
  return {
    left: Math.max(0, triggerSize.width - panelSize.width),
    position: "absolute",
    top: triggerSize.height + 8,
  };
};

export const useElementSize = <T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  size: Size;
} => {
  const ref = useRef<T | null>(null);
  const lastSizeRef = useRef<Size>(emptySize);
  const frameIdRef = useRef<number | undefined>(undefined);
  const [size, setSize] = useState<Size>(emptySize);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      const nextSize = readBoxSize(entry);

      if (isSameSize(lastSizeRef.current, nextSize)) {
        return;
      }

      if (frameIdRef.current !== undefined) {
        window.cancelAnimationFrame(frameIdRef.current);
      }

      frameIdRef.current = window.requestAnimationFrame(() => {
        lastSizeRef.current = nextSize;
        setSize(nextSize);
        frameIdRef.current = undefined;
      });
    });

    observer.observe(element, { box: "border-box" });

    return () => {
      observer.disconnect();

      if (frameIdRef.current !== undefined) {
        window.cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = undefined;
      }
    };
  }, []);

  return { ref, size };
};

type ToolbarMenuProps = {
  items: string[];
};

export const ToolbarMenu = ({ items }: ToolbarMenuProps) => {
  const { ref: containerRef, size: containerSize } =
    useElementSize<HTMLDivElement>();
  const { ref: triggerRef, size: triggerSize } =
    useElementSize<HTMLButtonElement>();
  const { ref: panelRef, size: panelSize } =
    useElementSize<HTMLUListElement>();
  const layoutModeRef = useRef<LayoutMode>("compact");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(
    layoutModeRef.current,
  );

  useEffect(() => {
    const nextLayoutMode = getLayoutMode(containerSize.width);

    if (layoutModeRef.current === nextLayoutMode) {
      return;
    }

    layoutModeRef.current = nextLayoutMode;
    setLayoutMode(nextLayoutMode);
  }, [containerSize.width]);

  return (
    <div
      ref={containerRef}
      data-layout={layoutMode}
      style={{ position: "relative" }}
    >
      <button ref={triggerRef} type="button">
        메뉴
      </button>

      <ul ref={panelRef} style={getFloatingStyle({ panelSize, triggerSize })}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

## 실수 포인트

- window resize만 듣고 element 크기 변화를 놓치면 container 안에서 layout state가 늦게 바뀐다.
- observer callback에서 매번 `setState`를 호출하면 같은 크기에도 렌더링이 반복된다.
- `contentRect`는 content box 기준이다. border와 padding까지 포함한 크기가 필요하면 `borderBoxSize`를 먼저 본다.
- observer callback 안에서 DOM을 읽고 바로 style을 쓰면 ResizeObserver loop가 생길 수 있다.
- DOM read는 `ResizeObserverEntry`에서 끝내고, state update나 style 계산은 `requestAnimationFrame` 이후 렌더링 흐름으로 넘긴다.
- trigger나 floating element 크기가 바뀌는데 위치를 다시 계산하지 않으면 메뉴가 기준점에서 밀린다.
- cleanup에서 `disconnect()`를 호출하지 않으면 unmount된 element를 계속 관찰할 수 있다.
- 예약한 `requestAnimationFrame`도 cleanup에서 취소해야 unmount 뒤 state update를 피할 수 있다.

## 참고

- [MDN ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
