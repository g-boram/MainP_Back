import styled from "@emotion/styled";

// <Spacing size={16} />
const Spacing = styled.div`
  ${({ size, direction = "height" }) => (direction === "height" ? `height: ${size}px;` : `width: ${size}px;`)}
`;

export default Spacing;
