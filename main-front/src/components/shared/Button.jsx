import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { buttonColorMap, buttonWeakMap, buttonSizeMap } from "../../styles/button";

const BaseButton = styled.button(
  {
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "0px",
    border: "none",
  },
  ({ color = "primary", weak }) => (weak ? buttonWeakMap[color] : buttonColorMap[color]),
  ({ size = "small" }) => buttonSizeMap[size],
  ({ width }) =>
    width
      ? css`
          width: ${width};
        `
      : css`
          width: 100%;
        `,
  ({ height }) =>
    height
      ? css`
          height: ${height};
        `
      : css`
          height: 100%;
        `,
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.3;
          cursor: initial;
        `
      : undefined
);

export default BaseButton;
