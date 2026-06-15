# Compound Component 패턴

## 언제 쓰나

Compound Component는 여러 컴포넌트가 하나의 기능을 함께 만들 때 쓴다. `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`처럼 쓰는 쪽에서 구조를 조립하고, 내부 상태는 Context로 공유한다.

Tabs, Accordion, Select, Dropdown처럼 하위 컴포넌트의 위치와 개수가 화면마다 달라질 수 있는 UI에 잘 맞는다. 부모가 모든 props를 대신 받아서 내려주기보다, 각 조각이 자기 역할에 필요한 props만 받게 만든다.

controlled API가 필요하면 `value`, `onValueChange`를 받고, 내부 상태만으로 충분하면 `defaultValue`를 받는다. 이 패턴을 처음부터 맞춰 두면 같은 컴포넌트를 간단한 화면과 복잡한 화면에서 함께 쓸 수 있다.

## 바로 쓰는 코드

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type TabsContextValue = {
  selectedValue: string;
  selectValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

type TabsRootProps = {
  onValueChange?: (value: string) => void;
  children: ReactNode;
} & (
  | { value: string; defaultValue?: string }
  | { value?: undefined; defaultValue: string }
);

const useTabs = () => {
  const context = useContext(TabsContext);

  if (context === undefined) {
    throw new Error("Tabs component must be used within Tabs.Root");
  }

  return context;
};

const TabsRoot = (props: TabsRootProps) => {
  const { onValueChange, children } = props;
  const initialValue =
    props.defaultValue !== undefined ? props.defaultValue : props.value;
  const [internalValue, setInternalValue] = useState(initialValue);
  const selectedValue = props.value ?? internalValue;
  const isControlled = props.value !== undefined;

  const selectValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue = useMemo(
    () => ({ selectedValue, selectValue }),
    [selectedValue, selectValue],
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};

const TabsList = ({
  children,
  ...divProps
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...divProps} role="tablist">
      {children}
    </div>
  );
};

type TabsTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "type" | "value"
> & {
  value: string;
};

const TabsTrigger = ({
  value,
  children,
  onClick,
  ...buttonProps
}: TabsTriggerProps) => {
  const { selectedValue, selectValue } = useTabs();
  const selected = selectedValue === value;

  return (
    <button
      {...buttonProps}
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          selectValue(value);
        }
      }}
    >
      {children}
    </button>
  );
};

type TabsContentProps = ComponentPropsWithoutRef<"section"> & {
  value: string;
};

const TabsContent = ({
  value,
  children,
  ...sectionProps
}: TabsContentProps) => {
  const { selectedValue } = useTabs();

  if (selectedValue !== value) {
    return null;
  }

  return (
    <section {...sectionProps} role="tabpanel">
      {children}
    </section>
  );
};

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

export const ProductTabs = () => {
  const [tab, setTab] = useState("overview");

  return (
    <Tabs.Root value={tab} onValueChange={setTab}>
      <Tabs.List aria-label="상품 정보">
        <Tabs.Trigger value="overview">개요</Tabs.Trigger>
        <Tabs.Trigger value="review">리뷰</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overview">
        <h2>상품 개요</h2>
        <p>상품의 핵심 정보를 보여준다.</p>
      </Tabs.Content>

      <Tabs.Content value="review">
        <h2>리뷰</h2>
        <p>구매자가 남긴 리뷰를 보여준다.</p>
      </Tabs.Content>
    </Tabs.Root>
  );
};
```

`ProductTabs`처럼 `value`와 `onValueChange`를 넘기면 controlled로 동작한다. 내부 상태만 필요하면 `value`와 `onValueChange`를 빼고 `defaultValue`만 넘긴다. `defaultValue`는 처음 선택값으로만 쓴다.

`Tabs.Trigger`와 `Tabs.Content`는 같은 Context를 읽는다. Trigger가 `selectValue`를 호출하면 Root의 상태가 바뀌고, Content는 자기 `value`가 현재 선택값과 같을 때만 렌더링된다.

`ComponentPropsWithoutRef<"button">`와 `ComponentPropsWithoutRef<"section">`를 섞으면 `className`, `disabled`, `aria-*` 같은 기본 props를 그대로 받을 수 있다. 컴포넌트가 새 옵션을 많이 만들지 않아도 조합 가능한 API가 된다.

Accordion도 같은 방식으로 설계한다. `Accordion.Root`가 열린 항목 값을 관리하고, `Accordion.Trigger`와 `Accordion.Content`가 Context를 읽는다. 여러 항목을 열 수 있어야 하면 `value`를 `string[]`으로 바꾸고, 한 항목만 열면 Tabs처럼 `string` 하나로 충분하다.

## 실수 포인트

- Compound Component는 컴포넌트 이름만 나눈다고 완성되지 않는다.
- Root 밖에서 하위 컴포넌트를 쓰면 바로 에러가 나게 만든다.
- 하위 컴포넌트끼리 props를 직접 주고받게 만들지 않는다.
- `value`가 있으면 controlled, 없으면 uncontrolled로 한 번만 판별한다.
- controlled 상태에서 내부 state를 화면 기준값으로 쓰지 않는다.
- `defaultValue` 변경을 현재 선택값 변경처럼 처리하지 않는다.
- `onValueChange`는 controlled와 uncontrolled 모두에서 호출한다.
- Trigger의 `onClick`을 덮어쓰지 말고 내부 변경과 함께 호출한다.
- 조합 가능한 props는 native element props를 재사용한다.
- Accordion처럼 같은 패턴을 쓰더라도 열림 규칙이 다르면 state 타입부터 다르게 잡는다.

## 참고

- [React useContext](https://react.dev/reference/react/useContext)
