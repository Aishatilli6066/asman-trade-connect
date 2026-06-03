import * as React from "react";
import { cn } from "@/lib/utils";

const baseInput =
  "w-full bg-transparent border px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[var(--color-mute)] focus:border-[var(--color-gold)]";

export function Field({
  label,
  required,
  error,
  children,
  dark,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <div className={cn("text-[11px] uppercase tracking-[0.2em] mb-2", dark ? "text-white/60" : "text-[var(--color-mute)]")}>
        {label} {required && <span className="text-[var(--color-burgundy)]">*</span>}
      </div>
      {children}
      {error && <div className="mt-1.5 text-[11px] text-red-500">{error}</div>}
    </label>
  );
}

export const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { dark?: boolean; invalid?: boolean }>(
  ({ className, dark, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        baseInput,
        dark ? "border-white/15 text-white" : "border-[var(--color-line)] text-[var(--color-ink)]",
        invalid && "border-red-500",
        className,
      )}
      {...props}
    />
  ),
);
TextInput.displayName = "TextInput";

export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { dark?: boolean; invalid?: boolean }>(
  ({ className, dark, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={5}
      className={cn(
        baseInput,
        "resize-none",
        dark ? "border-white/15 text-white" : "border-[var(--color-line)] text-[var(--color-ink)]",
        invalid && "border-red-500",
        className,
      )}
      {...props}
    />
  ),
);
TextArea.displayName = "TextArea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { dark?: boolean; invalid?: boolean; options: string[]; placeholder?: string }>(
  ({ className, dark, invalid, options, placeholder = "Select an option", ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        baseInput,
        "appearance-none cursor-pointer",
        dark ? "border-white/15 text-white bg-[var(--color-burgundy)]" : "border-[var(--color-line)] text-[var(--color-ink)] bg-white",
        invalid && "border-red-500",
        className,
      )}
      defaultValue=""
      {...props}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  ),
);
Select.displayName = "Select";

export function SubmitButton({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors disabled:opacity-60 bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-soft)]"
    >
      {loading ? "Submitting…" : children}
    </button>
  );
}

export function SuccessState({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border border-[var(--color-gold)] bg-[var(--color-gold)]/10 p-8 text-center">
      <div className="mx-auto grid place-items-center h-12 w-12 border border-[var(--color-gold)] text-[var(--color-gold)] text-xl">✓</div>
      <div className="mt-4 font-display text-xl text-[var(--color-ink)] dark:text-white">
        {children ?? "Thank you. We will respond within 24 hours."}
      </div>
    </div>
  );
}