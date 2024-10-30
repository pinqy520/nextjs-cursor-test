import { z } from "zod";
import { ProductTypes, ProductStatuses } from "@/types/product";

export const productValidationSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .transform(val => val.trim()),
  
  productId: z.string()
    .regex(/^[A-Za-z_]+$/, "Only letters and underscores allowed")
    .min(3, "Product ID must be at least 3 characters")
    .max(30, "Product ID must be less than 30 characters"),
  
  type: z.enum([
    ProductTypes.PHYSICAL,
    ProductTypes.DIGITAL,
    ProductTypes.SERVICE
  ]),
  
  description: z.string()
    .max(500, "Description must be less than 500 words"),
  
  webhookUrl: z.string()
    .url("Must be a valid URL"),
  
  callbackKey: z.string()
    .min(1, "Callback key is required"),
  
  apiVersion: z.string().optional(),
  
  tags: z.array(z.string())
    .max(5, "Maximum 5 tags allowed")
    .optional()
    .default([]),
  
  status: z.enum([
    ProductStatuses.DRAFT,
    ProductStatuses.ACTIVE,
    ProductStatuses.DISABLED
  ]).default(ProductStatuses.DRAFT),
  
  // File fields will be handled separately in the API route
  businessLicense: z.any().optional(),
  qualificationCert: z.any().optional(),
  supplementalDocs: z.array(z.any()).optional().default([])
}); 