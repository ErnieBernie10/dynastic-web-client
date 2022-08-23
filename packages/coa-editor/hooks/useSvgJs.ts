import { useCallback, useState } from "react";
import { Svg, SVG} from "@svgdotjs/svg.js";

export const useSvgJs = () => {
  const [svg, setSvg] = useState<Svg>();
  const ref = useCallback((node: HTMLElement) => {
    if (node) {
      setSvg(SVG().addTo(node));
    }
  }, []);
  return { ref, svg };
};
