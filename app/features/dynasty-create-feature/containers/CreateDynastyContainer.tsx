import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Stepper } from "@mantine/core";
import { useAppTranslation } from "~/util/hooks";
import { Dynasty } from "~/data-access/schemas";
import { DynastyInfoStepContainer } from "./DynastyInfoStepContainer";

interface CreateDynastyContainerProps {
  dynasty: Dynasty | undefined;
}

export const CreateDynastyContainer: FunctionComponent<
  CreateDynastyContainerProps
> = ({ dynasty }) => {
  const { t } = useAppTranslation();
  const [active, setActive] = useState((dynasty?.creationStep ?? 0) + 1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stepper active={active} onStepClick={setActive} breakpoint="sm">
      <Stepper.Step
        label={t("createDynasty.step1.label")}
        description={t("createDynasty.step1.description")}
        allowStepSelect={active > 0}
      >
        <DynastyInfoStepContainer nextStep={nextStep} prevStep={prevStep} dynasty={dynasty} />
      </Stepper.Step>
      <Stepper.Step
        label={t("createDynasty.step2.label")}
        description={t("createDynasty.step2.description")}
        allowStepSelect={active > 1}
      >
        Step 2 content: Verify email
      </Stepper.Step>
      <Stepper.Step
        label={t("createDynasty.step3.label")}
        description={t("createDynasty.step3.description")}
        allowStepSelect={active > 2}
      >
        Step 3 content: Get full access
      </Stepper.Step>
      <Stepper.Completed>
        Completed, click back button to get to previous step
      </Stepper.Completed>
    </Stepper>
  );
};
