import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function LinkButton({
  to = "/",
  color = "#fff",
  border = "none",
  bgColor = "black",
  text = "",
  width = "40px",
  height = "20px",
  fontSize = "12px",
}) {
  return (
    <StyledLink
      to={to}
      fontSize={fontSize}
      color={color}
      border={border}
      bgColor={bgColor}
      width={width}
      height={height}
    >
      {text}
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  cursor: pointer;
  font-weight: bold;
  border-radius: 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 5px;

  ${({ width }) => css`
    width: ${width};
  `}
  ${({ height }) => css`
    height: ${height};
  `}
  ${({ color }) => css`
    color: ${color};
  `}
  ${({ bgColor }) => css`
    background-color: ${bgColor};
  `}
  ${({ border }) => css`
    border: ${border};
  `}
  ${({ fontSize }) => css`
    font-size: ${fontSize};
  `}
`;
