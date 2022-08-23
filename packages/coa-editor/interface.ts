import { ElementType } from "react";

type Pos = "left" | "right" | "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";

export interface Section {
  element: ElementType | string;
  pos: Pos;
  scale: number;
}

export interface CoaConfiguration {
  frame?: string;
  sections?: Section[];
}

export interface FrameMeta {
  icon: ElementType | string;
  sectionCount: number;
}

export interface EmblemMeta {
  icon: ElementType | string;
}

export type FramesRecord = Record<string, FrameMeta>;
export type EmblemsRecord = Record<string, EmblemMeta>;
