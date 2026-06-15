# Virtualized List

## 언제 쓰나

리스트 item이 수천 개를 넘으면 모든 item을 한 번에 렌더링하지 않는다. DOM node가 너무 많아지면 첫 렌더링이 느려지고, 스크롤할 때 layout 계산도 무거워진다.

Virtualized list는 사용자가 보고 있는 범위만 렌더링한다. 전체 목록 높이는 placeholder로 유지하고, 현재 scroll offset으로 visible range를 계산한 뒤 그 범위의 visible item만 화면에 올린다.

item height가 고정이라면 계산이 단순하다. `scrollTop / itemHeight`로 시작 index를 구하고, viewport 높이와 item height로 끝 index를 구한다.

## 바로 쓰는 코드

아래 예시는 고정 높이 item만 다룬다. `totalHeight`는 전체 스크롤 높이를 만들고, `visibleMessages`만 실제 DOM에 렌더링한다.

```tsx
import { useMemo, useState } from "react";

type Message = {
  id: string;
  title: string;
  preview: string;
};

const itemHeight = 56;
const viewportHeight = 320;
const overscan = 3;

export const VirtualMessageList = ({ messages }: { messages: Message[] }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = messages.length * itemHeight;
  const visibleItemCount = Math.ceil(viewportHeight / itemHeight);
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - overscan,
  );
  const endIndex = Math.min(
    messages.length,
    startIndex + visibleItemCount + overscan * 2,
  );

  const visibleMessages = useMemo(
    () => messages.slice(startIndex, endIndex),
    [endIndex, messages, startIndex],
  );

  return (
    <div
      style={{ height: viewportHeight, overflowY: "auto" }}
      onScroll={(event) => {
        setScrollTop(event.currentTarget.scrollTop);
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <ul
          style={{
            left: 0,
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            right: 0,
            top: startIndex * itemHeight,
          }}
        >
          {visibleMessages.map((message) => (
            <li
              key={message.id}
              style={{
                boxSizing: "border-box",
                height: itemHeight,
                padding: "8px 12px",
              }}
            >
              <strong style={{ display: "block" }}>{message.title}</strong>
              <p style={{ margin: 0 }}>{message.preview}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

## 실수 포인트

- 모든 item을 `map`으로 렌더링하면 virtualization 효과가 없다.
- 전체 높이 placeholder를 만들지 않으면 스크롤바가 실제 목록 길이를 반영하지 못한다.
- `scrollTop`을 보지 않으면 사용자가 어느 범위를 보고 있는지 계산할 수 없다.
- 고정 item height 계산에서는 `Math.floor(scrollTop / itemHeight)`로 시작 index를 구한다.
- 끝 index는 viewport에 들어오는 item 수보다 조금 크게 잡아야 빠른 스크롤에서 빈틈이 덜 보인다.
- item height가 제각각이면 고정 높이 계산이 맞지 않는다.
- item height가 바뀌는 목록은 직접 계산보다 측정 기능이 있는 라이브러리를 쓰는 편이 안전하다.

## 참고

- [TanStack Virtual](https://tanstack.com/virtual/latest)
