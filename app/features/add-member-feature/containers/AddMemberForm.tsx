import * as React from "react";
import { FunctionComponent } from "react";
import { Button, Container, Text, Title } from "@mantine/core";
import { Form } from "@remix-run/react";
import { FormInput } from "~/components/FormInput";
import { FormDatePicker } from "~/components/FormDatePicker";
import { CreateMemberFormFields } from "~/services/formFields";
import { Dynasty } from "~/data-access/schemas";

interface AddMemberDrawer {
  dynasty: Dynasty;
  isLoading: boolean;
}

export const AddMemberForm: FunctionComponent<AddMemberDrawer> = ({
  dynasty,
  isLoading,
}) => (
  <Container>
    <Title>
      Add a member to{" "}
      <Text weight={700} sx={{ display: "inline" }}>
        {dynasty.name}
      </Text>
    </Title>
    <Form method="post" action={`/dashboard?dynastyId=${dynasty.id}`}>
      <FormInput
        name={CreateMemberFormFields.firstname}
        label="Firstname"
        required
      />
      <FormInput name={CreateMemberFormFields.middleName} label="Middle name" />
      <FormInput
        name={CreateMemberFormFields.lastname}
        label="Lastname"
        required
      />
      <FormDatePicker
        name={CreateMemberFormFields.birthDate}
        label="Date of birth"
        required
      />
      <Button type="submit" color="primary" mt={8} loading={isLoading}>
        Add
      </Button>
    </Form>
  </Container>
);
