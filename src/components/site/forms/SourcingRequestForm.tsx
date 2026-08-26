import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { ConsentBlock, ErrorNotice, FeeNotice, Honeypot } from "./shared";
import { submitSourcingRequest } from "@/lib/forms.functions";
import { sourcingSchema, type SourcingValues } from "@/lib/forms-schemas";
import { BRANDING_NEEDS, BUDGET_RANGES_USD, PREFERRED_ORIGINS, SUBMISSION_CONFIRMATION } from "@/lib/site-data";
import { trackLead } from "@/lib/analytics";

export function SourcingRequestForm({ dark = false, source = "global-sourcing" }: { dark?: boolean; source?: string }) {
  const fn = useServerFn(submitSourcingRequest);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SourcingValues>({
    resolver: zodResolver(sourcingSchema),
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
          trackLead("sourcing_assessment");
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

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" required dark={dark} error={errors.full_name?.message}>
          <TextInput dark={dark} autoComplete="name" invalid={!!errors.full_name} {...register("full_name")} />
        </Field>
        <Field label="Company" required dark={dark} error={errors.company_name?.message}>
          <TextInput dark={dark} autoComplete="organization" invalid={!!errors.company_name} {...register("company_name")} />
        </Field>
        <Field label="Business Email" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" autoComplete="tel" placeholder="+234 708 444 3626" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Product / Machinery / Raw Material" required dark={dark} error={errors.product?.message}>
          <TextInput dark={dark} invalid={!!errors.product} {...register("product")} />
        </Field>
        <Field label="Quantity" required dark={dark} error={errors.quantity?.message}>
          <TextInput dark={dark} placeholder="e.g. 2 units, 20 MT, 5,000 pcs" invalid={!!errors.quantity} {...register("quantity")} />
        </Field>
        <Field label="Preferred Origin" dark={dark} error={errors.preferred_origin?.message}>
          <Select dark={dark} options={PREFERRED_ORIGINS} placeholder="Select if known" invalid={!!errors.preferred_origin} {...register("preferred_origin")} />
        </Field>
        <Field label="Branding / Private Label" dark={dark} error={errors.branding_needs?.message}>
          <Select dark={dark} options={BRANDING_NEEDS} placeholder="Select if known" invalid={!!errors.branding_needs} {...register("branding_needs")} />
        </Field>
        <Field label="Delivery Location" required dark={dark} error={errors.delivery_location?.message}>
          <TextInput dark={dark} placeholder="City, country and port if known" invalid={!!errors.delivery_location} {...register("delivery_location")} />
        </Field>
        <Field label="Target Budget" dark={dark} error={errors.target_budget?.message}>
          <Select dark={dark} options={BUDGET_RANGES_USD} placeholder="Select if known" invalid={!!errors.target_budget} {...register("target_budget")} />
        </Field>
      </div>

      <Field label="Required Delivery Date" dark={dark} error={errors.required_delivery_date?.message}>
        <TextInput dark={dark} placeholder="e.g. Q3 2026, within 8 weeks" invalid={!!errors.required_delivery_date} {...register("required_delivery_date")} />
      </Field>

      <Field label="Detailed Specifications" required dark={dark} error={errors.specifications?.message}>
        <TextArea dark={dark} rows={5} placeholder="Technical specification, materials, capacity, certification, packaging, tolerances…" invalid={!!errors.specifications} {...register("specifications")} />
      </Field>

      <FeeNotice dark={dark} />
      <ConsentBlock register={register("consent")} error={errors.consent?.message} dark={dark} />
      <SubmitButton loading={isSubmitting}>Request a Sourcing Assessment</SubmitButton>
    </form>
  );
}
