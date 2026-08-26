import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { ConsentBlock, ErrorNotice, FeeNotice, Honeypot } from "./shared";
import { exportSchema, type ExportValues } from "@/lib/forms-schemas";
import { trackLead } from "@/lib/analytics";
import { SUBMISSION_CONFIRMATION } from "@/lib/site-data";

import { submitExportInquiry } from "@/lib/forms.functions";
import { COMMODITY_OPTIONS, SHIPPING_METHODS, INQUIRY_NOTE } from "@/lib/site-data";



export function ExportInquiryForm({ source = "agricultural-export" }: { source?: string } = {}) {
  const fn = useServerFn(submitExportInquiry);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ExportValues>({
    resolver: zodResolver(exportSchema),
    defaultValues: { source_page: source, website: "" },
  });

  if (done) return <SuccessState dark title="Export inquiry received" message={SUBMISSION_CONFIRMATION} />;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        setFailed(null);
        try {
          await fn({ data: values });
          trackLead("export_inquiry");
          setDone(true);
        } catch (e) {
          setFailed(e instanceof Error && e.message ? e.message : "Your enquiry could not be sent. Please email contact@asmanprimehub.com or message us on WhatsApp.");
        }
      })}
      className="relative grid gap-5"
    >
      <Honeypot register={register("website")} />
      <input type="hidden" {...register("source_page")} />
      {failed && <ErrorNotice message={failed} dark />}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" required dark error={errors.full_name?.message}>
          <TextInput dark invalid={!!errors.full_name} {...register("full_name")} />
        </Field>
        <Field label="Company Name" required dark error={errors.company_name?.message}>
          <TextInput dark invalid={!!errors.company_name} {...register("company_name")} />
        </Field>
        <Field label="Country" required dark error={errors.country?.message}>
          <TextInput dark invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Email Address" required dark error={errors.email?.message}>
          <TextInput dark type="email" inputMode="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp Number" required dark error={errors.whatsapp?.message}>
          <TextInput dark type="tel" inputMode="tel" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Commodity of Interest" required dark error={errors.commodity?.message}>
          <Select dark options={COMMODITY_OPTIONS} invalid={!!errors.commodity} {...register("commodity")} />
        </Field>
        <Field label="Estimated Quantity / Volume" required dark error={errors.quantity?.message}>
          <TextInput dark placeholder="10 MT, 1 x 20ft container" invalid={!!errors.quantity} {...register("quantity")} />
        </Field>
        <Field label="Shipping Destination" required dark error={errors.shipping_destination?.message}>
          <TextInput dark invalid={!!errors.shipping_destination} {...register("shipping_destination")} />
        </Field>
        <Field label="Preferred Shipping Method" dark>
          <Select dark options={SHIPPING_METHODS} {...register("shipping_method")} />
        </Field>
      </div>
      <Field label="Additional Requirements" dark>
        <TextArea dark {...register("requirements")} />
      </Field>
      <FeeNotice dark />
      <ConsentBlock register={register("consent")} error={errors.consent?.message} dark />
      <SubmitButton loading={isSubmitting}>Submit Export Inquiry</SubmitButton>
      <p className="text-xs leading-relaxed text-white/55">{INQUIRY_NOTE}</p>
    </form>
  );
}