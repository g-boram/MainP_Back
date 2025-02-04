import styled from "@emotion/styled";
import Text from "./Text";
import { css } from "@emotion/react";

function Badge({ label = "", color = "black", onClickFn }) {
  return (
    <Container
      color={color}
      onClick={(e) => {
        e.preventDefault();

        if (onClickFn) {
          onClickFn();
        }
      }}
    >
      <Text bold={true} typography="t13" color={color}>
        {label}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 15px;
  min-width: 25px;
  padding: 2px 12px;
  margin-right: 10px;
  min-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;

  ${({ color }) => css`
    color: ${color};
    border: 1px solid ${color};
  `};
`;

export default Badge;
