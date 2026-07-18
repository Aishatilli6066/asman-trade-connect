import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Field, TextInput, TextArea, Select, SubmitButton, SuccessState } from "../form-fields";
import { submitExportInquiry } from "@/lib/forms.functions";
import { COMMODITY_OPTIONS, SHIPPING_METHODS } from "@/lib/site-data";

const schema = z.object({
  full_name: z.string().min(1, "Required"),
  company_name: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  whatsapp: z.string().min(5, "Required"),
  commodity: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  shipping_destination: z.string().min(1, "Required"),
  shipping_method: z.string().optional(),
  requirements: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function ExportInquiryForm() {
  const fn = useServerFn(submitExportInquiry);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (done) return <SuccessState dark title="Export inquiry received" message="Thanks — we've received your inquiry. Our export desk will follow up with pricing and next steps within 24 hours." />;

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try {
          await fn({ data: values });
          setDone(true);
          toast.success("Inquiry submitted");
        } catch {
          toast.error("Submission failed", { description: "Please try again or email contact@asmanprimehub.com." });
        }
      })}
      className="grid gap-5"
    >
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
      <SubmitButton loading={isSubmitting}>Submit Export Inquiry</SubmitButton>
    </form>
  );
}