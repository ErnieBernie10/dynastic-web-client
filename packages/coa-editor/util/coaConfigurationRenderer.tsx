import { SVG, Svg } from "@svgdotjs/svg.js";
import React, { ElementType } from "react";
import ReactDOMServer from "react-dom/server";
import { EmblemsRecord, Section } from "../interface";

interface RenderEmblemOptions {
  x: number;
  y: number;
  size: number;
  scale: number;
}

const renderEmblem = (
  svg: Svg,
  Element: ElementType,
  { x, y, size, scale }: RenderEmblemOptions
) =>
  svg.add(
    SVG(ReactDOMServer.renderToString(<Element />))
      .move(x, y)
      .scale(scale)
      .size(size)
  );

const BORDER_SIZE = 8;
const SCALE = 0.5;
const EMBLEM_SIZE = 128;

const renderSection = (svg: Svg, element: ElementType | string, index: number) => {
  switch (index) {
    case 0:
      renderEmblem(svg, element as ElementType, {
        x: BORDER_SIZE,
        y: BORDER_SIZE,
        scale: SCALE,
        size: EMBLEM_SIZE - BORDER_SIZE * 2,
      });
      break;
    case 1:
      renderEmblem(svg, element as ElementType, {
        x: BORDER_SIZE + EMBLEM_SIZE,
        y: BORDER_SIZE,
        scale: SCALE,
        size: EMBLEM_SIZE - BORDER_SIZE * 2,
      });
      break;
    case 2:
      renderEmblem(svg, element as ElementType, {
        x: BORDER_SIZE,
        y: BORDER_SIZE + EMBLEM_SIZE,
        scale: SCALE,
        size: EMBLEM_SIZE - BORDER_SIZE * 2,
      });
      break;
    case 3:
      renderEmblem(svg, element as ElementType, {
        x: BORDER_SIZE + EMBLEM_SIZE,
        y: BORDER_SIZE + EMBLEM_SIZE,
        scale: SCALE,
        size: EMBLEM_SIZE - BORDER_SIZE * 2,
      });
      break;
    default:
      break;
  }
};

export const renderSections = (
  svg: Svg,
  emblems: EmblemsRecord,
  sections: Section[] | undefined = []
) => {
  sections.map((section, index) => renderSection(svg, emblems[section.emblemKey].icon, index));
};
