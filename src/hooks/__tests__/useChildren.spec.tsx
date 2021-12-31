import { ReactNode } from "react";
import { renderHook as render } from "@testing-library/react-hooks";

import { useChildren } from "../useChildren";

const FirstSample = () => <div data-testid="first-sample">first</div>;
const SecondSample = () => <div data-testid="second-sample">second</div>;
const ThirdSample = () => <div data-testid="third-sample">third</div>;

describe("hooks / useChildren", () => {
  function renderHook(children: ReactNode) {
    const rendered = render(({ children }) => useChildren(children), {
      initialProps: { children },
    });

    return {
      ...rendered,
      rerender: (children: ReactNode) => rendered.rerender({ children }),
    };
  }

  describe("getChildrenOfType", () => {
    it("returns null when no elements are filtered", () => {
      const { result } = renderHook([<FirstSample />, <SecondSample />]);

      expect(result.current.getChildrenOfType(ThirdSample)).toBeNull();
    });

    it("returns a single element when only one is found", () => {
      const { result } = renderHook([
        <FirstSample />,
        <SecondSample />,
        <ThirdSample />,
      ]);

      const elements = result.current.getChildrenOfType(FirstSample);

      expect(elements).not.toBeNull();
      expect(elements).not.toBeInstanceOf(Array);
    });

    it("retrieves a subset of elements of the given type", () => {
      const { result } = renderHook([
        <FirstSample />,
        <SecondSample />,
        <SecondSample />,
        <SecondSample />,
        <ThirdSample />,
      ]);

      const elements = result.current.getChildrenOfType(SecondSample);

      expect(elements).toBeInstanceOf(Array);
      expect(elements).toHaveLength(3);
    });
  });

  describe("excludeChildrenOfType", () => {
    it("returns null when all elements are excluded", () => {
      const { result } = renderHook([
        <FirstSample />,
        <FirstSample />,
        <FirstSample />,
      ]);

      expect(result.current.excludeChildrenOfType(FirstSample)).toBeNull();
    });

    it("returns a single element when not excluded", () => {
      const { result } = renderHook([
        <FirstSample />,
        <SecondSample />,
        <SecondSample />,
      ]);

      const elements = result.current.excludeChildrenOfType(SecondSample);

      expect(elements).not.toBeNull();
      expect(elements).not.toBeInstanceOf(Array);
    });

    it("retrieves a subset of elements which type is different than the one provided", () => {
      const { result } = renderHook([
        <FirstSample />,
        <SecondSample />,
        <SecondSample />,
        <SecondSample />,
        <ThirdSample />,
      ]);

      const elements = result.current.excludeChildrenOfType(SecondSample);

      expect(elements).toBeInstanceOf(Array);
      expect(elements).toHaveLength(2);
    });
  });
});
