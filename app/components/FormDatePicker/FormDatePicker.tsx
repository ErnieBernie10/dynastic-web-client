import * as React from "react";
import { DatePickerInputProps, DatePickerInput } from "mantine-dates-6";
import { useFormErrorBehavior } from "~/util/hooks";

interface FormDatePickerProps extends DatePickerInputProps {
  name: string;
  label: string;
  description?: string;
  defaultValue?: Date | undefined | null;
}

export const FormDatePicker = ({
  name,
  defaultValue,
  onChange,
  ...rest
}: FormDatePickerProps) => {
  const props = useFormErrorBehavior(name, onChange);

  return (
    <DatePickerInput
      name={name}
      defaultValue={defaultValue ?? undefined}
      {...rest}
      {...props}
    />
  );
};
