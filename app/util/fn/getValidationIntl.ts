import { i18next } from "~/i18next.server";

export const getValidationIntl = (request: Request) =>
  i18next.getFixedT(request, "validation");
