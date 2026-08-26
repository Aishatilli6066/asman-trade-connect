import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { ConsentBlock, ErrorNotice, FeeNotice, Honeypot } from "./shared";
import { submitCommodityRequirement } from "@/lib/forms.functions";
import { commoditySchema, type CommodityValues } from "@/lib/forms-schemas";
import {
  COMMODITY_OPTIONS,
  INCOTERMS,
  PACKAGING_OPTIONS,
  PAYMENT_TERMS,
  SUBMISSION_CONFIRMATION,
} from "@/lib/site-data";
import { trackLead } from "@/lib/analytics";

export function CommodityRequirementForm({
  dark = false,
  source = "nigerian-commodity-sourcing",
}: {
  dark?: boolean;
  source?: string;
}) {
  const fn = useServerFn(submitCommodityRequirement);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CommodityValues>({
    resolver: zodResolver(commoditySchema),
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
          trackLead("commodity_requirement");
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
        <Field label="Buyer Name" required dark={dark} error={errors.full_name?.message}>
          <TextInput dark={dark} autoComplete="name" invalid={!!errors.full_name} {...register("full_name")} />
        </Field>
        <Field label="Company" required dark={dark} error={errors.company_name?.message}>
          <TextInput dark={dark} autoComplete="organization" invalid={!!errors.company_name} {...register("company_name")} />
        </Field>
        <Field label="Country" required dark={dark} error={errors.country?.message}>
          <TextInput dark={dark} autoComplete="country-name" invalid={!!errors.country} {...register("country")} />
        </Field>
        <Field label="Business Email" required dark={dark} error={errors.email?.message}>
          <TextInput dark={dark} type="email" inputMode="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="WhatsApp" required dark={dark} error={errors.whatsapp?.message}>
          <TextInput dark={dark} type="tel" inputMode="tel" autoComplete="tel" placeholder="+234 708 444 3626" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </Field>
        <Field label="Commodity" required dark={dark} error={errors.commodity?.message}>
          <Select dark={dark} options={COMMODITY_OPTIONS} placeholder="Select a commodity" invalid={!!errors.commodity} {...register("commodity")} />
        </Field>
        <Field label="Quantity" required dark={dark} error={errors.quantity?.message}>
          <TextInput dark={dark} placeholder="e.g. 2 x 20ft, 100 MT per month" invalid={!!errors.quantity} {...register("quantity")} />
        </Field>
        <Field label="Packaging" dark={dark} error={errors.packaging?.message}>
          <Select dark={dark} options={PACKAGING_OPTIONS} placeholder="Select if known" invalid={!!errors.packaging} {...register("packaging")} />
        </Field>
        <Field label="Destination Port" required dark={dark} error={errors.destination_port?.message}>
          <TextInput dark={dark} placeholder="e.g. Jebel Ali, Rotterdam" invalid={!!errors.destination_port} {...register("destination_port")} />
        </Field>
        <Field label="Preferred Incoterm" dark={dark} error={errors.incoterm?.message}>
          <Select dark={dark} options={INCOTERMS} placeholder="Select if known" invalid={!!errors.incoterm} {...register("incoterm")} />
        </Field>
        <Field label="Payment Terms" dark={dark} error={errors.payment_terms?.message}>
          <Select dark={dark} options={PAYMENT_TERMS} placeholder="Select if known" invalid={!!errors.payment_terms} {...register("payment_terms")} />
        </Field>
        <Field label="Shipment Timeline" dark={dark} error={errors.shipment_timeline?.message}>
          <TextInput dark={dark} placeholder="e.g. first shipment within 6 weeks" invalid={!!errors.shipment_timeline} {...register("shipment_timeline")} />
        </Field>
      </div>

      <Field label="Specifications / Quality Standard" required dark={dark} error={errors.specifications?.message}>
        <TextArea dark={dark} rows={5} placeholder="Moisture, purity, admixture, oil content, grade, certification and inspection requirements…" invalid={!!errors.specifications} {...register("specifications")} />
      </Field>

      <FeeNotice dark={dark} />
      <ConsentBlock register={register("consent")} error={errors.consent?.message} dark={dark} />
      <SubmitButton loading={isSubmitting}>Submit a Commodity Requirement</SubmitButton>
    </form>
  );
}
