# Form 접근성

## 언제 쓰나

폼은 입력값을 받는 순간부터 접근성을 챙겨야 한다. 사용자가 무엇을 입력해야 하는지 알고, 오류가 난 필드로 바로 이동할 수 있어야 한다.

각 필드는 보이는 `label`을 가진다. `label`의 `htmlFor`와 입력 요소의 `id`를 맞추고, `placeholder`를 label 대신 쓰지 않는다.

필수값은 `required`로 표시한다. 에러 메시지는 `id`를 붙인 뒤 `aria-describedby`로 입력 요소와 연결하고, 에러 상태는 `aria-invalid`로 드러낸다.

## 바로 쓰는 코드

```tsx
import { FormEvent, useRef, useState } from "react";

type FormValues = {
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  email: "",
  message: "",
};

const describedBy = (ids: (string | undefined)[]) =>
  ids.filter((id): id is string => Boolean(id)).join(" ") || undefined;

const validate = (values: FormValues) => {
  const nextErrors: FormErrors = {};

  if (!values.email.trim()) {
    nextErrors.email = "이메일을 입력하세요.";
  } else if (!values.email.includes("@")) {
    nextErrors.email = "이메일 형식을 확인하세요.";
  }

  if (!values.message.trim()) {
    nextErrors.message = "문의 내용을 입력하세요.";
  }

  return nextErrors;
};

export const ContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const focusFirstInvalidField = (nextErrors: FormErrors) => {
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }

    if (nextErrors.message) {
      messageRef.current?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalidField(nextErrors);
      return;
    }

    console.log("submit", values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    emailRef.current?.focus();
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-email">이메일</label>
        <input
          id="contact-email"
          ref={emailRef}
          type="email"
          value={values.email}
          onChange={({ target }) =>
            setValues((current) => ({ ...current, email: target.value }))
          }
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy([
            "contact-email-help",
            errors.email ? "contact-email-error" : undefined,
          ])}
        />
        <p id="contact-email-help">답변을 받을 이메일을 입력하세요.</p>
        {errors.email ? (
          <p id="contact-email-error">{errors.email}</p>
        ) : undefined}
      </div>

      <div>
        <label htmlFor="contact-message">문의 내용</label>
        <textarea
          id="contact-message"
          ref={messageRef}
          value={values.message}
          onChange={({ target }) =>
            setValues((current) => ({ ...current, message: target.value }))
          }
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error">{errors.message}</p>
        ) : undefined}
      </div>

      <button type="button" onClick={handleReset}>
        초기화
      </button>
      <button type="submit">보내기</button>
    </form>
  );
};
```

## 실수 포인트

- `placeholder`만 두면 값을 입력한 뒤 필드의 목적을 다시 확인하기 어렵다.
- `id`와 `htmlFor`가 다르면 label을 눌러도 입력 요소로 focus가 이동하지 않는다.
- 에러 문구를 화면에만 보여주면 스크린 리더가 입력 요소와 에러를 함께 읽기 어렵다.
- `aria-invalid`를 항상 `true`로 두면 사용자가 수정한 뒤에도 오류 상태로 남는다.
- `required`를 빼면 필수 입력값이라는 정보가 브라우저와 보조 기술에 전달되지 않는다.
- 검증 실패 후 focus를 옮기지 않으면 사용자가 첫 오류 위치를 직접 찾아야 한다.
- 폼 안의 일반 버튼에 `type="button"`을 쓰지 않으면 기본값인 submit으로 동작할 수 있다.
- 클릭 가능한 요소는 `div`가 아니라 `button`으로 만든다.

## 참고

- [MDN HTML accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
