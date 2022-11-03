import * as React from "react";
import { FunctionComponent } from "react";
import { Button, Container, Text, Title } from "@mantine/core";
import { Form } from "@remix-run/react";
import { FormInput } from "~/components/FormInput";
import { FormDatePicker } from "~/components/FormDatePicker";
import { CreateMemberFormFields } from "~/services/formFields";
import { Dynasty, Person } from "~/data-access/schemas";
import { FormSelect } from "~/components/FormSelect";
import { getFullName } from "~/util/fn";
import { PersonListItem } from "~/components/PersonListItem";

interface ModifyMemberDrawerProps {
  dynasty: Dynasty;
  isLoading: boolean;
  member?: Person | null;
}

export const ModifyMemberDrawer: FunctionComponent<ModifyMemberDrawerProps> = ({
  dynasty,
  isLoading,
  member,
}) => {
  const membersData =
    dynasty.members?.map((m) => ({
      label: getFullName(m),
      value: m.id ?? "",
    })) ?? [];

  return (
    <Container>
      {!member && (
        <Title>
          Add a member to{" "}
          <Text weight={700} sx={{ display: "inline" }}>
            {dynasty.name}
          </Text>
        </Title>
      )}
      <Form
        method={member ? "put" : "post"}
        action={`/dashboard?dynastyId=${dynasty.id}${
          member ? `&personId=${member.id}` : ""
        }`}
      >
        <FormInput
          name={CreateMemberFormFields.firstname}
          label="Firstname"
          defaultValue={member?.firstname}
          required
        />
        <FormInput
          name={CreateMemberFormFields.middleName}
          label="Middle name"
          defaultValue={member?.middleName}
        />
        <FormInput
          name={CreateMemberFormFields.lastname}
          label="Lastname"
          defaultValue={member?.lastname}
          required
        />
        <FormDatePicker
          name={CreateMemberFormFields.birthDate}
          label="Date of birth"
          defaultValue={
            member?.birthDate ? new Date(member.birthDate) : undefined
          }
          required
        />
        <FormSelect
          name={CreateMemberFormFields.fatherId}
          label="Father"
          defaultValue={member?.fatherId}
          data={membersData}
          itemComponent={PersonListItem}
        />
        <FormSelect
          name={CreateMemberFormFields.motherId}
          label="Mother"
          defaultValue={member?.motherId}
          data={membersData}
          itemComponent={PersonListItem}
        />
        <Button type="submit" color="primary" mt={8} loading={isLoading}>
          {member ? "Update" : "Add"}
        </Button>
      </Form>
    </Container>
  );
};
