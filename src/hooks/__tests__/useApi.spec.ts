import { waitFor } from "@testing-library/dom";
import { renderHook as render } from "@testing-library/react-hooks";

import { IUseApiOptions, useApi } from "../useApi";

describe("hooks / useApi", () => {
  function renderHook(dependency?: unknown, options?: IUseApiOptions<any>) {
    let resolve = (_value: unknown) => {};
    let reject = (_reason?: unknown) => {};
    const response = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const handler = jest.fn().mockReturnValue(response);

    const rendered = render(
      ({ dependency, options }) => useApi(handler, [dependency], options),
      {
        initialProps: { dependency, options },
      }
    );

    return {
      resolve,
      reject,
      handler,
      ...rendered,
      rerender: (dependency: unknown, options?: IUseApiOptions<any>) =>
        rendered.rerender({ dependency, options }),
    };
  }

  it("immediatly calls the handler as soon as it renders", () => {
    const { result, handler } = renderHook("first");

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.data).toBeNull();
    expect(handler).toHaveBeenCalledWith("first");
  });

  it("returns initialData when given without calling the handler", () => {
    const { result, handler } = renderHook("first", {
      initialData: "initial data",
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.data).toBe("initial data");
    expect(handler).not.toHaveBeenCalled();
  });

  it("returns initialError when given without calling the handler", () => {
    const { result, handler } = renderHook("first", {
      initialError: new Error("initial error"),
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.error).toBeDefined();
    expect(handler).not.toHaveBeenCalled();
  });

  it("recalls the handler when dependencies change", () => {
    const { rerender, handler } = renderHook("first");

    expect(handler).toHaveBeenCalledWith("first");

    rerender("second");

    expect(handler).toHaveBeenCalledWith("second");
  });

  it("sets loading and data when handler promise get resolved", async () => {
    const { result, waitForNextUpdate, handler, resolve } = renderHook("first");

    expect(handler).toHaveBeenCalledWith("first");

    resolve("response");

    await waitForNextUpdate();

    expect(result.current.data).toBe("response");
    expect(result.current.hasError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("sets loading and error when handler promise get rejected", async () => {
    const { result, waitForNextUpdate, reject, handler } = renderHook("first");

    expect(handler).toHaveBeenCalledWith("first");

    reject("error");

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.hasError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  describe("fetch predicate", () => {
    it("calls the handler when fetch predicate is not given", () => {
      const { handler } = renderHook("first", {
        fetchWhen: undefined,
      });
      expect(handler).toHaveBeenCalled();
    });

    it("calls the handler when fetch predicate returns true", () => {
      const { handler } = renderHook("first", {
        fetchWhen: () => true,
      });
      expect(handler).toHaveBeenCalled();
    });

    it("calls the handler when fetch predicate resolves to true", async () => {
      const { handler } = renderHook("first", {
        fetchWhen: () => Promise.resolve(true),
      });

      await waitFor(() => {
        expect(handler).toHaveBeenCalled();
      });
    });

    it("doesn't call the handler when fetch predicate returns false", () => {
      const { handler } = renderHook("first", {
        fetchWhen: () => false,
      });
      expect(handler).not.toHaveBeenCalled();
    });

    it("doesn't call the handler when fetch predicate resolves to false", async () => {
      const { handler } = renderHook("first", {
        fetchWhen: () => Promise.resolve(false),
      });

      await waitFor(() => {
        expect(handler).not.toHaveBeenCalled();
      });
    });
  });
});
