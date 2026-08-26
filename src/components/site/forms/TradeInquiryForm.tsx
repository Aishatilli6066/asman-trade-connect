import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { ConsentBlock, ErrorNotice, FeeNotice, Honeypot } from "./shared";
import { tradeSchema, type TradeValues } from "@/lib/forms-schemas";
import { trackLead } from "@/lib/analytics";
import { SUBMISSION_CONFIRMATION } from "@/lib/site-data";

import { submitTradeInquiry } from "@/lib/forms.functions";
import {
  SERVICE_INTERESTS,
  BUDGET_RANGES_USD,
  DELIVERY_TIMELINES,
  INCOTERMS,
  PAYMENT_METHODS,
  INQUIRY_NOTE,
} from "@/lib/site-data";



export function TradeInquiryForm({ dark = false, source = "request-a-quote" }: { dark?: boolean; source?: string }) {
  const fn = useServerFn(submitTradeInquiry);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TradeValues>({
    resolver: zodResolver(tradeSchema),
    defaultValues: { source_page: source, website: "" },
  });

  if (done) return <SuccessState dark={dark} title="Requirement received" message={SUBMISSION_CONFIRMATION} />;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        setFailed(null);
        try {
          await fn({ data: values });
          trackLead("trade_inquiry");
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
        <Field label="Company Name" required dark={dark} error={errors.company_name?.message}>
          <TextInput dark={dark} invalid={!!errors.company_name} {...register("company_name")} />
        </Field>
        <Field label="Business Email" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp / Phone" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" placeholder="+1 555 000 0000" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Country" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Service Required" required dark={dark} error={errors.service_interest?.message}>
          <Select dark={dark} options={SERVICE_INTERESTS} invalid={!!errors.service_interest} {...register("service_interest")} />
        </Field>
        <Field label="Product / Commodity" required dark={dark} error={errors.product_required?.message}>
          <TextInput dark={dark} invalid={!!errors.product_required} {...register("product_required")} />
        </Field>
        <Field label="Quantity" required dark={dark} error={errors.quantity?.message}>
          <TextInput dark={dark} invalid={!!errors.quantity} placeholder="20 MT, 500 cartons" {...register("quantity")} />
        </Field>
        <Field label="Destination Country & Port" required dark={dark} error={errors.destination?.message}>
          <TextInput dark={dark} placeholder="UAE — Jebel Ali" invalid={!!errors.destination} {...register("destination")} />
        </Field>
        <Field label="Preferred Incoterm" required dark={dark} error={errors.incoterm?.message}>
          <Select dark={dark} options={INCOTERMS} invalid={!!errors.incoterm} {...register("incoterm")} />
        </Field>
        <Field label="Preferred Payment Method" required dark={dark} error={errors.payment_method?.message}>
          <Select dark={dark} options={PAYMENT_METHODS} invalid={!!errors.payment_method} {...register("payment_method")} />
        </Field>
        <Field label="Target Delivery Period" required dark={dark} error={errors.timeline?.message}>
          <Select dark={dark} options={DELIVERY_TIMELINES} invalid={!!errors.timeline} {...register("timeline")} />
        </Field>
        <Field label="Budget / Target Price (optional)" dark={dark} error={errors.budget_range?.message}>
          <Select dark={dark} options={BUDGET_RANGES_USD} placeholder="Select if known" invalid={!!errors.budget_range} {...register("budget_range")} />
        </Field>
      </div>
      <Field label="Required Specifications" required dark={dark} error={errors.specifications?.message}>
        <TextArea dark={dark} rows={3} placeholder="Grade, purity, moisture, packaging, certification, dimensions…" invalid={!!errors.specifications} {...register("specifications")} />
      </Field>
      <Field label="Additional Information (optional)" dark={dark} error={errors.message?.message}>
        <TextArea dark={dark} rows={5} placeholder="Anything else we should know about your requirement…" invalid={!!errors.message} {...register("message")} />
      </Field>
      <FeeNotice dark={dark} />
      <ConsentBlock register={register("consent")} error={errors.consent?.message} dark={dark} />
      <SubmitButton loading={isSubmitting}>Submit a Trade Inquiry</SubmitButton>
      <p className={dark ? "text-xs leading-relaxed text-white/55" : "text-xs leading-relaxed text-[var(--color-ink)]/55"}>
        {INQUIRY_NOTE}
      </p>
    </form>
  );
}