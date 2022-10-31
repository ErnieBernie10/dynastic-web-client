import * as React from "react";
import { FunctionComponent } from "react";
import { Form } from "@remix-run/react";
import { FormInput } from "~/components/FormInput";
import { Button, Text, Title } from "@mantine/core";
import { FormDatePicker } from "~/components/FormDatePicker";
import { useLoading } from "~/util/hooks/useLoading";
import { CompleteSignupFormFields } from "~/services/formFields";

interface CompleteSignupContainerProps {}

export const CompleteSignupContainer: FunctionComponent<
  CompleteSignupContainerProps
> = () => {
  const loading = useLoading();
  return (
    <>
      <Title>Welcome!</Title>
      <Text color="dimmed">
        Before you can get started we need a few more details...
      </Text>
      <Form method="post" action="/signup/complete">
        <FormInput
          name={CompleteSignupFormFields.firstname}
          label="Firstname"
          required
        />
        <FormInput
          name={CompleteSignupFormFields.middleName}
          label="Middle name"
        />
        <FormInput
          name={CompleteSignupFormFields.lastname}
          label="Lastname"
          required
        />
        <FormDatePicker
          name={CompleteSignupFormFields.birthDate}
          label="Date of birth"
          required
        />
        <Text color="dimmed" mt={8}>
          <Text
            color="dimmed"
            weight={700}
            style={{ display: "inline" }}
            mr={4}
          >
            NOTE:
          </Text>
          You will NOT be able to change these values in the future
        </Text>
        <Button type="submit" color="primary" mt={8} loading={loading}>
          Finish
        </Button>
      </Form>
    </>
  );
};
