import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { ConsentBlock, ErrorNotice, FeeNotice, Honeypot } from "./shared";
import { consultationSchema, type ConsultationValues } from "@/lib/forms-schemas";
import { trackLead } from "@/lib/analytics";
import { SUBMISSION_CONFIRMATION } from "@/lib/site-data";

import { submitConsultation } from "@/lib/forms.functions";
import { BUDGET_RANGES, TIMELINES, TRADE_INTERESTS } from "@/lib/site-data";



export function ConsultationForm({ dark = true, source = "consultation-modal" }: { dark?: boolean; source?: string }) {
  const fn = useServerFn(submitConsultation);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { source_page: source, website: "" },
  });

  if (done) return <SuccessState dark={dark} title="Consultation request received" message={SUBMISSION_CONFIRMATION} />;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        setFailed(null);
        try {
          await fn({ data: values });
          trackLead("consultation");
          setDone(true);
        } catch (e) {
          setFailed(e instanceof Error && e.message ? e.message : "Your enquiry could not be sent. Please email contact@asmanprimehub.com or message us on WhatsApp.");
        }
      })}
      className="relative grid gap-5"
    >
      <Honeypot register={register("website")} />
      <input type="hidden" {...register("source_page")} />
      {failed && <ErrorNotice message={failed} dark={dark} />}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" required dark={dark} error={errors.full_name?.message}>
          <TextInput dark={dark} invalid={!!errors.full_name} {...register("full_name")} />
        </Field>
        <Field label="Email Address" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp Number (with Country Code)" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" placeholder="+1 555 000 0000" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Company / Organisation" dark={dark}>
          <TextInput dark={dark} {...register("company")} />
        </Field>
        <Field label="Country of Business" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} invalid={!!errors.country} {...register("country")} />
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
      <FeeNotice dark={dark} />
      <ConsentBlock register={register("consent")} error={errors.consent?.message} dark={dark} />
      <SubmitButton loading={isSubmitting}>Submit Consultation Request</SubmitButton>
    </form>
  );
}
