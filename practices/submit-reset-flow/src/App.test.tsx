import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App, submitMessage } from "./App";

const createDeferred = <T,>() => {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve;
  });

  return { promise, resolve };
};

describe("Submit Reset Flow practice", () => {
  it("trims and resolves the submitted message", async () => {
    await expect(submitMessage("  배포 준비  ")).resolves.toEqual({ savedMessage: "배포 준비" });
  });

  it("disables submit while the async request is pending", async () => {
    const user = userEvent.setup();
    const pendingSubmit = createDeferred<{ savedMessage: string }>();
    const submitMessageMock = vi.fn(() => pendingSubmit.promise);
    render(<App submitMessage={submitMessageMock} />);

    await user.type(screen.getByLabelText("메시지"), "배포 준비");
    await user.click(screen.getByRole("button", { name: "저장" }));

    expect(screen.getByRole("button", { name: "저장" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("저장 중");

    pendingSubmit.resolve({ savedMessage: "배포 준비" });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 완료"));
  });

  it("prevents duplicate submissions while pending", async () => {
    const user = userEvent.setup();
    const pendingSubmit = createDeferred<{ savedMessage: string }>();
    const submitMessageMock = vi.fn(() => pendingSubmit.promise);
    render(<App submitMessage={submitMessageMock} />);
    const submitButton = screen.getByRole("button", { name: "저장" });
    const form = submitButton.closest("form");

    await user.type(screen.getByLabelText("메시지"), "배포 준비");
    if (!form) throw new Error("submit form missing");
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(submitMessageMock).toHaveBeenCalledTimes(1);
    expect(submitButton).toBeDisabled();

    pendingSubmit.resolve({ savedMessage: "배포 준비" });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 완료"));
  });

  it("shows success and resets the input after a successful submit", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("메시지"), "배포 준비");
    await user.click(screen.getByRole("button", { name: "저장" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 완료"));
    expect(screen.getByLabelText("메시지")).toHaveValue("");
  });

  it("keeps the input when submission fails", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("메시지"), "fail");
    await user.click(screen.getByRole("button", { name: "저장" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 실패"));
    expect(screen.getByLabelText("메시지")).toHaveValue("fail");
  });

  it("resets the input and status", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("메시지"), "fail");
    await user.click(screen.getByRole("button", { name: "저장" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 실패"));

    await user.click(screen.getByRole("button", { name: "초기화" }));

    expect(screen.getByLabelText("메시지")).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("작성 중");
  });
});
