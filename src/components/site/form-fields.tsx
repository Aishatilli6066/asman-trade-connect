import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, Mail, MessageCircle } from "lucide-react";

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
      aria-busy={loading}
      className="w-full py-4 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-soft)] inline-flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>Submitting…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function SuccessState({
  title = "Request received",
  message = "Thank you. A member of our team will respond within 24 hours.",
  dark = false,
}: {
  title?: string;
  message?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border p-8 md:p-10 text-center",
        dark
          ? "border-[var(--color-gold)]/60 bg-white/5"
          : "border-[var(--color-gold)] bg-[var(--color-gold)]/10",
      )}
    >
      <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-[var(--color-gold)] text-[var(--color-burgundy)]">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </div>
      <div className={cn("mt-5 font-display text-2xl md:text-3xl", dark ? "text-white" : "text-[var(--color-ink)]")}>
        {title}
      </div>
      <p className={cn("mt-3 text-sm md:text-base leading-relaxed max-w-md mx-auto", dark ? "text-white/75" : "text-[var(--color-ink)]/70")}>
        {message}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-[0.22em]">
        <a
          href="mailto:contact@asmanprimehub.com"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 border transition-colors",
            dark
              ? "border-white/25 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              : "border-[var(--color-ink)]/15 text-[var(--color-ink)] hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)]",
          )}
        >
          <Mail className="h-3.5 w-3.5" /> Email us
        </a>
        <a
          href="https://wa.me/2347084443626"
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 border transition-colors",
            dark
              ? "border-white/25 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              : "border-[var(--color-ink)]/15 text-[var(--color-ink)] hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)]",
          )}
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}