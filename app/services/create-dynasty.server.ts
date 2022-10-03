import { z } from "zod";
import {
  createDynasty,
  updateDynasty,
  uploadCoaConfiguration,
  uploadCoaFile,
} from "~/data-access/dynasty/mutations.server";
import { json } from "@remix-run/node";
import { withToken } from "~/services/auth.server";
import { isNil } from "lodash";

const createDynastySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().nullable(),
  motto: z.string().trim().nullable(),
});

export const handleBasicInfoStep = async (
  formData: FormData,
  accessToken: string,
  existingDynastyId: string | undefined | null
) => {
  const name = formData.get("name");
  const motto = formData.get("motto");
  const description = formData.get("description");
  const formValues = {
    name: name as string,
    description: description as string,
    motto: motto as string,
  };

  const validated = createDynastySchema.safeParse(formValues);

  if (!validated.success) {
    throw json(validated.error.format());
  }

  if (existingDynastyId) {
    const response = await updateDynasty(
      {
        ...validated.data,
        id: existingDynastyId,
      },
      withToken(accessToken)
    );
    if (!response.ok) throw json({ errors: ["request failed"] });
  } else {
    const response = await createDynasty(
      validated.data,
      withToken(accessToken)
    );
    // TODO: Make more generic
    if (!response.ok) throw json({ errors: ["request failed"] });
  }
};

const uploadCoaSchema = z.object({
  coa: z.instanceof(File),
  configuration: z.string(),
});

export const handleCoaStep = async (
  formData: FormData,
  accessToken: string,
  existingDynastyId: string | undefined | null
) => {
  if (isNil(existingDynastyId)) {
    return;
  }
  const formValues = {
    coa: formData.get("coa") as File,
    configuration: formData.get("configuration") as string,
  };
  const validated = uploadCoaSchema.safeParse(formValues);

  if (!validated.success) {
    throw json(validated.error.format());
  }

  await Promise.all([
    uploadCoaFile(
      { id: existingDynastyId as string, Coa: validated.data.coa },
      withToken(accessToken)
    ),
    uploadCoaConfiguration(
      {
        coaConfiguration: JSON.parse(validated.data.configuration),
        id: existingDynastyId,
      },
      withToken(accessToken)
    ),
  ]);
};
