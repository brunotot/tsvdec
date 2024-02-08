import { Objects } from "@tsvdec/core";
import { useEffect, useState } from "react";
import { CompareResult } from "./types";

export default function useCompare<T>(value: T): CompareResult<T> {
  const [current, setCurrent] = useState<T | undefined>(() => value);
  const [diff, setDiff] = useState<CompareResult<T>>({} as CompareResult<T>);

  useEffect(() => {
    setCurrent(value);
    return () => {
      setCurrent(undefined);
    };
  }, [value]);

  useEffect(() => {
    const currentValue = current ?? {};
    const renderValue = value;
    const difference = Objects.diff(currentValue, renderValue);
    setDiff(difference);
  }, [current, value]);

  return diff;
}
