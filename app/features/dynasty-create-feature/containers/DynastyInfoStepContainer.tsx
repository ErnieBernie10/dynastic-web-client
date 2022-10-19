import * as React from "react";
import { FunctionComponent } from "react";
import { FormInput } from "~/components/FormInput";
import { Form, useTransition } from "@remix-run/react";
import { Group, Button } from "@mantine/core";
import { Dynasty, DynastyCreationStep } from "~/data-access/schemas";

interface DynastyInfoStepContainerProps {
  prevStep: () => void;
  dynasty?: Dynasty;
}

export const DynastyInfoStepContainer: FunctionComponent<
  DynastyInfoStepContainerProps
> = ({ prevStep, dynasty }) => {
  const { state } = useTransition();

  return (
    <Form
      method="post"
      action={`/dynasty/create?id=${dynasty?.id ? dynasty.id : ""}`}
    >
      <FormInput
        name="name"
        label="Name"
        defaultValue={dynasty?.name}
        required
      />
      <FormInput name="motto" label="Motto" defaultValue={dynasty?.motto} />
      <FormInput
        name="description"
        label="Description"
        defaultValue={dynasty?.description}
      />
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button
          type="submit"
          name="action"
          value={0 as DynastyCreationStep}
          loading={state === "loading" || state === "submitting"}
        >
          Next step
        </Button>
      </Group>
    </Form>
  );
};
