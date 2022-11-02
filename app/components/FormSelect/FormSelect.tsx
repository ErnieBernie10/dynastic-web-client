import * as React from "react";
import { FunctionComponent } from "react";
import { Select, SelectProps } from "@mantine/core";
import { useFormErrorBehavior } from "~/util/hooks";

interface FormSelectProps extends SelectProps {
  name: string;
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  name,
  onChange,
  ...rest
}) => {
  const props = useFormErrorBehavior(name, onChange);

  return <Select name={name} {...rest} {...props} />;
};
