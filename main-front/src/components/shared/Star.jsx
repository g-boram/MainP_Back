import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";

export default function Star() {
  return <FormStar> * </FormStar>;
}

const FormStar = styled.span`
  font-size: 12px;

  color: ${colorPalette.red};
`;
