import { FormEvent, useState } from "react";

type DeliveryMethod = "pickup" | "courier";

type CheckoutForm = {
  name: string;
  email: string;
  quantity: string;
  deliveryMethod: DeliveryMethod;
  agreeToTerms: boolean;
  memo: string;
};

const initialForm: CheckoutForm = {
  name: "",
  email: "",
  quantity: "1",
  deliveryMethod: "pickup",
  agreeToTerms: false,
  memo: "",
};

export const App = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("아직 제출하지 않았습니다.");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`${form.name || "이름 없음"} 주문을 받았습니다.`);
  };

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 01</p>
        <h1>Checkout Form</h1>
        <form aria-label="주문 폼" onSubmit={handleSubmit}>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />

          <label htmlFor="email">이메일</label>
          <input
            id="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />

          <label htmlFor="quantity">수량</label>
          <input
            id="quantity"
            inputMode="numeric"
            value={form.quantity}
            onChange={(event) => setForm({ ...form, quantity: event.target.value })}
          />

          <fieldset>
            <legend>배송 방식</legend>
            <label>
              <input
                checked={form.deliveryMethod === "pickup"}
                name="deliveryMethod"
                type="radio"
                onChange={() => setForm({ ...form, deliveryMethod: "pickup" })}
              />
              매장 픽업
            </label>
            <label>
              <input
                checked={form.deliveryMethod === "courier"}
                name="deliveryMethod"
                type="radio"
                onChange={() => setForm({ ...form, deliveryMethod: "courier" })}
              />
              택배
            </label>
          </fieldset>

          <label htmlFor="memo">요청 사항</label>
          <textarea
            id="memo"
            value={form.memo}
            onChange={(event) => setForm({ ...form, memo: event.target.value })}
          />

          <label className="inline">
            <input
              checked={form.agreeToTerms}
              type="checkbox"
              onChange={(event) => setForm({ ...form, agreeToTerms: event.target.checked })}
            />
            약관에 동의합니다
          </label>

          <div className="actions">
            <button type="submit">주문 제출</button>
            <button type="button" onClick={() => setForm(initialForm)}>
              초기화
            </button>
          </div>
        </form>
        <p role="status">{message}</p>
      </section>
    </main>
  );
};
