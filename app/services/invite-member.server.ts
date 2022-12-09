import { z } from "zod";
import { extractFormValues, getCallback } from "~/util/fn";
import { InviteMemberFormFields } from "~/services/formFields";
import { json } from "@remix-run/node";
import { inviteToDynasty } from "~/data-access/dynasty/mutations.server";
import { withSessionFromRequest, withToken } from "~/services/auth.server";
import { toastResponse } from "~/util/fn/jsonResponse";

const inviteMemberSchema = z.object({
  email: z.string().email(),
});
export const handleInviteMember = async (
  request: Request,
  accessToken: string,
  formData: FormData
) => {
  const url = new URL(request.url);

  const dynastyId = url.searchParams.get("dynastyId");

  if (!dynastyId) {
    throw new Error("DynastyId must be defined");
  }

  const formValues = extractFormValues(formData, InviteMemberFormFields);

  const validated = inviteMemberSchema.safeParse(formValues);

  if (!validated.success) {
    return json(validated.error.format());
  }

  const response = await inviteToDynasty(
    {
      email: validated.data.email,
      dynastyId,
      callback: getCallback(request, "invite"),
    },
    withToken(accessToken)
  );

  if (response.ok) {
    return toastResponse(
      "success",
      `Successfully sent an invite to ${validated.data.email}`,
      await withSessionFromRequest(request)
    );
  }

  throw new Error(response.statusText);
};
