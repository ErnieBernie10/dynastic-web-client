import * as React from "react";
import { FunctionComponent } from "react";
import { Editor } from "@coa-editor/index";
import { EmblemsMap, FramesMap } from "~/routes/coa/editor";
import { useSubmit } from "@remix-run/react";
import { Dynasty, DynastyCreationStep } from "~/data-access/schemas";

interface DynastyCoaStepContainerProps {
  dynasty: Dynasty | undefined;
}

export const DynastyCoaStepContainer: FunctionComponent<
  DynastyCoaStepContainerProps
> = ({ dynasty }) => {
  const submit = useSubmit();
  return (
    <Editor
      frames={FramesMap}
      emblems={EmblemsMap}
      onExport={async (svgFile, configuration) => {
        const form = new FormData();
        form.set("coa", svgFile);
        // TODO: Find a better way of doing this
        form.set("configuration", JSON.stringify(configuration));
        form.set("action", String(1 as DynastyCreationStep));
        submit(form, {
          method: "post",
          action: `/dynasty/create?id=${dynasty?.id ? dynasty.id : ""}`,
          replace: true,
          encType: "multipart/form-data",
        });
      }}
    />
  );
};
