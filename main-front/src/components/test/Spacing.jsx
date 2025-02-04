import PropTypes from "prop-types";
import styled from "@emotion/styled";

// <Spacing size={16} />

const Spacing = styled.div`
  ${({ size, direction = "vertical" }) =>
    direction === "vertical"
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}
`;

Spacing.propTypes = {
  size: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default Spacing;
