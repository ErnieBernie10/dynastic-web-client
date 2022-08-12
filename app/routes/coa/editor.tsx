import * as React from "react";
import {FunctionComponent, ReactNode} from "react";
import { AppNavbar, NavbarLink } from "@ui/common";
import { IconHome, IconSettings } from "@tabler/icons";
import { Editor } from "../../../packages/coa-editor";
import { Basic, BasicXLine, BasicXYLine, BasicYLine } from "../../assets";

interface EditorProps {}


export const FrameTypes = {
  BASIC: "basic",
  BASIC_X_LINE: "basicXLine",
  BASIC_Y_LINE: "basicYLine",
  BASIC_XY_LINE: "basicXYLine",
} as const;

export const FramesMap: Record<keyof typeof FrameTypes, ReactNode> = {
  BASIC: <Basic />,
  BASIC_X_LINE: <BasicXLine />,
  BASIC_XY_LINE: <BasicXYLine />,
  BASIC_Y_LINE: <BasicYLine />,
};

const EditorPage: FunctionComponent<EditorProps> = () => (
    <main>
      <AppNavbar
        topSection={<NavbarLink label="Home" icon={IconHome} to="/dashboard" />}
        bottomSection={
          <NavbarLink label="Settings" icon={IconSettings} to="/settings" />
        }
      />
      <Editor frames={FramesMap} />
    </main>
  );

export default EditorPage;
