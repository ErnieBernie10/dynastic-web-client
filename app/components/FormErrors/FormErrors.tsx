import { Input } from "@mantine/core";
import React, { FunctionComponent } from "react";

interface ErrorsProps {
  errors?: string[];
}

export const FormErrors: FunctionComponent<ErrorsProps> = ({ errors = [] }) => (
  <>
    {errors.map((e, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Input.Error key={index}>{e}</Input.Error>
    ))}
  </>
);
