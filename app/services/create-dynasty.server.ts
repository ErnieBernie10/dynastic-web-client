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
import { getValidationIntl } from "~/util/fn/getValidationIntl";

export const CreateDynastyFormFields = {
  name: "name",
  description: "description",
  motto: "motto",
} as const;

export const handleBasicInfoStep = async (
  formData: FormData,
  accessToken: string,
  existingDynastyId: string | undefined | null,
  request: Request,
) => {
  const t = await getValidationIntl(request);
  const createDynastySchema = z.object({
    [CreateDynastyFormFields.name]: z.string().trim().min(1, { message: t("errors.min", { field: "Name"})}),
    [CreateDynastyFormFields.description]: z.string().trim().nullable(),
    [CreateDynastyFormFields.motto]: z.string().trim().nullable(),
  });

  const name = formData.get(CreateDynastyFormFields.name);
  const motto = formData.get(CreateDynastyFormFields.motto);
  const description = formData.get(CreateDynastyFormFields.description);
  const formValues = {
    name: name as string,
    description: description as string,
    motto: motto as string,
  };

  const validated = createDynastySchema.safeParse(formValues);

  if (!validated.success) {
    return json(validated.error.format());
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

  return null;
};

const uploadCoaSchema = z.object({
  coa: z.instanceof(File),
  configuration: z.string(),
});

export const handleCoaStep = async (
  formData: FormData,
  accessToken: string,
  existingDynastyId: string | undefined | null,
  // eslint-disable-next-line no-unused-vars
  request: Request
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

  await uploadCoaFile(
    { id: existingDynastyId as string, Coa: validated.data.coa },
    withToken(accessToken)
  );
  await uploadCoaConfiguration(
    {
      coaConfiguration: JSON.parse(validated.data.configuration),
      id: existingDynastyId,
    },
    withToken(accessToken)
  );
};
