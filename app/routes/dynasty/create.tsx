import * as React from "react";
import { FunctionComponent } from "react";
import { MainLayout } from "~/layouts/MainLayout";
import { CreateDynastyContainer } from "~/features/dynasty-create-feature";

interface CreateProps {}

export const Create: FunctionComponent<CreateProps> = () => (
  <MainLayout>
    <CreateDynastyContainer />
  </MainLayout>
);

export default Create;
