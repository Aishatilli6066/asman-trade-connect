import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { submitConsultation } from "@/lib/forms.functions";
import { BUDGET_RANGES, TIMELINES, TRADE_INTERESTS } from "@/lib/site-data";

const schema = z.object({
  full_name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(5, "Required"),
  company: z.string().optional(),
  country: z.string().min(1, "Required"),
  trade_interest: z.string().min(1, "Required"),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function ConsultationForm({ dark = true }: { dark?: boolean }) {
  const fn = useServerFn(submitConsultation);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (done) return <SuccessState />;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try { await fn({ data: values }); setDone(true); }
        catch { alert("Something went wrong. Please try again or contact us directly."); }
      })}
      className="grid gap-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" required dark={dark} error={errors.full_name?.message}>
          <TextInput dark={dark} placeholder="e.g. John Adeyemi" invalid={!!errors.full_name} {...register("full_name")} />
        </Field>
        <Field label="Email Address" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" placeholder="e.g. john@company.com" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp Number (with Country Code)" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" placeholder="e.g. +1 555 000 0000 or +44 20 0000 0000" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Company / Organisation" dark={dark}>
          <TextInput dark={dark} placeholder="e.g. Global Trade Ltd" {...register("company")} />
        </Field>
        <Field label="Country of Business" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} placeholder="e.g. United Kingdom" invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Service Required" required dark={dark} error={errors.trade_interest?.message}>
          <Select dark={dark} options={TRADE_INTERESTS} invalid={!!errors.trade_interest} {...register("trade_interest")} />
        </Field>
        <Field label="Estimated Budget (USD)" dark={dark}>
          <Select dark={dark} options={BUDGET_RANGES} {...register("budget_range")} />
        </Field>
        <Field label="Preferred Engagement Timeline" dark={dark}>
          <Select dark={dark} options={TIMELINES} {...register("timeline")} />
        </Field>
      </div>
      <Field label="Tell Us About Your Business Needs" dark={dark}>
        <TextArea dark={dark} placeholder="Share any relevant details about your trade goals, products of interest, or specific requirements…" {...register("notes")} />
      </Field>
      <SubmitButton loading={isSubmitting}>Submit Consultation Request</SubmitButton>
    </form>
  );
}
