import {
  Children,
  ComponentType,
  ReactChild,
  ReactElement,
  ReactNode,
} from "react";

export function excludeFromChildren(
  children: ReactNode,
  type: ComponentType
): ReactNode {
  return Children.toArray(children).filter(
    (child): child is ReactChild => (child as ReactElement).type !== type
  );
}
