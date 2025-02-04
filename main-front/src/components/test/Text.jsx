import { colors } from "../test/colorPalette";
import { typographyMap } from "../test/typography";
import styled from "@emotion/styled";

// Text 컴포넌트
//123123
const Text = styled.span(
  ({ color = "black", display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? "bold" : fontWeight,
  }),
  ({ typography = "t5" }) => typographyMap[typography]
);

export default Text;
