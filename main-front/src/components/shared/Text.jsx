import { colorPalette } from "../../styles/colorPalette";
import { typographyMap } from "../../styles/typography";

import styled from "@emotion/styled";

const Text = styled.span(
  ({ color = "black", width, height, display, textAlign, fontWeight, bold }) => ({
    color,
    display: width ? "block" : "inline-block",
    textAlign,
    fontWeight: bold ? "bold" : fontWeight,
    width,
    height,
  }),
  ({ typography = "t5" }) => typographyMap[typography]
);

export default Text;
