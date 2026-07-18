import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { submitTradeInquiry } from "@/lib/forms.functions";
import {
  SERVICE_INTERESTS,
  BUSINESS_TYPES,
  BUDGET_RANGES_USD,
  DELIVERY_TIMELINES,
  SHIPPING_METHODS_FULL,
} from "@/lib/site-data";

const schema = z.object({
  full_name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  whatsapp: z.string().min(5, "Required"),
  country: z.string().min(1, "Required"),
  service_interest: z.string().min(1, "Required"),
  business_type: z.string().min(1, "Required"),
  product_required: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  budget_range: z.string().min(1, "Required"),
  timeline: z.string().min(1, "Required"),
  target_market: z.string().min(1, "Required"),
  shipping_method: z.string().min(1, "Required"),
  message: z.string().min(10, "Please share at least 10 characters"),
  consent: z.literal(true, { message: "You must agree to be contacted" }),
});
type FormValues = z.infer<typeof schema>;

export function TradeInquiryForm({ dark = false }: { dark?: boolean }) {
  const fn = useServerFn(submitTradeInquiry);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (done) return <SuccessState dark={dark} title="Request received" message="Thanks — your service request is in. Our team will review it and respond within 24 hours." />;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try {
          await fn({ data: values });
          setDone(true);
          toast.success("Request submitted");
        } catch {
          toast.error("Submission failed", { description: "Please try again or email contact@asmanprimehub.com." });
        }
      })}
      className="grid gap-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" required dark={dark} error={errors.full_name?.message}>
          <TextInput dark={dark} invalid={!!errors.full_name} {...register("full_name")} />
        </Field>
        <Field label="Email Address" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp Number" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" placeholder="+1 555 000 0000" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Country" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Service Required" required dark={dark} error={errors.service_interest?.message}>
          <Select dark={dark} options={SERVICE_INTERESTS} invalid={!!errors.service_interest} {...register("service_interest")} />
        </Field>
        <Field label="Business Type" required dark={dark} error={errors.business_type?.message}>
          <Select dark={dark} options={BUSINESS_TYPES} invalid={!!errors.business_type} {...register("business_type")} />
        </Field>
        <Field label="Product / Commodity Required" required dark={dark} error={errors.product_required?.message}>
          <TextInput dark={dark} invalid={!!errors.product_required} {...register("product_required")} />
        </Field>
        <Field label="Required Quantity" required dark={dark} error={errors.quantity?.message}>
          <TextInput dark={dark} invalid={!!errors.quantity} placeholder="20 MT, 500 cartons" {...register("quantity")} />
        </Field>
        <Field label="Budget Range (USD)" required dark={dark} error={errors.budget_range?.message}>
          <Select dark={dark} options={BUDGET_RANGES_USD} invalid={!!errors.budget_range} {...register("budget_range")} />
        </Field>
        <Field label="Expected Delivery Timeline" required dark={dark} error={errors.timeline?.message}>
          <Select dark={dark} options={DELIVERY_TIMELINES} invalid={!!errors.timeline} {...register("timeline")} />
        </Field>
        <Field label="Target Market / Country" required dark={dark} error={errors.target_market?.message}>
          <TextInput dark={dark} invalid={!!errors.target_market} {...register("target_market")} />
        </Field>
        <Field label="Shipping Method" required dark={dark} error={errors.shipping_method?.message}>
          <Select dark={dark} options={SHIPPING_METHODS_FULL} invalid={!!errors.shipping_method} {...register("shipping_method")} />
        </Field>
      </div>
      <Field label="Message / Project Details" required dark={dark} error={errors.message?.message}>
        <TextArea dark={dark} rows={6} placeholder="Tell us about your sourcing, trade or export needs…" invalid={!!errors.message} {...register("message")} />
      </Field>
      <label className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[var(--color-burgundy)] shrink-0"
          {...register("consent")}
        />
        <span className={dark ? "text-white/80" : "text-[var(--color-ink)]/75"}>
          I agree to be contacted by ASMAN Prime Hub regarding my inquiry.
        </span>
      </label>
      {errors.consent && <div className="text-[11px] text-red-500 -mt-3">{errors.consent.message}</div>}
      <SubmitButton loading={isSubmitting}>Submit Request</SubmitButton>
    </form>
  );
}