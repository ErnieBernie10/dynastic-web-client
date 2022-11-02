import { useActionData } from "@remix-run/react";
import { ZodFormattedError } from "zod";
import { useEffect, useState } from "react";
import { first } from "lodash";

export const useFormErrorBehavior = <T>(
  name: string,
  // eslint-disable-next-line no-unused-vars
  onChange: ((val: T) => void) | undefined
) => {
  const data = useActionData<ZodFormattedError<Record<string, unknown>>>();
  const error = data?.[name];
  const [changed, setChanged] = useState(false);

  const errors =
    // eslint-disable-next-line no-underscore-dangle
    error && !changed ? first(error?._errors as string[]) : undefined;

  useEffect(() => {
    setChanged(false);
  }, [data]);

  const handleOnChange = (e: T) => {
    setChanged(true);
    onChange?.(e);
  };

  return { onChange: handleOnChange, error: errors };
};
