import * as React from "react";
import { FunctionComponent } from "react";
import { FormInput } from "~/components/FormInput";
import { Form } from "@remix-run/react";
import { Group, Button } from "@mantine/core";
import { Dynasty } from "~/data-access/schemas";

interface DynastyInfoStepContainerProps {
  prevStep: () => void;
  dynasty?: Dynasty;
}

export const DynastyInfoStepContainer: FunctionComponent<
  DynastyInfoStepContainerProps
> = ({ prevStep, dynasty }) => (
  <Form method="post">
    <FormInput name="name" label="Name" defaultValue={dynasty?.name} />
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
      <Button type="submit" name="action" value="step1">
        Next step
      </Button>
    </Group>
  </Form>
);
