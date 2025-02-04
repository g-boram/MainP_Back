import styled from "@emotion/styled";

// Flex 컴포넌트
//123123
const Flex = styled.div(({ align, justify, direction }) => ({
  display: "flex",
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
}));

export default Flex;
