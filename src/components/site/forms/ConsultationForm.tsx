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
  email: z.string().email("Invalid email"),
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
        catch { alert("Something went wrong. Please try again or email us directly."); }
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
          <TextInput dark={dark} type="tel" inputMode="tel" placeholder="+234 ..." invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Company / Organization" dark={dark}>
          <TextInput dark={dark} {...register("company")} />
        </Field>
        <Field label="Country" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Trade Interest" required dark={dark} error={errors.trade_interest?.message}>
          <Select dark={dark} options={TRADE_INTERESTS} invalid={!!errors.trade_interest} {...register("trade_interest")} />
        </Field>
        <Field label="Budget Range" dark={dark}>
          <Select dark={dark} options={BUDGET_RANGES} {...register("budget_range")} />
        </Field>
        <Field label="Preferred Timeline" dark={dark}>
          <Select dark={dark} options={TIMELINES} {...register("timeline")} />
        </Field>
      </div>
      <Field label="Additional Notes" dark={dark}>
        <TextArea dark={dark} {...register("notes")} />
      </Field>
      <SubmitButton loading={isSubmitting}>Request My Consultation</SubmitButton>
    </form>
  );
}