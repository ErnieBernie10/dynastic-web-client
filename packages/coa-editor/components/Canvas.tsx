import { Box } from "@mantine/core";
import * as React from "react";
import { ElementType, FunctionComponent, useEffect } from "react";
import { Svg, SVG } from "@svgdotjs/svg.js";
import ReactDOMServer from "react-dom/server";
import { useCoa } from "../context/CoaContext";
import { useSvgJs } from "../hooks/useSvgJs";
import { Section } from "../interface";

interface CanvasProps {}

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
const render1 = (svg: Svg, section: Section) => {
  renderEmblem(svg, section.element as ElementType, {
    x: 8,
    y: 8,
    scale: 0.5,
    size: 112,
  });
};
const render2 = (svg: Svg, section: Section) => {
  renderEmblem(svg, section.element as ElementType, {
    x: 8 + 16 + 112,
    y: 8,
    scale: 0.5,
    size: 112,
  });
};

const renderSection = (
  svg: Svg,
  section: Section,
  sections: Section[] | undefined,
  index: number
) => {
  console.log(section);
  switch (sections?.length) {
    case 1:
      render1(svg, section);
      break;
    case 2:
      render2(svg, section);
      break;
  }
};

export const Canvas: FunctionComponent<CanvasProps> = () => {
  const {
    frames,
    configuration: { frame, sections },
  } = useCoa();

  const Frame = frame ? frames[frame].icon : null;

  const { ref, svg } = useSvgJs();

  useEffect(() => {
    if (svg) {
      console.log(sections);
      sections?.map((section, index) =>
        renderSection(svg, section, sections, index)
      );
    }
  }, [svg, sections]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        "> svg": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      {Frame && <Frame ref={ref} />}
    </Box>
  );
};
