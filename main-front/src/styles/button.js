import { css } from "@emotion/react";
import { colorPalette } from "./colorPalette";

export const buttonColorMap = {
  primary: css`
    background-color: ${colorPalette.btnBlue};
    color: ${colorPalette.white};
  `,
  success: css`
    background-color: ${colorPalette.btnGreen};
    color: ${colorPalette.white};
  `,
  error: css`
    background-color: ${colorPalette.btnRed};
    color: ${colorPalette.white};
  `,
  lightBlue: css`
    background-color: ${colorPalette.btnLightBlue};
    color: ${colorPalette.white};
    &:hover {
      background-color: #64d6ff;
      transition: 0.5s;
    }
  `,
  lightPurple: css`
    background-color: ${colorPalette.btnLightPurple};
    color: ${colorPalette.white};
    &:hover {
      background-color: #a0a0ff;
      transition: 0.5s;
    }
  `,
  purple: css`
    background-color: ${colorPalette.btnPurple};
    color: ${colorPalette.white};
    &:hover {
      background-color: #50358f;
      transition: 0.5s;
    }
  `,
  pink: css`
    background-color: ${colorPalette.btnPink};
    color: ${colorPalette.white};
    &:hover {
      background-color: rgb(228, 118, 149);
      transition: 0.5s;
    }
  `,
  grey: css`
    background-color: ${colorPalette.btnGrey};
    color: ${colorPalette.white};
    &:hover {
      background-color: #9b9b9b;
      transition: 0.5s;
    }
  `,
  white: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.black};
  `,
  yellow: css`
    background-color: ${colorPalette.btnYellow};
    color: ${colorPalette.white};
    &:hover {
      background-color: #ffc300;
      transition: 0.5s;
    }
  `,
  black: css`
    background-color: ${colorPalette.btnBlack};
    color: ${colorPalette.white};
    &:hover {
      background-color: ${colorPalette.hoverBlack};
      transition: 0.5s;
    }
  `,
};

export const buttonWeakMap = {
  primary: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnBlue};
    border: 1px solid ${colorPalette.btnBlue};
  `,
  success: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnGreen};
    border: 1px solid ${colorPalette.btnGreen};
  `,
  error: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnRed};
    border: 1px solid ${colorPalette.btnRed};
  `,
  pink: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnPink};
    border: 1px solid ${colorPalette.btnPink};
  `,
  grey: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnGrey};
    border: 1px solid ${colorPalette.btnGrey};
  `,
  white: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.black};
    border: 1px solid ${colorPalette.white};
  `,
  yellow: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnYellow};
    border: 1px solid ${colorPalette.btnYellow};
  `,
  purple: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnPurple};
    border: 1px solid ${colorPalette.btnPurple};
  `,
  lightBlue: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnLightBlue};
    border: 1px solid ${colorPalette.btnLightBlue};
  `,
  lightPurple: css`
    background-color: ${colorPalette.white};
    color: ${colorPalette.btnLightPurple};
    border: 1px solid ${colorPalette.btnLightPurple};
  `,
};

export const buttonSizeMap = {
  small: css`
    font-size: 12px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `,
};
