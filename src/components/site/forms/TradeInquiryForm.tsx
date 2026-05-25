import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { submitTradeInquiry } from "@/lib/forms.functions";
import { SERVICE_INTERESTS } from "@/lib/site-data";

const schema = z.object({
  full_name: z.string().min(1, "Required"),
  company_name: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  whatsapp: z.string().min(5, "Required"),
  service_interest: z.string().min(1, "Required"),
  message: z.string().min(30, "Please share at least 30 characters"),
});
type FormValues = z.infer<typeof schema>;

export function TradeInquiryForm({ dark = false }: { dark?: boolean }) {
  const fn = useServerFn(submitTradeInquiry);
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
        <Field label="Company Name" required dark={dark} error={errors.company_name?.message}>
          <TextInput dark={dark} invalid={!!errors.company_name} {...register("company_name")} />
        </Field>
        <Field label="Country" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Email Address" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp Number" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" placeholder="+234 ..." invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Service Interest" required dark={dark} error={errors.service_interest?.message}>
          <Select dark={dark} options={SERVICE_INTERESTS} invalid={!!errors.service_interest} {...register("service_interest")} />
        </Field>
      </div>
      <Field label="Message" required dark={dark} error={errors.message?.message}>
        <TextArea dark={dark} rows={6} placeholder="Tell us about your sourcing, trade or export needs…" invalid={!!errors.message} {...register("message")} />
      </Field>
      <SubmitButton loading={isSubmitting}>Send Trade Inquiry</SubmitButton>
    </form>
  );
}