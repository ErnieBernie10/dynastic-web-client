import * as React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { useFormErrorBehavior } from "../../../packages/util/hooks/useFormErrorBehavior";

interface FormInputProps extends Omit<TextInputProps, "defaultValue"> {
  name: string;
  label: string;
  description?: string;
  defaultValue?: string | null | undefined;
}

export const FormInput = ({
  label,
  description,
  name,
  defaultValue,
  required,
  onChange,
  ...rest
}: FormInputProps) => {
  const props = useFormErrorBehavior(name, onChange)

  return (
    <TextInput
      label={label}
      description={description}
      required={required}
      name={name}
      defaultValue={defaultValue ?? undefined}
      {...rest}
      {...props}
    />
  );
};
