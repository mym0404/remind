# Form 구현

## 언제 쓰나

회원 정보, 문의, 주문처럼 여러 입력값을 한 번에 제출할 때 쓴다.

입력값은 React state로 관리한다. field가 늘어나면 각 state를 따로 만들기보다 하나의 form object로 묶는 편이 읽기 쉽다.

## 바로 쓰는 코드

```tsx
import { useState, type FormEvent } from "react";

type Role = "frontend" | "backend" | "designer";
type ContactMethod = "email" | "phone";

type FormValues = {
  name: string;
  email: string;
  age: number | "";
  role: Role;
  contactMethod: ContactMethod;
  bio: string;
  agree: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = "idle" | "success" | "error";

const roleOptions: Role[] = ["frontend", "backend", "designer"];

const initialValues: FormValues = {
  name: "",
  email: "",
  age: "",
  role: "frontend",
  contactMethod: "email",
  bio: "",
  agree: false,
};

const parseAge = (value: string) => {
  if (value === "") {
    return "";
  }

  const age = Number(value);
  return Number.isFinite(age) ? age : "";
};

const validateForm = (values: FormValues) => {
  const errors: FormErrors = {};

  if (values.name.trim() === "") {
    errors.name = "이름을 입력하세요.";
  }

  if (!values.email.includes("@")) {
    errors.email = "이메일 형식으로 입력하세요.";
  }

  if (values.age === "" || values.age < 1) {
    errors.age = "나이를 1 이상으로 입력하세요.";
  }

  if (values.bio.trim().length < 10) {
    errors.bio = "소개를 10자 이상 입력하세요.";
  }

  if (!values.agree) {
    errors.agree = "약관에 동의해야 제출할 수 있습니다.";
  }

  return errors;
};

const saveProfile = async (values: FormValues) => {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 500);
  });

  console.log(values);
};

const ProfileForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const updateField = <Field extends keyof FormValues>(
    field: Field,
    value: FormValues[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSubmitStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      await saveProfile(values);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름</label>
      <input
        id="name"
        value={values.name}
        onChange={(event) => updateField("name", event.target.value)}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {errors.name && <p id="name-error">{errors.name}</p>}

      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        value={values.email}
        onChange={(event) => updateField("email", event.target.value)}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && <p id="email-error">{errors.email}</p>}

      <label htmlFor="age">나이</label>
      <input
        id="age"
        type="number"
        value={values.age}
        onChange={(event) => updateField("age", parseAge(event.target.value))}
        aria-describedby={errors.age ? "age-error" : undefined}
      />
      {errors.age && <p id="age-error">{errors.age}</p>}

      <label htmlFor="role">역할</label>
      <select
        id="role"
        value={values.role}
        onChange={(event) => {
          const nextRole = roleOptions.find((role) => role === event.target.value);

          if (nextRole) {
            updateField("role", nextRole);
          }
        }}
      >
        {roleOptions.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <fieldset>
        <legend>연락 방법</legend>
        <label>
          <input
            type="radio"
            name="contactMethod"
            checked={values.contactMethod === "email"}
            onChange={() => updateField("contactMethod", "email")}
          />
          이메일
        </label>
        <label>
          <input
            type="radio"
            name="contactMethod"
            checked={values.contactMethod === "phone"}
            onChange={() => updateField("contactMethod", "phone")}
          />
          전화
        </label>
      </fieldset>

      <label htmlFor="bio">소개</label>
      <textarea
        id="bio"
        value={values.bio}
        onChange={(event) => updateField("bio", event.target.value)}
        aria-describedby={errors.bio ? "bio-error" : undefined}
      />
      {errors.bio && <p id="bio-error">{errors.bio}</p>}

      <label>
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(event) => updateField("agree", event.target.checked)}
        />
        약관에 동의합니다
      </label>
      {errors.agree && <p>{errors.agree}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "제출 중" : "제출"}
      </button>
      <button type="button" onClick={handleReset} disabled={isSubmitting}>
        초기화
      </button>

      {submitStatus === "success" && <p>저장했습니다.</p>}
      {submitStatus === "error" && <p>저장하지 못했습니다. 다시 시도하세요.</p>}
    </form>
  );
};
```

## 실수 포인트

- `value`를 주면 `onChange`도 함께 둔다.
- 여러 field는 object state로 묶고, 바꿀 때는 spread로 새 object를 만든다.
- `checkbox`는 `value`가 아니라 `checked`를 읽는다.
- `number` input도 이벤트 값은 문자열이다.
- submit handler 첫 줄에서 `event.preventDefault()`를 호출한다.
- validation은 별도 함수로 분리하고, field 이름을 key로 쓰는 error object를 만든다.
- 제출 중에는 submit button을 `disabled`로 막아 중복 요청을 막는다.
- reset할 때는 입력값, 에러, 제출 상태를 함께 초기화한다.

## 참고

- [React input](https://react.dev/reference/react-dom/components/input)
