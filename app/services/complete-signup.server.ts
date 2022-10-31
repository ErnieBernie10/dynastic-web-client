import { completeSignup } from "~/data-access/user/mutations.server";
import z from "zod";
import { json, redirect } from "@remix-run/node";
import { extractFormValues } from "~/util/fn";
import { withSessionFromRequest, withToken } from "./auth.server";
import { CompleteSignupFormFields } from "./formFields";

const completeSignupSchema = z.object({
  [CompleteSignupFormFields.firstname]: z.string().trim().min(1),
  [CompleteSignupFormFields.lastname]: z.string().trim().min(1),
  [CompleteSignupFormFields.middleName]: z.string().trim().nullable(),
  [CompleteSignupFormFields.birthDate]: z
    .string()
    .transform((dateString) => {
      // TODO: Make generic
      try {
        return new Date(dateString).toISOString();
      } catch {
        return "";
      }
    })
    .refine((val) => val.length > 0, {
      message: "Birth date cannot be empty",
    }),
});

export const handleCompleteSignup = async (
  accessToken: string,
  request: Request
) => {
  const formData = await request.formData();

  const fields = extractFormValues(formData, CompleteSignupFormFields);

  const validated = completeSignupSchema.safeParse(fields);

  if (!validated.success) {
    return json(validated.error.format());
  }

  const response = await completeSignup(validated.data, withToken(accessToken));
  if (response.ok) {
    return redirect("dashboard", await withSessionFromRequest(request));
  }
  throw new Error(response.statusText);
};
