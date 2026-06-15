# Controlled / Uncontrolled 조합

## 언제 쓰나

재사용 컴포넌트가 바깥 state로도 움직이고, 자체 state로도 움직여야 할 때 쓴다. Form input, Tabs, Accordion, Modal처럼 값이나 열림 상태를 외부에서 제어할 수도 있고 컴포넌트 안에서만 관리할 수도 있는 경우다.

`value`가 있으면 controlled로 보고, `defaultValue`는 uncontrolled의 초기값으로만 쓴다. Modal도 같은 규칙으로 `open`, `defaultOpen`, `onOpenChange`를 둔다.

핵심은 상태의 주인을 하나로 정하는 것이다. controlled일 때는 내부 state를 바꾸지 않고 callback만 호출한다. uncontrolled일 때만 내부 state를 바꾼다.

## 바로 쓰는 코드

```tsx
import { useState, type ReactNode } from "react";

const useControllableState = <Value,>({
  value,
  defaultValue,
  onChange,
}: {
  value: Value | undefined;
  defaultValue: Value;
  onChange?: (nextValue: Value) => void;
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const setValue = (nextValue: Value) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return { value: currentValue, setValue };
};

type ControlledTextInputProps = {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: never;
};

type UncontrolledTextInputProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: undefined;
};

type TextInputProps = ControlledTextInputProps | UncontrolledTextInputProps;

const TextInput = ({
  value,
  defaultValue = "",
  onChange,
}: TextInputProps) => {
  const input = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  return (
    <input
      value={input.value}
      onChange={(event) => input.setValue(event.target.value)}
    />
  );
};

type ControlledModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOpen?: never;
  children: ReactNode;
};

type UncontrolledModalProps = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: undefined;
  children: ReactNode;
};

type ModalProps = ControlledModalProps | UncontrolledModalProps;

const Modal = ({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalProps) => {
  const modal = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <>
      <button type="button" onClick={() => modal.setValue(true)}>
        설정 열기
      </button>

      {modal.value ? (
        <section aria-modal="true" role="dialog">
          {children}
          <button type="button" onClick={() => modal.setValue(false)}>
            닫기
          </button>
        </section>
      ) : undefined}
    </>
  );
};

export const SettingsExample = () => {
  const [name, setName] = useState("민지");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <label>
        이름
        <TextInput value={name} onChange={setName} />
      </label>

      <label>
        메모
        <TextInput
          defaultValue="다음 회의에서 확인"
          onChange={(nextMemo) => console.log(nextMemo)}
        />
      </label>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <p>알림 설정을 변경합니다.</p>
      </Modal>
    </>
  );
};
```

## 실수 포인트

- `value`와 `defaultValue`를 함께 받으면 controlled인지 헷갈린다.
- controlled input에 `value`만 넘기고 `onChange`를 빼면 사용자가 입력해도 값이 바뀌지 않는다.
- `value`의 초기값을 `undefined`로 두었다가 문자열로 바꾸면 controlled 여부가 중간에 바뀐다.
- 빈 문자열도 유효한 controlled 값이다. 값이 없을 수 있으면 `value={name ?? ""}`처럼 문자열을 유지한다.
- Modal도 `open`이 있으면 controlled다. 닫기 버튼은 내부 state를 직접 닫지 말고 `onOpenChange(false)` 흐름을 타야 한다.
- uncontrolled에서 `defaultValue`나 `defaultOpen`을 나중에 바꿔도 현재 값은 바뀌지 않는다.
- controlled 여부는 `Boolean(value)`가 아니라 `value !== undefined`로 판별한다.

## 참고

- [React controlled input](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
