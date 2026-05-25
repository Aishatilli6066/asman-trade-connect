import * as React from "react";
import { cn } from "@/lib/utils";

export function GoldButton({
  children,
  className,
  variant = "gold",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "outline-gold" | "outline-light" | "burgundy";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    gold: "bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-soft)] hover:-translate-y-0.5",
    "outline-gold":
      "border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]",
    "outline-light":
      "border border-white/40 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
    burgundy:
      "bg-[var(--color-burgundy)] text-white hover:bg-[var(--color-burgundy-deep)]",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-[var(--color-gold)]" />
      <span
        className={cn(
          "text-[11px] uppercase tracking-[0.32em] font-medium",
          dark ? "text-[var(--color-gold)]" : "text-[var(--color-burgundy)]",
        )}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  dark,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={cn(
          "mt-5 text-3xl md:text-5xl leading-[1.05] font-medium",
          dark ? "text-white" : "text-[var(--color-ink)]",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-base md:text-lg leading-relaxed",
            dark ? "text-white/70" : "text-[var(--color-ink)]/70",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  // CSS-only fade-in to keep bundle light; matches restrained motion brief.
  return (
    <div
      className={cn("animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}