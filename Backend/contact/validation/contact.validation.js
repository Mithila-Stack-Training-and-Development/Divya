// validations/contact.validation.js
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email format (e.g. abhi@mail.com)" })
    .min(5, { message: "Email must be at least 5 characters" }),

  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(15, { message: "Phone must be at most 15 characters" }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be at most 500 characters" }),
});
