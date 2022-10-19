import { useActionData } from "@remix-run/react";
import { ZodFormattedError } from "zod";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { first } from "lodash";

export const useFormErrorBehavior = (
  name: string,
  onChange: ChangeEventHandler | undefined
) => {
  const data = useActionData<ZodFormattedError<Record<string, unknown>>>();
  const error = data?.[name];
  const [changed, setChanged] = useState(false);

  // eslint-disable-next-line no-underscore-dangle
  const errors = error && !changed ? first(error?._errors as string[]) : undefined;

  useEffect(() => {
    setChanged(false);
  }, [data]);

  const handleOnChange = (e: ChangeEvent) => {
    setChanged(true);
    onChange?.(e);
  };

  return { onChange: handleOnChange, error: errors };
};
