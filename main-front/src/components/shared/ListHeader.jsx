import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default function ListHeader({
  height = "30px",
  bgColor = "#fff",
  rowTitle = ["title1-30", "title1-10", "title1-50"],
  fontSize = "14px",
  color = "#000",
  borderB = "",
  borderT = "",
}) {
  return (
    <Row bgColor={bgColor} borderB={borderB} borderT={borderT} height={height}>
      {rowTitle.map((row) => {
        const title = row.split("-");

        return (
          <HeadTitle width={`${title[1]}px`} fontSize={fontSize} color={color}>
            {title[0]}
          </HeadTitle>
        );
      })}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  width: 100%;

  ${({ height }) => css`
    height: ${height};
  `}
  ${({ bgColor }) => css`
    background-color: ${bgColor};
  `}
  ${({ borderB }) => css`
    border-bottom: 1px solid ${borderB};
  `}
  ${({ borderT }) => css`
    border-top: 1px solid ${borderT};
  `}
`;

const HeadTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  ${({ width }) => css`
    width: ${width};
  `}
  ${({ fontSize }) => css`
    font-size: ${fontSize};
  `}
  ${({ color }) => css`
    color: ${color};
  `}
`;
