import styled from "@emotion/styled";

const Flex = styled.div(({ align, height, width, justify, direction }) => ({
  display: "flex",
  height: height,
  width: width,
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
}));

export default Flex;
