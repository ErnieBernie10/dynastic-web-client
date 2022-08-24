import * as React from "react";
import { FunctionComponent } from "react";
import { AppNavbar, NavbarLink } from "@ui/common";
import { IconHome, IconSettings } from "@tabler/icons";
import { Editor, EmblemMeta, FrameMeta } from "../../../packages/coa-editor";
import {
  Basic,
  BasicXLine,
  BasicXYLine,
  BasicYLine,
  DragonEmblem,
} from "../../assets";

interface EditorProps {}

export const FrameTypes = {
  BASIC: "basic",
  BASIC_X_LINE: "basicXLine",
  BASIC_Y_LINE: "basicYLine",
  BASIC_XY_LINE: "basicXYLine",
} as const;

export const Emblems = {
  DRAGON_1: "dragon1",
} as const;

export const FramesMap: Record<keyof typeof FrameTypes, FrameMeta> = {
  BASIC: {
    icon: Basic,
    sectionCount: 1,
  },
  BASIC_X_LINE: {
    icon: BasicXLine,
    sectionCount: 2,
  },
  BASIC_XY_LINE: {
    icon: BasicXYLine,
    sectionCount: 4,
  },
  BASIC_Y_LINE: {
    icon: BasicYLine,
    sectionCount: 2,
  },
};

export const EmblemsMap: Record<keyof typeof Emblems, EmblemMeta> = {
  DRAGON_1: {
    icon: DragonEmblem,
  },
};

const EditorPage: FunctionComponent<EditorProps> = () => (
  <main>
    <AppNavbar
      topSection={<NavbarLink label="Home" icon={IconHome} to="/dashboard" />}
      bottomSection={
        <NavbarLink label="Settings" icon={IconSettings} to="/settings" />
      }
    />
    <Editor
      frames={FramesMap}
      emblems={EmblemsMap}
      onExport={async (svgBlob, configuration) => {
        console.log(svgBlob, await svgBlob.text(), configuration);
      }}
    />
  </main>
);

export default EditorPage;
