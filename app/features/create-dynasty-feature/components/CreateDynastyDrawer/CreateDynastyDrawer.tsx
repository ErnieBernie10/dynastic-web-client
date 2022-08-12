import * as React from "react";
import { FunctionComponent } from "react";
import { Button, Drawer, DrawerProps } from "@mantine/core";
import { Form } from "@remix-run/react";
import { FormInput } from "~/components/FormInput";

interface CreateDynastyDrawerProps extends DrawerProps {}

export const CreateDynastyDrawer: FunctionComponent<
  CreateDynastyDrawerProps
> = (props) => (
  <Drawer {...props}>
    <Form method="post">
      <FormInput name="name" label="Name" />
      <FormInput name="description" label="Description" />
      <Button type="submit">Submit</Button>
    </Form>
  </Drawer>
);
