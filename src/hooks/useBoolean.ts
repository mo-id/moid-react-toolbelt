import { useState } from "react";

export type UseBoolean = [
  value: boolean,
  trueSetter: () => void,
  falseSetter: () => void,
  valueSetter: (newValue: boolean) => void,
  toggler: () => void
];

export function useBoolean(
  initialState: boolean | (() => boolean)
): UseBoolean {
  const [value, setValue] = useState(initialState);

  return [
    value,
    () => setValue(true),
    () => setValue(false),
    setValue,
    () => setValue(!value),
  ];
}
