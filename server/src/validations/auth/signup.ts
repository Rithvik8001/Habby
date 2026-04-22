import { z } from "zod";

export const signupSchema = z.object({
  userName: z.string().min(3).max(20).trim(),
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .min(8)
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export default function validateSignupData(data: SignupSchema) {
  const result = signupSchema.safeParse(data);
  return result;
}
