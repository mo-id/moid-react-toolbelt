import { ReactElement } from "react";
import { findChildByType } from "../findChildByType";

describe("utils / findChildByType", () => {
  const Child = () => <>child</>;

  it("returns undefined when the given children is a string", () => {
    const childByType = findChildByType("children", Child);
    expect(childByType).toBeUndefined();
  });

  it("returns undefined if the given children does not contain the child component type", () => {
    const childByType = findChildByType(<>children</>, Child);
    expect(childByType).toBeUndefined();
  });

  it("returns the child that matches the given type", () => {
    const childByType = findChildByType(<Child />, Child);
    expect((childByType as ReactElement).type).toBe(Child);
  });
});
