import * as React from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">
        {label}
        {required && <span className="text-[var(--color-burgundy)]"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full border border-neutral-300 bg-white px-3 py-3 text-base text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]/30";

export function PlatformButton({
  className,
  variant = "burgundy",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "burgundy" | "outline" | "gold" }) {
  const variants = {
    burgundy:
      "bg-[var(--color-burgundy)] text-white hover:bg-[var(--color-burgundy-deep)]",
    outline:
      "border border-[var(--color-burgundy)] text-[var(--color-burgundy)] hover:bg-[var(--color-burgundy)] hover:text-white",
    gold: "bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-soft)]",
  } as const;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-burgundy)]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function PageHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-burgundy)]">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 font-display text-3xl md:text-4xl text-[var(--color-ink)]">{title}</h1>
      {intro && <p className="mt-3 text-neutral-600 leading-relaxed">{intro}</p>}
    </header>
  );
}

export function EmptyState({
  title,
  description,
  note,
  action,
}: {
  title: string;
  description: string;
  note?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-[var(--color-line)] bg-white p-8 md:p-12 text-center">
      <h2 className="font-display text-xl text-[var(--color-ink)]">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-600 leading-relaxed">
        {description}
      </p>
      {note && <p className="mx-auto mt-3 max-w-lg text-xs text-neutral-500">{note}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorText({ children }: { children: React.ReactNode }) {
  return children ? (
    <p role="alert" className="text-sm text-[var(--color-burgundy)]">
      {children}
    </p>
  ) : null;
}
