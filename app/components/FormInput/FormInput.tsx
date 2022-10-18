import * as React from "react";
import { Input, InputProps } from "@mantine/core";
import { useActionData } from "@remix-run/react";
import { ZodFormattedError } from "zod";
import { FormErrors } from "~/components/FormErrors/FormErrors";

interface FormInputProps extends InputProps {
  name: string;
  label: string;
  description?: string;
  defaultValue?: string | undefined | null;
}

export const FormInput = ({
  label,
  description,
  name,
  defaultValue,
  required,
  ...rest
}: FormInputProps) => {
  const data = useActionData<ZodFormattedError<Record<string, unknown>>>();
  const error = data?.[name];

  return (
    <Input.Wrapper
      label={label}
      description={description}
      // eslint-disable-next-line no-underscore-dangle
      error={<FormErrors errors={error?._errors as string[]} />}
      required={required}
    >
      <Input name={name} defaultValue={defaultValue ?? undefined} {...rest} />
    </Input.Wrapper>
  );
};
