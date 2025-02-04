import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";

const Tag = styled.span(
  ({ color = colorPalette.white, backgroundColor = colorPalette.blue, height = "auto", fontSize = "11px" }) => ({
    fontSize: fontSize,
    padding: "4px 0px",
    fontWeight: "bold",
    borderRadius: "2px",
    textAlign: "center",
    height: height,
    width: "100%",
    display: "inline-block",
    color: color in colorPalette ? colorPalette[color] : color,
    backgroundColor: backgroundColor in colorPalette ? colorPalette[backgroundColor] : backgroundColor,
  })
);

export default Tag;
