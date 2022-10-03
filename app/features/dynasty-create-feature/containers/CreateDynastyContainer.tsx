import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { Stepper } from "@mantine/core";
import { useAppTranslation } from "~/util/hooks";
import { Dynasty } from "~/data-access/schemas";
import { isNil } from "lodash";
import { DynastyCoaStepContainer } from "./DynastyCoaStepContainer";
import { DynastyInfoStepContainer } from "./DynastyInfoStepContainer";

interface CreateDynastyContainerProps {
  dynasty: Dynasty | undefined;
}

const getCreateDynastyStep = (dynasty: Dynasty | undefined) =>
  isNil(dynasty?.creationStep) ? 0 : (dynasty?.creationStep ?? 0) + 1;

export const CreateDynastyContainer: FunctionComponent<
  CreateDynastyContainerProps
> = ({ dynasty }) => {
  const { t } = useAppTranslation();
  const [active, setActive] = useState(getCreateDynastyStep(dynasty));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    setActive(getCreateDynastyStep(dynasty));
  }, [dynasty]);

  return (
    <Stepper active={active} onStepClick={setActive} breakpoint="sm">
      <Stepper.Step
        label={t("createDynasty.step1.label")}
        description={t("createDynasty.step1.description")}
        allowStepSelect={active > 0}
      >
        <DynastyInfoStepContainer prevStep={prevStep} dynasty={dynasty} />
      </Stepper.Step>
      <Stepper.Step
        label={t("createDynasty.step2.label")}
        description={t("createDynasty.step2.description")}
        allowStepSelect={active > 1}
      >
        <DynastyCoaStepContainer dynasty={dynasty} />
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
