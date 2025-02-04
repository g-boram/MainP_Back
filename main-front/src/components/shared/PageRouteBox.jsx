import { css } from "@emotion/react";
import { IoHome } from "react-icons/io5";
import styled from "@emotion/styled";

export default function PageRouteBox({
  height = "40px",
  width = "200px",
  bgColor = "#fff",
  rowTitle = ["Home"],
  fontSize = "12px",
  color = "#333",
}) {
  return (
    <Row height={height} width={width} bgColor={bgColor}>
      {rowTitle.map((row, i) => {
        return (
          <>
            <PathText fontSize={fontSize} color={color}>
              {row === "Home" ? <IoHome /> : ""}
              {row}
            </PathText>
            {rowTitle.length === i + 1 ? "" : <Next> {" > "} </Next>}
          </>
        );
      })}
    </Row>
  );
}

const Row = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0 30px;
  box-shadow: 0 0px 2px 2px rgba(193, 193, 193, 0.2);

  ${({ height, width, bgColor }) => css`
    height: ${height};
    min-width: ${width};
    background-color: ${bgColor};
  `};
`;

const PathText = styled.div`
  display: flex;
  gap: 3px;
  ${({ fontSize }) => css`
    font-size: ${fontSize};
  `}
  ${({ color }) => css`
    color: ${color};
  `}
`;

const Next = styled.div`
  font-size: 12px;
  margin: 0 8px;
`;
