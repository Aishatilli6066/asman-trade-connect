import { useSyncExternalStore } from "react";

let isOpen = false;
const listeners = new Set<() => void>();

function emit() { listeners.forEach((l) => l()); }

export function openConsultation() { isOpen = true; emit(); }
export function closeConsultation() { isOpen = false; emit(); }

export function useConsultationOpen() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => isOpen,
    () => false,
  );
}