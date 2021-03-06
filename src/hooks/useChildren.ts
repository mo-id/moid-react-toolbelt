import {
  Children,
  isValidElement,
  ComponentType,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";

import { Nullable, OneOrMore } from "@mo-id/typescript-toolbelt";

interface UseChildren {
  getChildrenOfType<Props = any>(
    type: ComponentType<Props>
  ): Nullable<OneOrMore<ReactElement>>;
  excludeChildrenOfType<Props = any>(
    type: ComponentType<Props>
  ): Nullable<OneOrMore<ReactElement>>;
}

function isReactElement(child: ReactNode): child is ReactElement {
  return isValidElement(child);
}

export function useChildren(children: ReactNode): UseChildren {
  return useMemo(() => {
    const asArray = Children.toArray(children);

    function getChildrenOfType<Props = any>(type: ComponentType<Props>) {
      const elements = asArray.filter(
        (child: ReactNode) => isReactElement(child) && child.type === type
      ) as ReactElement[];

      if (elements.length === 0) return null;
      if (elements.length === 1) return elements[0];

      return elements;
    }

    function excludeChildrenOfType<Props = any>(type: ComponentType<Props>) {
      const elements = asArray.filter(
        (child: ReactNode) => isReactElement(child) && child.type !== type
      ) as ReactElement[];

      if (elements.length === 0) return null;
      if (elements.length === 1) return elements[0];

      return elements;
    }

    return {
      getChildrenOfType,
      excludeChildrenOfType,
    };
  }, [children]);
}
