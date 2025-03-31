import { renderHook, act } from "@testing-library/react";
import { useToast, toast } from "./useToast";

describe("useToast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("deve manter apenas o último toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Primeiro Toast" });
      toast({ title: "Segundo Toast" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Segundo Toast");
  });
});
