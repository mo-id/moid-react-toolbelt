import { useState } from "react";

export type UseBoolean = [
  boolean,
  () => void,
  () => void,
  (newValue: boolean) => void,
  () => void
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
