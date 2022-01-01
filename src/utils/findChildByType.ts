import {
  Children,
  ComponentType,
  ReactChild,
  ReactElement,
  ReactNode,
} from "react";
import { Optional } from "@mo-id/typescript-toolbelt";

export function findChildByType(
  children: ReactNode,
  type: ComponentType
): Optional<ReactChild> {
  return Children.toArray(children).find((child): child is ReactChild => {
    if (typeof child !== "object") return false;

    return (child as ReactElement).type === type;
  });
}
