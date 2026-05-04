import { useEffect } from "react";

let listeners: (() => void)[] = [];

export const triggerRefresh = () => {
  listeners.forEach((l) => l());
};

export const useRefresh = (callback: () => void) => {
  useEffect(() => {
    listeners.push(callback);

    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  }, [callback]);
};
