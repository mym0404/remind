# useReducer

## 언제 쓰나

`useReducer`는 상태 조각이 많고, 한 액션이 여러 값을 함께 바꿀 때 쓴다. 입력값 하나나 열림 상태 하나만 관리한다면 `useState`가 더 단순하다.

복잡한 form, 검색어와 필터와 정렬 조건, cart 수량, wizard 단계, modal stack처럼 상태 전이 규칙이 이름으로 정리되는 화면에 잘 맞는다.

reducer는 현재 상태와 action을 받아 다음 상태를 반환한다. 기존 상태를 직접 바꾸지 않고 새 객체와 새 배열을 만들어야 한다.

## 바로 쓰는 코드

```tsx
import { useReducer } from "react";

type SortKey = "name" | "price";
type Step = "cart" | "shipping" | "review";
type ModalName = "coupon" | "help";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

type CartItem = Product & {
  quantity: number;
};

type CheckoutState = {
  form: { name: string; address: string };
  filter: { query: string; category: string; sortKey: SortKey };
  cartItems: CartItem[];
  step: Step;
  modalStack: ModalName[];
};

type CheckoutAction =
  | { type: "form/change"; field: keyof CheckoutState["form"]; value: string }
  | { type: "filter/change"; filter: Partial<CheckoutState["filter"]> }
  | { type: "cart/add"; product: Product }
  | { type: "cart/remove"; productId: string }
  | { type: "wizard/go"; step: Step }
  | { type: "modal/open"; name: ModalName }
  | { type: "modal/close" };

const products: Product[] = [
  { id: "coffee", name: "커피", category: "drink", price: 4500 },
  { id: "sandwich", name: "샌드위치", category: "food", price: 7800 },
];

const initialState: CheckoutState = {
  form: { name: "", address: "" },
  filter: { query: "", category: "all", sortKey: "name" },
  cartItems: [],
  step: "cart",
  modalStack: [],
};

const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState => {
  switch (action.type) {
    case "form/change":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case "filter/change":
      return {
        ...state,
        filter: { ...state.filter, ...action.filter },
      };
    case "cart/add": {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.product.id,
      );

      return {
        ...state,
        cartItems: item
          ? state.cartItems.map((cartItem) =>
              cartItem.id === action.product.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem,
            )
          : [...state.cartItems, { ...action.product, quantity: 1 }],
      };
    }
    case "cart/remove":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.productId,
        ),
      };
    case "wizard/go":
      return { ...state, step: action.step };
    case "modal/open":
      return { ...state, modalStack: [...state.modalStack, action.name] };
    case "modal/close":
      return { ...state, modalStack: state.modalStack.slice(0, -1) };
  }
};

export const Checkout = () => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const visibleProducts = [...products]
    .filter((product) => {
      const query = state.filter.query.trim().toLowerCase();

      return (
        product.name.toLowerCase().includes(query) &&
        (state.filter.category === "all" ||
          product.category === state.filter.category)
      );
    })
    .sort((left, right) =>
      state.filter.sortKey === "price"
        ? left.price - right.price
        : left.name.localeCompare(right.name),
    );

  return (
    <section>
      <label htmlFor="product-query">검색어</label>
      <input
        id="product-query"
        value={state.filter.query}
        onChange={(event) =>
          dispatch({
            type: "filter/change",
            filter: { query: event.target.value },
          })
        }
      />

      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "filter/change",
            filter: { category: "drink", sortKey: "price" },
          })
        }
      >
        음료 낮은 가격순
      </button>

      {visibleProducts.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => dispatch({ type: "cart/add", product })}
        >
          {product.name}
        </button>
      ))}

      {state.cartItems.map((item) => (
        <p key={item.id}>
          {item.name} {item.quantity}개
          <button
            type="button"
            onClick={() => dispatch({ type: "cart/remove", productId: item.id })}
          >
            삭제
          </button>
        </p>
      ))}

      <label htmlFor="order-name">이름</label>
      <input
        id="order-name"
        value={state.form.name}
        onChange={(event) =>
          dispatch({
            type: "form/change",
            field: "name",
            value: event.target.value,
          })
        }
      />

      <label htmlFor="order-address">주소</label>
      <input
        id="order-address"
        value={state.form.address}
        onChange={(event) =>
          dispatch({
            type: "form/change",
            field: "address",
            value: event.target.value,
          })
        }
      />

      <button
        type="button"
        onClick={() => dispatch({ type: "wizard/go", step: "shipping" })}
      >
        배송 단계
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "modal/open", name: "coupon" })}
      >
        쿠폰 열기
      </button>

      {state.modalStack.at(-1) === "coupon" && (
        <div role="dialog" aria-modal="true" aria-labelledby="coupon-title">
          <h2 id="coupon-title">쿠폰</h2>
          <button type="button" onClick={() => dispatch({ type: "modal/close" })}>
            닫기
          </button>
        </div>
      )}
    </section>
  );
};
```

## 실수 포인트

- action union type을 넓은 `string` 하나로 두면 action별 payload를 안전하게 좁히기 어렵다.
- reducer 안에서 `push`, `splice`, 직접 대입으로 기존 상태를 바꾸지 않는다.
- 상태 전이는 reducer에 두고, 컴포넌트에는 이벤트와 렌더링만 남긴다.
- form, filter, cart, wizard, modal stack을 각각 별도 `useState`로 흩어 두면 한 액션이 여러 setter를 호출하게 된다.
- reducer 안에서는 API 요청이나 localStorage 저장 같은 side effect를 실행하지 않는다.

## 참고

- [React useReducer](https://react.dev/reference/react/useReducer)
