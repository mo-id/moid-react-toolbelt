import { useState } from "react";

export type UseBoolean = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (newValue: boolean) => void;
  toggler: () => void;
};

export function useBoolean(
  initialState: boolean | (() => boolean)
): UseBoolean {
  const [value, setValue] = useState(initialState);

  return {
    value,
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
    setValue,
    toggler: () => setValue(!value),
  };
}
