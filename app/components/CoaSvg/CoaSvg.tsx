import * as React from "react";
import {
  DetailedHTMLProps,
  FunctionComponent, ImgHTMLAttributes, ObjectHTMLAttributes,
} from "react";

type Size = "sm" | "md" | "lg" | "xl";

interface CoaSvgProps {
  size: Size;
}

const sizes: Record<Size, number> = {
  sm: 64,
  md: 128,
  lg: 256,
  xl: 512,
};

export const CoaSvg: FunctionComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
    CoaSvgProps
> = ({ src, size, ...rest }) => {
  const sideLength = sizes[size];
  return (
    <img
      width={sideLength}
      height={sideLength}
      {...rest}
      style={{
        objectFit: "contain",
      }}
      src={src}
      // type="image/svg+xml"
    />
  );
};
