import { act, renderHook } from "@testing-library/react-hooks";
import { useBoolean } from "../useBoolean";

describe("hooks / useBoolean", () => {
  it("allows to handle boolean values", () => {
    const { result } = renderHook(() => useBoolean(false));
    let { value, setTrue, setFalse, setValue, toggler } = result.current;

    expect(value).toBe(false);

    act(() => {
      setTrue();
    });
    ({ value, setFalse } = result.current);
    expect(value).toBe(true);

    act(() => {
      setFalse();
    });
    ({ value, setValue } = result.current);
    expect(value).toBe(false);

    act(() => {
      setValue(true);
    });
    ({ value, toggler } = result.current);
    expect(value).toBe(true);

    act(() => {
      toggler();
    });
    ({ value } = result.current);
    expect(value).toBe(false);
  });
});
