import * as React from "react";
import { FunctionComponent } from "react";
import { Button, Container } from "@mantine/core";
import { Form } from "@remix-run/react";
import { Dynasty } from "~/data-access/schemas";
import { InviteMemberFormFields } from "~/services/formFields";
import { FormInput } from "~/components/FormInput";

interface InviteToDynastyDrawerProps {
  dynasty: Dynasty;
  isLoading: boolean;
}

export const InviteToDynastyDrawer: FunctionComponent<InviteToDynastyDrawerProps> = ({
  dynasty,
  isLoading,
}) => (
  <Container>
    <Form method="post" action={`/dashboard?dynastyId=${dynasty.id}`}>
      <FormInput
        type="email"
        name={InviteMemberFormFields.email}
        label="E-mail"
        required
      />
      <Button
        type="submit"
        name="action"
        value="invite-member"
        mt={8}
        loading={isLoading}
      >
        Invite
      </Button>
    </Form>
  </Container>
);
