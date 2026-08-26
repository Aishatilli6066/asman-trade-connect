import { createServerFn } from "@tanstack/react-start";
import {
  sourcingSchema,
  commoditySchema,
  tradeSchema,
  consultationSchema,
  exportSchema,
} from "./forms-schemas";
import { handleSubmission } from "./submissions.server";

export const submitSourcingRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => sourcingSchema.parse(input))
  .handler(async ({ data }) => handleSubmission("Global Sourcing Assessment Request", data));

export const submitCommodityRequirement = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => commoditySchema.parse(input))
  .handler(async ({ data }) => handleSubmission("Commodity Requirement", data));

export const submitTradeInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tradeSchema.parse(input))
  .handler(async ({ data }) => handleSubmission("Trade Inquiry", data));

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => consultationSchema.parse(input))
  .handler(async ({ data }) => handleSubmission("Consultation Request", data));

export const submitExportInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => exportSchema.parse(input))
  .handler(async ({ data }) => handleSubmission("Export Inquiry", data));
