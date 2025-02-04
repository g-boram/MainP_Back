import styled from "@emotion/styled";
import { colorPalette } from "./colorPalette";

// 아이콘 - 기본 위아래 구조 박스
export const BaseIconBox = styled.div`
  width: 200px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  > div {
    margin-top: 10px;
    font-size: 12px;
    color: ${colorPalette.fontBlack};
  }
`;
