import { extractFormValues } from "~/util/fn";
import { CreateMemberFormFields } from "~/services/formFields";
import { z } from "zod";
import { json, redirect } from "@remix-run/node";
import {
  addMember,
  updateMember,
} from "~/data-access/dynasty/mutations.server";
import { withSessionFromRequest, withToken } from "~/services/auth.server";

const createMemberSchema = z.object({
  [CreateMemberFormFields.firstname]: z.string().trim().min(1),
  [CreateMemberFormFields.lastname]: z.string().trim().min(1),
  [CreateMemberFormFields.middleName]: z.string().trim().nullable().optional(),
  [CreateMemberFormFields.fatherId]: z.string().nullable().optional(),
  [CreateMemberFormFields.motherId]: z.string().nullable().optional(),
  [CreateMemberFormFields.birthDate]: z
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

export const handleCreateMember = async (
  request: Request,
  accessToken: string
) => {
  const url = new URL(request.url);

  const dynastyId = url.searchParams.get("dynastyId");

  if (!dynastyId) {
    throw new Error("DynastyId not set");
  }

  const formData = await request.formData();
  const formValues = extractFormValues(formData, CreateMemberFormFields);

  const validated = createMemberSchema.safeParse(formValues);

  if (!validated.success) {
    return json(validated.error.format());
  }

  const response = await addMember(
    { ...validated.data, dynastyId },
    withToken(accessToken)
  );

  if (response.ok) {
    return redirect("/dashboard", await withSessionFromRequest(request));
  }

  throw new Error(response.statusText);
};

export const handleUpdateMember = async (
  request: Request,
  accessToken: string
) => {
  const url = new URL(request.url);

  const dynastyId = url.searchParams.get("dynastyId");
  const personId = url.searchParams.get("personId");

  if (!dynastyId) {
    throw new Error("DynastyId not set");
  }
  if (!personId) {
    throw new Error("PersonId not set");
  }

  const formData = await request.formData();
  const formValues = extractFormValues(formData, CreateMemberFormFields);

  const validated = createMemberSchema.safeParse(formValues);

  if (!validated.success) {
    return json(validated.error.format());
  }

  const response = await updateMember(
    { ...validated.data, dynastyId, id: personId },
    withToken(accessToken)
  );

  if (response.ok) {
    return redirect("/dashboard", await withSessionFromRequest(request));
  }

  throw new Error(response.statusText);
};
