import { act, renderHook } from "@testing-library/react-hooks";
import { useBoolean } from "../useBoolean";

describe("hooks / useBoolean", () => {
  it("allows to handle boolean values", () => {
    const { result } = renderHook(() => useBoolean(false));
    let [value, setTrue, setFalse, set, toggle] = result.current;

    expect(value).toBe(false);

    act(() => {
      setTrue();
    });
    [value, , setFalse] = result.current;
    expect(value).toBe(true);

    act(() => {
      setFalse();
    });
    [value, , , set] = result.current;
    expect(value).toBe(false);

    act(() => {
      set(true);
    });
    [value, , , , toggle] = result.current;
    expect(value).toBe(true);

    act(() => {
      toggle();
    });
    [value] = result.current;
    expect(value).toBe(false);
  });
});
