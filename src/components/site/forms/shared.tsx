import { Link } from "@tanstack/react-router";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FEE_NOTICE, CONSENT_LABEL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Honeypot({ register }: { register: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}

export function FeeNotice({ dark }: { dark?: boolean }) {
  return (
    <p
      className={cn(
        "border-l-2 border-[var(--color-gold)] pl-4 text-sm leading-relaxed",
        dark ? "text-white/75" : "text-[var(--color-ink)]/70",
      )}
    >
      {FEE_NOTICE}
    </p>
  );
}

export function ConsentBlock({
  register,
  error,
  dark,
}: {
  register: UseFormRegisterReturn;
  error?: string;
  dark?: boolean;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-burgundy)]"
          {...register}
        />
        <span className={dark ? "text-white/80" : "text-[var(--color-ink)]/75"}>
          {CONSENT_LABEL}{" "}
          <Link
            to="/privacy-policy"
            className={cn("underline underline-offset-2", dark ? "text-[var(--color-gold)]" : "text-[var(--color-burgundy)]")}
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && <div className="mt-1.5 text-[11px] text-red-500">{error}</div>}
    </div>
  );
}

export function ErrorNotice({ message, dark }: { message: string; dark?: boolean }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "border border-red-500/60 px-4 py-3 text-sm leading-relaxed",
        dark ? "bg-red-500/10 text-white" : "bg-red-50 text-[var(--color-ink)]",
      )}
    >
      {message}
    </div>
  );
}
