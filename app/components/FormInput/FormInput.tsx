import * as React from "react";
import { FunctionComponent } from "react";
import { Input, InputProps } from "@mantine/core";
import { useActionData } from "@remix-run/react";
import { ZodFormattedError } from "zod";

interface ErrorsProps {
  errors?: string[];
}

export const Errors: FunctionComponent<ErrorsProps> = ({ errors = [] }) => (
    <>
      {errors.map((e, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Input.Error key={index}>{e}</Input.Error>
      ))}
    </>
  );

interface FormInputProps extends InputProps {
  name: string;
  label: string;
  description?: string;
}

export const FormInput = ({
  label,
  description,
  name,
  ...rest
}: FormInputProps) => {
  const data = useActionData<ZodFormattedError<Record<string, unknown>>>();
  const error = data?.[name];

  return (
    <Input.Wrapper
      label={label}
      description={description}
      // eslint-disable-next-line no-underscore-dangle
      error={<Errors errors={error?._errors as string[]} />}
    >
      <Input {...rest} />
    </Input.Wrapper>
  );
};
