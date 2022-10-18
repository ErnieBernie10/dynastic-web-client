import * as React from "react";
import { Input, InputProps } from "@mantine/core";
import { useActionData } from "@remix-run/react";
import { ZodFormattedError } from "zod";
import { FormErrors } from "~/components/FormErrors/FormErrors";
import { DatePicker } from "@mantine/dates";

interface FormDatePickerProps extends InputProps {
  name: string;
  label: string;
  description?: string;
  defaultValue?: Date | undefined | null;
}

export const FormDatePicker = ({
  label,
  description,
  name,
  defaultValue,
  required,
  ...rest
}: FormDatePickerProps) => {
  const data = useActionData<ZodFormattedError<Record<string, unknown>>>();
  const error = data?.[name];

  return (
    <Input.Wrapper
      label={label}
      description={description}
      required={required}
      // eslint-disable-next-line no-underscore-dangle
      error={<FormErrors errors={error?._errors as string[]} />}
    >
      <DatePicker
        name={name}
        defaultValue={defaultValue ?? undefined}
        inputFormat="DD/MM/YYYY"
        labelFormat="DD/MM/YYYY"
        {...rest}
      />
    </Input.Wrapper>
  );
};
